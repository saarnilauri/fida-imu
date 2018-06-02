import pluralize from 'pluralize'
import upperCase from 'lodash/upperCase'
import capitalize from 'lodash/capitalize'

export const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
})

export const setStateValue = (propertyName, componentThis) => {
  return event => componentThis.setState(updateByPropertyName(propertyName, event.target.value))
}

export const findUserItems = (collection, uid = null) => {
  const items = []

  if (uid && collection) {
    Object.keys(collection).forEach(key => {
      const userItems = collection[key].users
        ? collection[key].users.find(item => {
          return item === uid
        })
        : []

      if (userItems && userItems.length > 0) {
        items.push({ uid: key, ...collection[key] })
      }
    })
  }

  return items
}

export const collectionToArray = collection =>
  (collection ? Object.keys(collection).map(uid => ({ ...collection[uid], uid })) : [])

export const collectionToArrayWithLabelAndValue = (collection, label) =>
  Object.keys(collection).map(uid => ({ ...collection[uid], label: collection[uid][label], value: uid, key: uid }))

export const collectionToArrayWithNames = (collection, label) =>
  Object.keys(collection).map(uid => collection[uid][label])

export const collectionToKeys = collection => Object.keys(collection)

export const getSchemaKeys = (state, schema) =>
  Object.keys(state).filter(key => {
    return key.indexOf('Editor') !== -1 || schema.indexOf(key) !== -1
  })

export function getWordForms(word) {
  return {
    normal: word,
    prular: pluralize(word),
    capitalized: capitalize(word),
    capitalizedPrular: capitalize(pluralize(word)),
    allCaps: upperCase(word),
    allCapsPrular: upperCase(pluralize(word)),
  }
}

export const getValueByPath = (p, o) => p.reduce((xs, x) => (xs && xs[x] ? xs[x] : null), o)
