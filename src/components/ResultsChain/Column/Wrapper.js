import React from 'react'
import PropTypes from 'prop-types'
import ResultsChainColumn from './index'
import QuillEditor from '../../QuillEditor'

const ColumnWrapper = props => (
  <ResultsChainColumn {...props}>
    <QuillEditor
      defaultValue={props.topEditorValue}
      editMode={props.editMode}
      name={`${props.sysName}TopEditor`}
      onChange={props.onChange}
    />
    {props.children}
    <QuillEditor
      defaultValue={props.botEditorValue}
      editMode={props.editMode}
      name={`${props.sysName}BotEditor`}
      onChange={props.onChange}
    />
  </ResultsChainColumn>
)

ColumnWrapper.propTypes = {
  bgClassName: PropTypes.string,
  botEditorName: PropTypes.string,
  botEditorValue: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.string,
  ]),
  editMode: PropTypes.bool,
  getHighestValue: PropTypes.func,
  onChange: PropTypes.func,
  onResizeBot: PropTypes.func,
  onResizeMid: PropTypes.func,
  onResizeTop: PropTypes.func,
  sysName: PropTypes.string,
  title: PropTypes.string,
  topEditorName: PropTypes.string,
  topEditorValue: PropTypes.string,
}

export default ColumnWrapper
