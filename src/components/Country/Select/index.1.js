import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

import withCountries from '../../hoc/withCountries'

const CountrySelect = props => {
  console.log(props)
  const view = props.ready ? (
    <Select
      // defaultValue={props.defaultValue}
      multi
      closeOnSelect={false}
      placeholder="Select related countries"
      name="countries"
      options={props.data}
      className="basic-multi-select"
      classNamePrefix="select"
      // closeOnSelect={false}
      onChange={props.onChange}
      // placeholder="Select your favourite(s)"
      // removeSelected={this.state.removeSelected}
      // rtl={this.state.rtl}
      // simpleValue
      value={props.value}
    />
  ) : null
  return view
}

CountrySelect.defaultProps = {
  data: [],
}

CountrySelect.propTypes = {
  data: PropTypes.array,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]),
}

export default withCountries(CountrySelect)
