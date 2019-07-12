import React from 'react'
import PropTypes from 'prop-types'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import Fontawesome from 'react-fontawesome'
import ButtonGroup from '../ButtonGroup'

const ModalWrapper = props => (
  <Modal
    isOpen={props.isOpen}
    toggle={props.toggle}
    className={props.className}
  >
    <ModalHeader toggle={props.toggle}>
      {props.titleIcon && <Fontawesome name={props.titleIcon} />}
      {` ${props.title}`}
    </ModalHeader>
    <ModalBody>{props.children}</ModalBody>
    <ModalFooter>
      <ButtonGroup
        buttons={[
          {
            color: 'primary',
            icon: props.actionBtnIcon,
            onClick: props.action,
            title: props.actionBtnTitle,
          },
          {
            icon: props.cancelBtnIcon,
            onClick: props.cancel,
            color: 'secondary',
            title: props.cancelBtnTitle,
          },
        ]}
      />
    </ModalFooter>
  </Modal>
)

ModalWrapper.propTypes = {
  action: PropTypes.func,
  actionBtnIcon: PropTypes.string,
  actionBtnTitle: PropTypes.string,
  cancel: PropTypes.func,
  cancelBtnIcon: PropTypes.string,
  cancelBtnTitle: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.string,
  ]),
  className: PropTypes.string,
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  titleIcon: PropTypes.string,
  toggle: PropTypes.func,
}

export default ModalWrapper
