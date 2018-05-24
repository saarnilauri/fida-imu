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
      if (
        collection[key].users &&
        collection[key].users.find(item => {
          return item === uid
        }).length > 0
      ) {
        items.push({ uid: key, ...collection[key] })
      }
    })
  }

  return items
}
