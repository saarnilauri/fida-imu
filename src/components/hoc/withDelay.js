import React, { Component } from 'react'
import Loader from '../Loader'
import './withDelay.css'

// This function takes a component...
function withDelay(WrappedComponent, delay) {
  // ...and returns another component...
  return class extends Component {
    constructor(props) {
      super(props)
      this.handleChange = this.handleChange.bind(this)
      this.state = { loaded: false }
    }

    componentDidMount() {
      // ... that takes care of the subscription...
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
      // component
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
    }
  }
}

export default withDelay
