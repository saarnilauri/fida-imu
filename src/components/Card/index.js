import React from 'react'
import PropTypes from 'prop-types'

const Card = props => (
  <div className="card">
    <div className={`${props.headerClass} card-header`}>{props.title}</div>
    <div className="card-body" style={props.noPadding ? { padding: 0 } : null}>
      {props.children}
    </div>
  </div>
)

Card.defaultProps = {
  noPadding: false,
}

Card.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]),
  headerClass: PropTypes.string,
  noPadding: PropTypes.bool,
  title: PropTypes.string,
}

export default Card
