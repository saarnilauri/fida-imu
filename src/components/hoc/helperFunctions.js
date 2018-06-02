import isString from 'lodash/isString'
import has from 'lodash/has'
import forEach from 'lodash/forEach'
import { collectionToArray, getWordForms } from '../../constants/utils'

export const getAddEditCancelButtonSetup = settings => {
  const buttons = [
    {
      color: 'primary',
      onClick: () => {},
      title: settings.editMode ? settings.title.save : settings.title.add,
      type: 'submit',
    },
  ]
  if (settings.editMode) {
    buttons.push({
      onClick: settings.cancelEdit,
      color: 'secondary',
      title: settings.title.cancel,
    })
  }
  return buttons
}

export const getErrorProperty = error => {
  if (isString(error)) {
    return error
  }
  if (has(error, 'message')) {
    return error.message
  }
  return null
}

export const getListMapStateToProps = (entity, sources = {}) => state => {
  const wordForms = getWordForms(entity)
  const sourceMaps = { sources: {} }
  forEach(sources, (source, key) => {
    const sourceWordForms = getWordForms(source)
    sourceMaps.sources[key] = state[`${source}State`][`${sourceWordForms.prular}Collection`]
  })
  return {
    ...sourceMaps,
    authUser: state.sessionState.authUser,
    data:
      state[`${entity}State`].collectionReady === true
        ? collectionToArray(state[`${entity}State`][`${wordForms.prular}Collection`])
        : [],
    ready: state[`${entity}State`].collectionReady,
  }
}
