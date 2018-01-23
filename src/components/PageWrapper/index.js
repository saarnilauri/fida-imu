import React, { Component } from 'react'
import PropTypes from 'prop-types'

class PageWrapper extends Component {
  render() {
    return (
      <div className="py-4 container">
        <div className="row py-2">
          <div className="col-md-12">{this.props.children}</div>
        </div>
      </div>
    )
  }
}

PageWrapper.propTypes = {
  children: PropTypes.array,
}

export default PageWrapper
