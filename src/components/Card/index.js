import React, { Component } from 'react'
import PropTypes from 'prop-types'

class PageWrapper extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-header">{this.props.title}</div>
        <div className="card-body">{this.props.children}</div>
      </div>
    )
  }
}

PageWrapper.propTypes = {
  title: PropTypes.string,
  children: PropTypes.string,
}

export default PageWrapper
