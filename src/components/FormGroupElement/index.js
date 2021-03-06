import React from 'react'
import PropTypes from 'prop-types'
import {
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
} from 'reactstrap'
import FontAwesome from 'react-fontawesome'
import { formElementProptypes } from '../FormElement'

const FormElement = ({
  /* eslint-disable */
  id,
  mb,
  icon,
  name,
  placeholder,
  value,
  type,
  className,
  onChange,
  /* eslint-enable */
}) => (
  <FormGroup className={className}>
    <InputGroup className={`mb-${mb}`}>
      {icon && (
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <FontAwesome name={icon} />
          </InputGroupText>
        </InputGroupAddon>
      )}
      <Input
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        id={id}
        placeholder={placeholder}
      />
    </InputGroup>
  </FormGroup>
)

FormElement.propTypes = Object.assign(
  { icon: PropTypes.string },
  formElementProptypes,
)

export default FormElement
