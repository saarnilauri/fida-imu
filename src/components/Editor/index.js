import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CKEditor from 'ckeditor4-react'

const toolbar = [
  { name: 'styles', items: ['Format'] },
  {
    name: 'clipboard',
    items: [
      'Cut',
      'Copy',
      'Paste',
      'PasteText',
      'PasteFromWord',
      '-',
      'Undo',
      'Redo',
    ],
  },
  { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline'] },
  {
    name: 'paragraph',
    items: [
      'NumberedList',
      'BulletedList',
      '-',
      'Outdent',
      'Indent',
      '-',
      'Blockquote',
    ],
  },
  { name: 'links', items: ['Link', 'Unlink'] },
  { name: 'colors', items: ['TextColor', 'BGColor'] },
]

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
    this.onChange = this.onChange.bind(this)
  }

  onChange = event => {
    this.setState({ value: event.editor.getData() })
    // console.log(value)
    if (this.props.onChange) {
      // Send the changes up to the parent component as an HTML string.
      // This is here to demonstrate using `.toString()` but in a real app it
      // would be better to avoid generating a string on each change.
      this.props.onChange(event.editor.getData())
    }
  }

  render() {
    return (
      <React.Fragment>
        <CKEditor
          data={this.state.value}
          config={{
            toolbar,
          }}
          onChange={this.onChange}
        />
        {/* <QuillEditor full name="profile" onChange={this.onChange} defaultValue={this.state.value} /> */}
      </React.Fragment>
    )
  }
}

export default Editor
