import React, { Component } from 'react'
import Loader from '../Loader'
import './withDelay.css'

function withDelay(WrappedComponent, delay) {
  return class extends Component {
    constructor(props) {
      super(props)
      this.handleChange = this.handleChange.bind(this)
      this.state = { loaded: false }
    }

    componentDidMount() {
      setTimeout(this.handleChange, delay)
    }

    handleChange() {
      this.setState({ loaded: true })
    }

    render() {
      return this.state.loaded === true ? (
        <WrappedComponent {...this.props} />
      ) : (
        <div className="Aligner">
          <div className="Aligner-item">
            <Loader />
          </div>
        </div>
      )
    }
  }
}

export default withDelay
