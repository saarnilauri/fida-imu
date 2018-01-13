import React from 'react'
import PropTypes from 'prop-types'

const PageTitle = ({ title }) => {
  return (
    <div className="py-2 bg-secondary">
      <div className="container py-2">
        <div className="row">
          <div className="col-md-12 text-lg-left text-center align-self-center">
            <h1 className="display-4">{title}</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

PageTitle.propTypes = {
  title: PropTypes.string,
}

export default PageTitle
