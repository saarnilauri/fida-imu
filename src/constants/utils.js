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

export const collectionToArray = collection => Object.keys(collection).map(uid => ({ ...collection[uid], uid }))

export const collectionToArrayWithLabelAndValue = (collection, label) =>
  Object.keys(collection).map(uid => ({ ...collection[uid], label: collection[uid][label], value: uid, key: uid }))
