import React from 'react'
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome'
import { Button } from 'reactstrap'

const HelpButton = props => (
  <Button
    className="btn-help"
    color="link"
    id={props.id}
    onClick={props.onClickEvent}
  >
    <FontAwesome
      name="question-circle"
      id={props.id}
      onClick={props.onClickEvent}
    />
  </Button>
)
HelpButton.propTypes = {
  id: PropTypes.string.isRequired,
  onClickEvent: PropTypes.func.isRequired,
}

export default HelpButton
