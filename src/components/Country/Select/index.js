import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

import withCountries from '../../hoc/withCountries'

const CountrySelect = props => {
  const view = props.ready ? (
    <Select
      multi
      closeOnSelect={false}
      placeholder="Select related countries"
      name="countries"
      options={props.data}
      className="basic-multi-select"
      classNamePrefix="select"
      onChange={props.onChange}
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

export { CountrySelect }
const enhanchedCountrySelect = withCountries(CountrySelect)
export default enhanchedCountrySelect
