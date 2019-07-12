import React from 'react'
import PropTypes from 'prop-types'
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap'

const PopoverWrapper = props => (
  <React.Fragment>
    <React.Fragment>
      <Popover
        placement={props.placement}
        isOpen={props.isOpen}
        target={props.target}
        toggle={props.toggle}
      >
        <PopoverHeader className="bg-dark text-white">
          {props.title}
        </PopoverHeader>
        <PopoverBody>{props.children}</PopoverBody>
      </Popover>
    </React.Fragment>
  </React.Fragment>
)

PopoverWrapper.propTypes = {
  placement: PropTypes.string,
  isOpen: PropTypes.bool,
  target: PropTypes.string,
  toggle: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.array,
  ]),
}

/* <React.Fragment>
    <Popover placement={props.placement} isOpen={props.isOpen} target={props.target} toggle={props.toggle}>
      <PopoverHeader>{props.title}</PopoverHeader>
      <PopoverBody>{props.children}</PopoverBody>
    </Popover>
  </React.Fragment>
*/

export default PopoverWrapper
