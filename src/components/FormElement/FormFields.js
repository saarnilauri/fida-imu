import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import FormElement from './index'

const propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
}

const Field = ({ id, ...props }) => (
  <FormElement {...props} name={id} id={id} label={props.label ? props.label : _.capitalize(id)} />
)

Field.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
}

export const UsernameField = ({ onChange, value }) => (
  <Field className="" id="username" value={value} onChange={onChange} type="text" />
)

UsernameField.propTypes = propTypes

export const EmailField = ({ onChange, value }) => (
  <Field className="py-2" value={value} id="email" onChange={onChange} type="text" placeholder="Email Address" />
)

EmailField.propTypes = propTypes

export const PasswordField = ({ onChange, value }) => (
  <Field className="py-2" id="password" value={value} onChange={onChange} type="password" placeholder="Password" />
)

PasswordField.propTypes = propTypes

export const PasswordConfirmField = ({ onChangeOne, passwordOne, onChangeTwo, passwordTwo }) => (
  <React.Fragment>
    <Field
      className=""
      label="Password"
      id="passwordOne"
      value={passwordOne}
      onChange={onChangeOne}
      type="password"
      placeholder=""
    />
    <Field
      className="py-2"
      id="passwordTwo"
      label="Confirm password"
      value={passwordTwo}
      onChange={onChangeTwo}
      type="password"
      placeholder=""
    />
  </React.Fragment>
)

PasswordConfirmField.propTypes = {
  passwordOne: PropTypes.string,
  onChangeOne: PropTypes.func,
  passwordTwo: PropTypes.string,
  onChangeTwo: PropTypes.func,
}
