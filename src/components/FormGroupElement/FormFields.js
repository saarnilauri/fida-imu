import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import capitalize from 'lodash/capitalize'
import FormElement from '../FormGroupElement'

const propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  intl: PropTypes.object,
}

const Field = ({ id, ...props }) => (
  <FormElement {...props} name={id} id={id} label={props.label ? props.label : capitalize(id)} />
)

Field.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
}

const UnameField = ({ onChange, value, intl }) => (
  <Field
    className=""
    id="username"
    placeholder={intl.formatMessage({ id: 'user.form.display-name' })}
    value={value}
    onChange={onChange}
    type="text"
    icon="user"
  />
)
UnameField.propTypes = propTypes
export const UsernameField = injectIntl(UnameField)

export const MailField = ({ onChange, value, intl }) => (
  <Field
    className="py-2"
    value={value}
    id="email"
    onChange={onChange}
    type="text"
    placeholder={intl.formatMessage({ id: 'user.form.email' })}
    icon="envelope"
  />
)

MailField.propTypes = propTypes
export const EmailField = injectIntl(MailField)

export const PwdField = ({ onChange, value, intl }) => (
  <Field
    className="py-2"
    id="password"
    value={value}
    onChange={onChange}
    type="password"
    placeholder={intl.formatMessage({ id: 'user.form.password' })}
    icon="lock"
  />
)

PwdField.propTypes = propTypes
export const PasswordField = injectIntl(PwdField)

export const PwdConfirmField = ({ onChangeOne, passwordOne, onChangeTwo, passwordTwo, intl }) => (
  <div>
    <Field
      className=""
      id="passwordOne"
      label="Password"
      value={passwordOne}
      onChange={onChangeOne}
      type="password"
      placeholder={intl.formatMessage({ id: 'user.form.password' })}
      icon="lock"
    />
    <Field
      className="py-2"
      id="passwordTwo"
      label="Confirm password"
      value={passwordTwo}
      onChange={onChangeTwo}
      type="password"
      placeholder={intl.formatMessage({ id: 'user.form.password-confirm' })}
      icon="lock"
    />
  </div>
)

PwdConfirmField.propTypes = {
  passwordOne: PropTypes.string,
  onChangeOne: PropTypes.func,
  passwordTwo: PropTypes.string,
  onChangeTwo: PropTypes.func,
}

export const PasswordConfirmField = injectIntl(PwdConfirmField)
