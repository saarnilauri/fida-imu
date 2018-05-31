import React from 'react'
import PropTypes from 'prop-types'
import { Alert } from 'reactstrap'

const ErrorMsg = ({ error }) => (
  <React.Fragment>
    {error && (
      <div className="py-2">
        <Alert color="danger">{error}</Alert>
      </div>
    )}
    {error && null}
  </React.Fragment>
)
ErrorMsg.propTypes = {
  error: PropTypes.string,
}

export default ErrorMsg
