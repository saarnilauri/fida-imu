import PropTypes from 'prop-types'

export const EntityFormPropTypes = {
  cancelEdit: PropTypes.func,
  editMode: PropTypes.bool,
  onValueChange: PropTypes.func,
  getValue: PropTypes.func,
  onSubmit: PropTypes.func,
  intl: PropTypes.object.isRequired,
  error: PropTypes.string,
  sources: PropTypes.object,
}

export const getEntityListPropTypes = wordForms => ({
  next: PropTypes.bool,
  data: PropTypes.array,
  userProfile: PropTypes.object,
  intl: PropTypes.shape({ formatMessage: PropTypes.func }),
  [`load${wordForms.capitalizedPrular}`]: PropTypes.func, // eslint-disable-line
  ready: PropTypes.bool,
  edit: PropTypes.func,
  [`remove${wordForms.capitalized}`]: PropTypes.func, // eslint-disable-line
})
