import React from 'react'
import PropTypes from 'prop-types'
import { Typeahead } from 'react-bootstrap-typeahead'

import withCountries from '../../hoc/withCountries'

const CountrySelect = props => {
  const view = props.ready ? (
    <Typeahead
      labelKey="label"
      multiple
      options={props.data}
      defaultSelected={props.value || []}
      onChange={props.onChange}
      placeholder="Select related countries"
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
  value: PropTypes.oneOfType([PropTypes.bool, PropTypes.object, PropTypes.array, PropTypes.string]),
}

export { CountrySelect }
const enhanchedCountrySelect = withCountries(CountrySelect)
export default enhanchedCountrySelect
