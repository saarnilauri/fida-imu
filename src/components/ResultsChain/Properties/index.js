import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Fontawesome from 'react-fontawesome'
import { Button, Label } from 'reactstrap'
import { injectIntl } from 'react-intl'

import FormElement from '../../FormGroupElement'
import Card from '../../Card'
import CountrySelection from '../../Country/Select'
import ErrorMsg from '../../ErrorMsg'
import Components from './Components'

class ResultsChainProperties extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(e) {
    e.preventDefault()
    this.props.onSubmit()
  }

  render() {
    const { formatMessage } = this.props.intl
    const {
      title,
      countries,
      handleSelectCountriesChange,
      selectedComponent,
    } = this.props
    const error = null
    return (
      <Card title={formatMessage({ id: 'resultschain.form.title' })}>
        <form onSubmit={this.onSubmit}>
          {error && <ErrorMsg error={error.message} />}
          <FormElement
            onChange={this.props.setParentStateValue('title')}
            value={title}
            name="title"
            id="title"
            placeholder={formatMessage({
              id: 'resultschain.form.placeholders.title',
            })}
            icon="table"
          />
          <Components
            selected={selectedComponent}
            onChangeComponent={this.props.setParentStateValue(
              'selectedComponent',
            )}
          />
          <div className="py-2">
            <Label for="123">
              <Fontawesome name="globe" />{' '}
              {formatMessage({ id: 'resultschain.form.labels.countries' })}
            </Label>
            <CountrySelection
              value={countries}
              onChange={handleSelectCountriesChange}
            />
          </div>
          <Button type="submit">{formatMessage({ id: 'actions.save' })}</Button>
        </form>
      </Card>
    )
  }
}

ResultsChainProperties.propTypes = {
  countries: PropTypes.array,
  handleSelectCountriesChange: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  selectedComponent: PropTypes.string,
  setParentStateValue: PropTypes.func.isRequired,
  title: PropTypes.string,
}

export default injectIntl(ResultsChainProperties)
