import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactQuill from 'react-quill'

const fullToolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  [{ header: 1 }, { header: 2 }, 'blockquote'], // custom button values
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  [{ align: [] }],
  ['clean'], // remove formatting button
]
class QuillEditor extends Component {
  constructor(props) {
    super(props)
    this.state = { text: '' }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(value) {
    this.setState({ text: value })
    this.props.onChange(value, this.props.name)
  }

  render() {
    const modules = {
      toolbar: [['bold', 'italic', 'underline', { header: 1 }], [{ list: 'ordered' }, { list: 'bullet' }]],
    }
    const formats = ['header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent']
    const { editMode, full } = this.props
    if (full) {
      modules.toolbar = fullToolbarOptions
    }
    const view =
      editMode === true ? (
        <div className="scrolling-container">
          <ReactQuill
            theme="snow"
            placeholder="Start adding content..."
            defaultValue={this.props.defaultValue}
            onChange={this.handleChange}
            modules={modules}
            formats={formats}
          />
        </div>
      ) : (
        // eslint-disable-next-line
        <div dangerouslySetInnerHTML={{ __html: this.state.text ? this.state.text : this.props.defaultValue }} />
      )
    return view
  }
}

QuillEditor.defaultProps = {
  editMode: true,
  full: false,
}

QuillEditor.propTypes = {
  name: PropTypes.string.isRequired,
  full: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  editMode: PropTypes.bool,
  defaultValue: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
}

export default QuillEditor
