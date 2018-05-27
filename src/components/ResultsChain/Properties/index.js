import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, CardBody, CardHeader, Alert, Button, Label } from 'reactstrap'
import Fontawesome from 'react-fontawesome'
import FormElement from '../../FormGroupElement'
import CountrySelection from '../../Country/Select'
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
    const { title, countries, handleSelectCountriesChange, selectedComponent } = this.props
    const error = null
    return (
      <Card>
        <CardHeader>Results chain properties</CardHeader>
        <CardBody>
          <form onSubmit={this.onSubmit}>
            {error && (
              <div className="py-2">
                <Alert color="danger">{error.message}</Alert>
              </div>
            )}
            <FormElement
              onChange={this.props.setParentStateValue('title')}
              value={title}
              name="title"
              id="title"
              placeholder="Result chain title"
              icon="table"
            />
            <Components
              selected={selectedComponent}
              onChangeComponent={this.props.setParentStateValue('selectedComponent')}
            />
            <div className="py-2">
              <Label for="123">
                <Fontawesome name="globe" /> Coutries
              </Label>
              <CountrySelection value={countries} onChange={handleSelectCountriesChange} />
            </div>
            <Button type="submit">Save</Button>
          </form>
        </CardBody>
      </Card>
    )
  }
}

ResultsChainProperties.propTypes = {
  countries: PropTypes.array,
  handleSelectCountriesChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  selectedComponent: PropTypes.string,
  setParentStateValue: PropTypes.func.isRequired,
  title: PropTypes.string,
}

export default ResultsChainProperties
