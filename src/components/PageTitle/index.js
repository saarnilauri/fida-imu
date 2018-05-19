import React from 'react'
import PropTypes from 'prop-types'
import './index.css'

const PageTitle = ({ title }) => {
  return (
    <div className="py-1 bg-secondary">
      <div className="container-fluid py-1">
        <div className="row">
          <div className="col-md-12 text-lg-left text-center align-self-center">
            <h3 className="">{title}</h3>
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
