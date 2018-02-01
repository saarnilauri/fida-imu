import React, { Component } from 'react'
import { Button, Alert } from 'reactstrap'
import { auth } from '../../firebase'
import { PasswordConfirmField } from '../FormElement/FormFields'

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
})

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
}

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  onSubmit = event => {
    const { passwordOne } = this.state

    auth
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }))
      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error))
      })

    event.preventDefault()
  }

  render() {
    const { passwordOne, passwordTwo, error } = this.state

    const isInvalid = passwordOne !== passwordTwo || passwordOne === ''

    return (
      <form onSubmit={this.onSubmit}>
        {error && <Alert color="danger">{error.message}</Alert>}
        <PasswordConfirmField
          passwordOne={passwordOne}
          onChangeOne={event =>
            this.setState(
              updateByPropertyName('passwordOne', event.target.value),
            )
          }
          passwordTwo={passwordTwo}
          onChangeTwo={event =>
            this.setState(
              updateByPropertyName('passwordTwo', event.target.value),
            )
          }
        />
        <Button disabled={isInvalid} type="submit">
          Reset your password
        </Button>
      </form>
    )
  }
}

export default PasswordChangeForm
