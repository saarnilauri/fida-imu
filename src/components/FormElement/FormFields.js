import React from 'react'
import PropTypes from 'prop-types'
import FormElement from './index'

const propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
}

export const UsernameField = ({ onChange, value }) => (
  <FormElement
    className=""
    name="username"
    id="username"
    label="Username"
    value={value}
    onChange={onChange}
    type="text"
    placeholder=""
  />
)

UsernameField.propTypes = propTypes

export const EmailField = ({ onChange, value }) => (
  <FormElement
    className="py-2"
    value={value}
    name="email"
    id="email"
    label="Email"
    onChange={onChange}
    type="text"
    placeholder="Email Address"
  />
)

EmailField.propTypes = propTypes

export const PasswordField = ({ onChange, value }) => (
  <FormElement
    className="py-2"
    name="password"
    id="password"
    label="Password"
    value={value}
    onChange={onChange}
    type="password"
    placeholder="Password"
  />
)

PasswordField.propTypes = propTypes

export const PasswordConfirmField = ({
  onChangeOne,
  passwordOne,
  onChangeTwo,
  passwordTwo,
}) => (
  <div>
    <FormElement
      className=""
      name="passwordOne"
      id="passwordOne"
      label="Password"
      value={passwordOne}
      onChange={onChangeOne}
      type="password"
      placeholder=""
    />
    <FormElement
      className="py-2"
      name="passwordTwo"
      id="passwordTwo"
      label="Confirm Password"
      value={passwordTwo}
      onChange={onChangeTwo}
      type="password"
      placeholder=""
    />
  </div>
)

PasswordConfirmField.propTypes = {
  passwordOne: PropTypes.string,
  onChangeOne: PropTypes.func,
  passwordTwo: PropTypes.string,
  onChangeTwo: PropTypes.func,
}
