import React from 'react'
import PropTypes from 'prop-types'
import Fontawesome from 'react-fontawesome'
import map from 'lodash/map'
import uuid from 'uuid'
import { Button, Row, Col } from 'reactstrap'

const EntityImageDropZonePreview = ({ onFileDelete, uploadedFiles }) => (
  <React.Fragment>
    {uploadedFiles && (
      <div className="py-2">
        <Row className="d-flex justify-content-center">
          {map(uploadedFiles, (file, key) => (
            <Col md="10" key={file.name + uuid()}>
              <div className="dropzone-image-wrapper">
                <div>
                  <img
                    src={file.downloadURL}
                    alt={file.name}
                    className="img-fluid img-thumbnail"
                  />
                </div>
                <div className="dropzone-image-remove-wrapper">
                  <Button
                    color="danger"
                    onClick={() => onFileDelete(file, key)}
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
  </React.Fragment>
)

EntityImageDropZonePreview.propTypes = {
  onFileDelete: PropTypes.func.isRequired,
  uploadedFiles: PropTypes.object.isRequired,
}

export default EntityImageDropZonePreview
