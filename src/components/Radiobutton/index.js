import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormGroup, Input, Label } from 'reactstrap'

class Radiobutton extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isChecked: props.isChecked,
    }
  }

  toggleRadiobuttonChange = () => {
    const { handleRadiobuttonChange, label } = this.props

    /* this.setState(({ isChecked }) => ({
      isChecked: !isChecked,
    })) */

    handleRadiobuttonChange(label)
  }

  render() {
    const { label, name } = this.props
    const { isChecked } = this.state

    return (
      <FormGroup check inline className="checkbox" key={Math.random() * 10000}>
        <Input
          className="form-check-input"
          type="radio"
          defaultChecked={isChecked}
          id={`checkbox_${label}`}
          name={name}
          value={label}
          onChange={this.toggleRadiobuttonChange}
        />
        <Label check className="form-check-label" htmlFor={`checkbox_${label}`}>
          {label}
        </Label>
      </FormGroup>
    )
  }
}

Radiobutton.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isChecked: PropTypes.bool,
  handleRadiobuttonChange: PropTypes.func.isRequired,
}

export default Radiobutton
