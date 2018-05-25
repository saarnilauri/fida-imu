import pluralize from 'pluralize'
import _ from 'lodash'
// import { sendNotification } from './notifications'

export function getWordForms(word) {
  return {
    normal: word,
    prular: pluralize(word),
    allCaps: _.upperCase(word),
    allCapsPrular: _.upperCase(pluralize(word)),
  }
}

export function getInitialState(entityName) {
  const wordForms = getWordForms(entityName)
  const INITIAL_STATE = { collectionReady: false }
  INITIAL_STATE[entityName] = null
  INITIAL_STATE[`${wordForms.prular}Collection`] = []
  return INITIAL_STATE
}

export const curriedAddEntity = entity => payload => {
  const wordForms = getWordForms(entity)
  return {
    type: `ADD_${wordForms.allCaps}`,
    payload,
  }
}
