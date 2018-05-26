import React from 'react'
import PropTypes from 'prop-types'
import { FormGroup, Label } from 'reactstrap'
import Fontawesome from 'react-fontawesome'
import Radiobutton from '../../Radiobutton'

const components = ['istuta', 'moninkertaista', 'uudista']

const Components = props => (
  <FormGroup>
    <Label>
      <Fontawesome name="cube" /> Strategic components
    </Label>
    <div>
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
    </div>
  </FormGroup>
)

Components.propTypes = {
  onChangeComponent: PropTypes.func.isRequired,
  selected: PropTypes.string,
}

export default Components
