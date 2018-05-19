import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import FormElement from '../FormGroupElement'

const propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
}

export const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
})

export const setStateValue = (propertyName, componentThis) => {
  return event => componentThis.setState(updateByPropertyName(propertyName, event.target.value))
}

const Field = ({ id, ...props }) => (
  <FormElement {...props} name={id} id={id} label={props.label ? props.label : _.capitalize(id)} />
)

Field.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
}

export const UsernameField = ({ onChange, value }) => (
  <Field className="" id="username" value={value} onChange={onChange} type="text" icon="user" />
)

UsernameField.propTypes = propTypes

export const EmailField = ({ onChange, value }) => (
  <Field
    className="py-2"
    value={value}
    id="email"
    onChange={onChange}
    type="text"
    placeholder="Email Address"
    icon="envelope"
  />
)

EmailField.propTypes = propTypes

export const PasswordField = ({ onChange, value }) => (
  <Field
    className="py-2"
    id="password"
    value={value}
    onChange={onChange}
    type="password"
    placeholder="Password"
    icon="lock"
  />
)

PasswordField.propTypes = propTypes

export const PasswordConfirmField = ({ onChangeOne, passwordOne, onChangeTwo, passwordTwo }) => (
  <div>
    <Field
      className=""
      id="passwordOne"
      label="Password"
      value={passwordOne}
      onChange={onChangeOne}
      type="password"
      placeholder=""
      icon="lock"
    />
    <Field
      className="py-2"
      id="passwordTwo"
      label="Confirm password"
      value={passwordTwo}
      onChange={onChangeTwo}
      type="password"
      placeholder=""
      icon="lock"
    />
  </div>
)

PasswordConfirmField.propTypes = {
  passwordOne: PropTypes.string,
  onChangeOne: PropTypes.func,
  passwordTwo: PropTypes.string,
  onChangeTwo: PropTypes.func,
}
