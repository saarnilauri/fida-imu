import React, { Component } from 'react'
import { compose } from 'recompose'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

import withEntities from './withEntities'

const getEntitySelect = entity => {
  class EntitySelect extends Component {
    render() {
      const { ready, data, onChange, value } = this.props
      const { formatMessage } = this.props.intl
      const view = ready ? (
        <Select
          multi
          closeOnSelect={false}
          placeholder={formatMessage({ id: `${entity}.select.placeholder` })}
          name="countries"
          options={data}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={onChange}
          value={value}
        />
      ) : null
      return view
    }
  }

  EntitySelect.defaultProps = {
    data: [],
  }

  EntitySelect.propTypes = {
    ready: PropTypes.bool,
    data: PropTypes.array,
    intl: PropTypes.object,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.bool, PropTypes.object, PropTypes.array, PropTypes.string]),
  }

  return compose(injectIntl, withEntities(entity))(EntitySelect)
}
export default getEntitySelect
