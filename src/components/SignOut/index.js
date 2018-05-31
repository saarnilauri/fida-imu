import React from "react";
import PropTypes from "prop-types";
import FontAwesome from "react-fontawesome";
import { auth } from "../../firebase";

const SignOutButton = props => (
  <a href="/" onClick={auth.doSignOut}>
    <FontAwesome name="sign-out" /> {props.text}
  </a>
);
SignOutButton.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};

export default SignOutButton;
