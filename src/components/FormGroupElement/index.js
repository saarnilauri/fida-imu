import React from 'react'
import PropTypes from 'prop-types'
import { FormGroup, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap'
import FontAwesome from 'react-fontawesome'

const FormElement = ({ id, mb, icon, name, placeholder, value, type, className, onChange }) => (
  <FormGroup className={className}>
    <InputGroup className={`mb-${mb}`}>
      <InputGroupAddon addonType="prepend">
        <InputGroupText>
          <FontAwesome name={icon} />
        </InputGroupText>
      </InputGroupAddon>
      <Input type={type} value={value} onChange={onChange} name={name} id={id} placeholder={placeholder} />
    </InputGroup>
  </FormGroup>
)

FormElement.propTypes = {
  id: PropTypes.string,
  mb: PropTypes.string,
  icon: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
}

export default FormElement
