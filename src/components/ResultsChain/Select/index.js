import React from 'react'
import PropTypes from 'prop-types'
import { Input, Label, FormGroup } from 'reactstrap'
import { injectIntl } from 'react-intl'
import uuid from 'uuid'

const ResultsChainSelect = props => {
  const { formatMessage } = props.intl
  return (
    <FormGroup inline>
      <Label>{formatMessage({ id: 'resultschain.select.label' })}</Label>
      <Input
        type="select"
        name="select"
        id="exampleSelect"
        onChange={props.onSelect}
      >
        <option value="__null">
          {formatMessage({ id: 'resultschain.select.option.select' })}
        </option>
        {props.resultsChains.map(item => (
          <option key={uuid()} value={item.uid}>
            {item.title}
          </option>
        ))}
        <option value="__new">
          +{formatMessage({ id: 'resultschain.select.option.new' })}
        </option>
      </Input>
    </FormGroup>
  )
}

ResultsChainSelect.propTypes = {
  intl: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  resultsChains: PropTypes.array.isRequired,
}

export { ResultsChainSelect }
const EnhachedResultsChainSelect = injectIntl(ResultsChainSelect)
export default EnhachedResultsChainSelect
