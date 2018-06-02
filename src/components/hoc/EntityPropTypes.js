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
  data: PropTypes.array,
  intl: PropTypes.object,
  [`load${wordForms.capitalizedPlural}`]: PropTypes.func, // eslint-disable-line
  ready: PropTypes.bool,
  edit: PropTypes.func,
  [`remove${wordForms.capitalized}`]: PropTypes.func, // eslint-disable-line
})
