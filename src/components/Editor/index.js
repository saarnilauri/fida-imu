import React, { Component } from 'react'
import PropTypes from 'prop-types'
import QuillEditor from '../QuillEditor'

class Editor extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    content: PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.state = {
      value: props.content,
    }
  }

  onChange = value => {
    this.setState({ value })
    if (this.props.onChange) {
      // Send the changes up to the parent component as an HTML string.
      // This is here to demonstrate using `.toString()` but in a real app it
      // would be better to avoid generating a string on each change.
      this.props.onChange(value)
    }
  }

  render() {
    return (
      <React.Fragment>
        <QuillEditor full name="profile" onChange={this.onChange} defaultValue={this.state.value} />
      </React.Fragment>
    )
  }
}

export default Editor
