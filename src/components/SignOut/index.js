import React from 'react'
import { Button } from 'reactstrap'
import FontAwesome from 'react-fontawesome'
import { auth } from '../../firebase'

const SignOutButton = () => (
  <Button type="button" onClick={auth.doSignOut}>
    <FontAwesome name="sign-out" /> Sign Out
  </Button>
)

export default SignOutButton
