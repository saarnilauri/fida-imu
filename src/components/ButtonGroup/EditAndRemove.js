import React from 'react'
import PropTypes from 'prop-types'
import ButtonGroup from '../ButtonGroup'

const EditAndRemove = props => (
  <ButtonGroup
    buttons={[
      {
        icon: 'pencil',
        onClick: props.onClickEdit,
      },
      {
        icon: 'trash',
        onClick: props.onClickRemove,
      },
    ]}
  />
)

EditAndRemove.propTypes = {
  onClickEdit: PropTypes.func.isRequired,
  onClickRemove: PropTypes.func.isRequired,
}

export default EditAndRemove
