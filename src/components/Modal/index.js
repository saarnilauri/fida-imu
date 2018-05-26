import React from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import Fontawesome from 'react-fontawesome'

const ModalWrapper = props => (
  <Modal isOpen={props.isOpen} toggle={props.toggle} className={props.className}>
    <ModalHeader toggle={props.toggle}>
      {props.titleIcon && <Fontawesome name={props.titleIcon} />}
      {` ${props.title}`}
    </ModalHeader>
    <ModalBody>{props.children}</ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={props.action}>
        {props.actionBtnIcon && <Fontawesome name={props.actionBtnIcon} />} {` ${props.actionBtnTitle}`}
      </Button>{' '}
      <Button color="secondary" onClick={props.cancel}>
        {props.cancelBtnIcon && <Fontawesome name={props.cancelBtnIcon} />}
        {` ${props.cancelBtnTitle}`}
      </Button>
    </ModalFooter>
  </Modal>
)

ModalWrapper.propTypes = {
  action: PropTypes.func,
  actionBtnIcon: PropTypes.string,
  actionBtnTitle: PropTypes.string,
  cancelBtnIcon: PropTypes.string,
  cancelBtnTitle: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]),
  className: PropTypes.string,
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  titleIcon: PropTypes.string,
  toggle: PropTypes.func,
}

export default ModalWrapper
