import React from 'react'
import PropTypes from 'prop-types'
import { FormGroup, Label, Input } from 'reactstrap'

const FormElement = ({
  id, label, name, placeholder, value, type, className, onChange,
}) => (
  <FormGroup className={className}>
    <Label for={id}>{label}</Label>
    <Input type={type} value={value} onChange={onChange} name={name} id={id} placeholder={placeholder} />
  </FormGroup>
)

FormElement.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
}

export default FormElement
