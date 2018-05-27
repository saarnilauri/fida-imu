import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'
import Fontawesome from 'react-fontawesome'

const ButtonGroup = props => {
  const view = props.buttons.map(button => {
    const color = button.color ? button.color : props.color
    return (
      <React.Fragment>
        <Button color={color} onClick={button.onClick} type={button.type}>
          <Fontawesome name={button.icon} /> {button.title}
        </Button>{' '}
      </React.Fragment>
    )
  })
  return view
}

ButtonGroup.defaultProps = {
  color: 'link',
}

ButtonGroup.propTypes = {
  buttons: PropTypes.array.isRequired,
  color: PropTypes.string,
}

export default ButtonGroup
