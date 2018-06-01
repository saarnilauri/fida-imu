import React from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import Fontawesome from 'react-fontawesome'
import map from 'lodash/map'
import uuid from 'uuid'
import { Button, Row, Col } from 'reactstrap'
import { FormattedMessage } from 'react-intl'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import { getValueByPath } from '../../constants/utils'
import ErrorMsg from '../ErrorMsg'
import Loader from '../Loader'

const getEntityImageDropZone = (entity, multiple = false, authUserUid = null) => {
  let filesPath = `uploadedFiles/${entity}`

  if (authUserUid !== null) {
    filesPath = `${filesPath}/${authUserUid}`
  }

  class EntityImageDropZone extends React.Component {
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
          {this.props.uploadedFiles && (
            <div className="py-2">
              <Row className="d-flex justify-content-center">
                {map(this.props.uploadedFiles, (file, key) => (
                  <Col md="10" key={file.name + uuid()}>
                    <div className="dropzone-image-wrapper">
                      <div>
                        <img src={file.downloadURL} alt={file.name} className="img-fluid img-thumbnail" />
                      </div>
                      <div className="dropzone-image-remove-wrapper">
                        <Button
                          color="danger"
                          onClick={() => this.onFileDelete(file, key)}
                          style={{ color: '#fff', borderRadius: 20 }}
                        >
                          <Fontawesome name="trash" />
                        </Button>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          )}
          {displayDropzone &&
            !isProcessing && (
            <Dropzone
              className="dragAndDropArea"
              maxSize={5242880}
              onDrop={this.handleDrop}
              accept="image/jpeg,image/jpg,image/tiff,image/gif,image/png"
              multiple={multiple}
              onDropRejected={this.handleDropRejected}
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

  EntityImageDropZone.propTypes = {
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

  return enhance(EntityImageDropZone)
}

export default getEntityImageDropZone
