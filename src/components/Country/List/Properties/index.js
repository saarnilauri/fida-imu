import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, CardBody, CardHeader, Alert, Button } from 'reactstrap'
import FormElement from '../../../FormGroupElement'

class ResultsChainProperties extends Component {
  static propTypes = {
    title: PropTypes.string,
    country: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    setParentStateValue: PropTypes.func.isRequired,
    selectedComponent: PropTypes.string,
  }
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(e) {
    e.preventDefault()
    this.props.onSubmit()
  }

  render() {
    const { title, country } = this.props
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
            <FormElement
              onChange={this.props.setParentStateValue('country')}
              value={country}
              name="country"
              id="country"
              placeholder="Country"
              icon="map"
            />
            <Components
              selected={this.props.selectedComponent}
              onChangeComponent={this.props.setParentStateValue('selectedComponent')}
            />
            <Button type="submit">Save</Button>
          </form>
        </CardBody>
      </Card>
    )
  }
}

export default ResultsChainProperties
