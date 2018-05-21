import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

class QuillEditor extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    editMode: PropTypes.bool,
  }
  static defaultProps = {
    editMode: true,
  }
  constructor(props) {
    super(props)
    this.state = { text: '' }
    this.handleChange = this.handleChange.bind(this)
  }

  modules = {
    toolbar: [
      ['bold', 'italic', 'underline', { header: 1 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      //      [{ align: [] }],
      //      ['clean'],
    ],
  }

  formats = ['header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent']

  handleChange(value) {
    this.setState({ text: value })
    this.props.onChange(value, this.props.name)
  }

  render() {
    const { editMode } = this.props
    const view =
      editMode === true ? (
        <div className="scrolling-container">
          <ReactQuill
            theme="snow"
            placeholder="Start adding content..."
            value={this.state.text}
            onChange={this.handleChange}
            modules={this.modules}
            formats={this.formats}
          />
        </div>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: this.state.text }} />
      )

    return view
  }
}

export default QuillEditor
