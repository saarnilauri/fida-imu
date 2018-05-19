export const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
})
export const setStateValue = (propertyName, componentThis) => {
  return event => componentThis.setState(updateByPropertyName(propertyName, event.target.value))
}
