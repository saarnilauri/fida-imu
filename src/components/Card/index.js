import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Card extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-header">{this.props.title}</div>
        <div className="card-body" style={this.props.noPadding ? { padding: 0 } : null}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

Card.defaultProps = {
  noPadding: false,
}

Card.propTypes = {
  title: PropTypes.string,
  noPadding: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}

export default Card
