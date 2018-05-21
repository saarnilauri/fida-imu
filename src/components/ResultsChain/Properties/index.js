import React, { Component } from 'react'
import { Card, CardBody, CardHeader, Alert, Button } from 'reactstrap'
import FormElement from '../../FormGroupElement'
import Components from './Components'
import { updateByPropertyName } from '../../../constants/utils'

class ResultsChainProperties extends Component {
  constructor(props) {
    super(props)
    this.state = { selectedComponent: '' }
  }

  toggleComponent = label => {
    console.log(label)
    this.setState(updateByPropertyName('selectedComponent', label))
  }

  render() {
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
            <FormElement name="name" id="name" placeholder="Result chain title" icon="table" />
            <FormElement name="country" id="country" placeholder="Country" icon="map" />
            <Components selected={this.state.selectedComponent} handleRadiobuttonChange={this.toggleComponent} />
            <Button type="submit">Save</Button>
          </form>
        </CardBody>
      </Card>
    )
  }
}

export default ResultsChainProperties
