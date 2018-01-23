import React, { Component } from 'react'
import { Button, Alert } from 'reactstrap'
import { auth } from '../../firebase'
import FormElement from '../FormElement'


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
        <FormElement
          className=""
          name="passwordOne"
          id="passwordOne"
          label="Password"
          value={passwordOne}
          onChange={event => this.setState(updateByPropertyName('passwordOne', event.target.value))}
          type="password"
          placeholder=""
        />
        <FormElement
          className="py-2"
          name="passwordTwo"
          id="passwordTwo"
          label="Confirm Password"
          value={passwordTwo}
          onChange={event => this.setState(updateByPropertyName('passwordTwo', event.target.value))}
          type="password"
          placeholder=""
        />
        <Button disabled={isInvalid} type="submit">
          Reset your password
        </Button>
      </form>
    )
  }
}

export default PasswordChangeForm
