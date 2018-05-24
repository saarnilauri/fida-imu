import React from 'react'
import PropTypes from 'prop-types'
import { Col, FormGroup, Label } from 'reactstrap'
import Radiobutton from '../../Radiobutton'

const components = ['istuta', 'moninkertaista', 'uudista']

const Components = props => (
  <FormGroup>
    <Col md="12">
      <Label>Strategic components</Label>
    </Col>
    <Col md="12">
      {components.map(comp => (
        <Radiobutton
          name="components"
          isChecked={props.selected === comp}
          label={comp}
          value={comp}
          onChange={props.onChangeComponent}
          key={Math.random() * 10000}
        />
      ))}
    </Col>
  </FormGroup>
)

Components.propTypes = {
  onChangeComponent: PropTypes.func.isRequired,
  selected: PropTypes.string,
}

export default Components
