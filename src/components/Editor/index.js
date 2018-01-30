import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RichTextEditor from 'react-rte'

class Editor extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    content: PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.state = {
      value: props.content
        ? RichTextEditor.createValueFromString(props.content, 'html')
        : RichTextEditor.createEmptyValue(),
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
    return <RichTextEditor value={this.state.value} onChange={this.onChange} />
  }
}

export default Editor
