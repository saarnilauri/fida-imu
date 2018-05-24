import React from 'react'
import PropTypes from 'prop-types'
import ResultsChainColumn from '../Column'
import QuillEditor from '../../QuillEditor'

const ColumnWrapper = props => (
  <ResultsChainColumn
    topContent={
      <QuillEditor
        editMode={props.editMode}
        defaultValue={props.topEditorValue}
        name={props.topEditorName}
        onChange={props.onChange}
      />
    }
    midTitle="Indicators"
    botContent={
      <QuillEditor
        editMode={props.editMode}
        name={props.botEditorName}
        defaultValue={props.botEditorValue}
        onChange={props.onChange}
      />
    }
    {...props}
  />
)

ColumnWrapper.propTypes = {
  title: PropTypes.string,
  bgClassName: PropTypes.string,
  editMode: PropTypes.bool,
  getHighestValue: PropTypes.func,
  topEditorValue: PropTypes.string,
  topEditorName: PropTypes.string,
  midContent: PropTypes.object,
  botEditorValue: PropTypes.string,
  botEditorName: PropTypes.string,
  onChange: PropTypes.func,
  onResizeTop: PropTypes.func,
  onResizeMid: PropTypes.func,
  onResizeBot: PropTypes.func,
}

export default ColumnWrapper
