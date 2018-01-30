import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Card extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-header">{this.props.title}</div>
        <div className="card-body">{this.props.children}</div>
      </div>
    )
  }
}

Card.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}

export default Card
