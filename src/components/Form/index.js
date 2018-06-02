import React from 'react'
import PropTypes from 'prop-types'
import ErrorMsg from '../ErrorMsg'
import { getErrorProperty } from '../hoc/helperFunctions'

const Form = props => (
  <form onSubmit={props.onSubmit}>
    {props.error && <ErrorMsg error={getErrorProperty(props.error)} />}
    {props.children}
  </form>
)

Form.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
  error: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
}

export default Form
