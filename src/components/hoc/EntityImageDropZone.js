import React from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import Fontawesome from 'react-fontawesome'
import { FormattedMessage } from 'react-intl'

const defaultMaxFileSize = 5242880

const EntityImageDropZone = props => {
  const { handleDrop, multiple, handleDropRejected } = props
  return (
    <Dropzone
      className="dragAndDropArea"
      maxSize={defaultMaxFileSize}
      onDrop={handleDrop}
      accept="image/jpeg,image/jpg,image/gif,image/png"
      multiple={multiple}
      onDropRejected={handleDropRejected}
    >
      <div
        className="full-height d-flex flex-column justify-content-center align-items-center py-4"
        style={{ fontSize: 70 }}
      >
        <div>
          <Fontawesome name="cloud-upload" />
        </div>
        <div>
          <h5>
            <FormattedMessage id="image.dropzone.instructions" />
          </h5>
        </div>
      </div>
    </Dropzone>
  )
}

EntityImageDropZone.propTypes = {
  handleDrop: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
  handleDropRejected: PropTypes.func.isRequired,
}

export default EntityImageDropZone
