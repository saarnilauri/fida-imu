import React from 'react'
import PropTypes from 'prop-types'

const FlagIcon = props => (
  <span className={`flag-icon flag-icon-${props.code}`} />
)

FlagIcon.propTypes = {
  code: PropTypes.string.isRequired,
}

export default FlagIcon
