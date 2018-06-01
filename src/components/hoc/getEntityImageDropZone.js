import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'

import EntityImageDropZonePreview from './EntityImageDropZonePreview'
import EntityImageDropZone from './EntityImageDropZone'
import ErrorMsg from '../ErrorMsg'
import Loader from '../Loader'
import { getValueByPath } from '../../constants/utils'

const getEntityImageDropZone = (entity, multiple = false, authUserUid = null) => {
  let filesPath = `uploadedFiles/${entity}`

  if (authUserUid !== null) {
    filesPath = `${filesPath}/${authUserUid}`
  }

  class EntityImageDropZoneWrapper extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        error: null,
        isProcessing: false,
      }
      this.handleDrop = this.handleDrop.bind(this)
    }

    onFileDelete = (file, key) => {
      this.setState(() => ({ isProcessing: true }))
      return this.props.firebase.deleteFile(file.fullPath, `${filesPath}/${key}`).then(() => {
        this.setState(() => ({ isProcessing: false }))
      })
    }

    handleDropRejected = rejectedFiles => {
      console.log(rejectedFiles)
    }

    handleDrop(acceptedFiles) {
      if (acceptedFiles.length > 0) {
        this.setState(() => ({ isProcessing: true }))
        this.props.firebase
          .uploadFiles(filesPath, acceptedFiles, filesPath)
          .then(() => {
            this.setState(() => ({ isProcessing: false }))
          })
          .catch(error => {
            this.setState(() => ({ error, isProcessing: false }))
          })
      }
    }

    render() {
      const { error, isProcessing } = this.state
      const displayDropzone = multiple || (!multiple && !this.props.uploadedFiles)
      return (
        <React.Fragment>
          {error && <ErrorMsg error={error.message} />}
          {this.props.uploadedFiles && <EntityImageDropZonePreview uploadedFiles={this.props.uploadedFiles} />}
          {displayDropzone &&
            !isProcessing && (
            <EntityImageDropZone
              multiple={multiple}
              handleDrop={this.handleDrop}
              handleDropRejected={this.handleDropRejected}
            />
          )}
          {isProcessing && (
            <div className="dragAndDropArea d-flex flex-column justify-content-center align-items-center ">
              <Loader />
            </div>
          )}
        </React.Fragment>
      )
    }
  }

  EntityImageDropZoneWrapper.propTypes = {
    firebase: PropTypes.object,
    uploadedFiles: PropTypes.object,
  }

  const enhance = compose(
    firebaseConnect([filesPath]),
    connect(({ firebase: { data } }) => {
      getValueByPath(filesPath.split('/'), data)
      return {
        uploadedFiles: getValueByPath(filesPath.split('/'), data),
      }
    }),
  )

  return enhance(EntityImageDropZoneWrapper)
}

export default getEntityImageDropZone
