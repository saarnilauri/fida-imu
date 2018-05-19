import React from 'react'
import FontAwesome from 'react-fontawesome'
import { auth } from '../../firebase'

const SignOutButton = () => (
  <a href="/" onClick={auth.doSignOut}>
    <FontAwesome name="sign-out" /> Sign Out
  </a>
)

export default SignOutButton
