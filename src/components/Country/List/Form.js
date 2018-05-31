import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import ButtonGroup from '../../ButtonGroup'
import ErrorMsg from '../../ErrorMsg'
import FormElement from '../../FormGroupElement'

const CountryListForm = props => {
  const { onSubmit, error, onNameChange, name, area, onAreaChange, code, onCodeChange, editMode, cancelEdit } = props
  const { formatMessage } = props.intl
  const buttons = [
    {
      color: 'primary',
      onClick: () => {},
      title: editMode ? formatMessage({ id: 'actions.save' }) : formatMessage({ id: 'actions.add' }),
      type: 'submit',
    },
  ]
  if (editMode) {
    buttons.push({
      onClick: cancelEdit,
      color: 'secondary',
      title: formatMessage({ id: 'actions.cancel' }),
    })
  }
  return (
    <form onSubmit={onSubmit}>
      {error && <ErrorMsg error={error.message} />}
      <FormElement
        onChange={onNameChange}
        value={name}
        name="name"
        id="name"
        placeholder={formatMessage({ id: 'country.list.page.form.placeholder.country' })}
        icon="map-marker"
      />
      <FormElement onChange={onAreaChange} value={area} name="area" id="area" placeholder="Region" icon="map" />
      <FormElement
        onChange={onCodeChange}
        value={code}
        name="code"
        id="code"
        placeholder={formatMessage({ id: 'country.list.page.form.placeholder.code' })}
        icon="globe"
      />
      <ButtonGroup buttons={buttons} />
    </form>
  )
}

CountryListForm.propTypes = {
  area: PropTypes.string,
  cancelEdit: PropTypes.func,
  code: PropTypes.string,
  editMode: PropTypes.bool,
  error: PropTypes.object,
  name: PropTypes.string,
  onAreaChange: PropTypes.func,
  onCodeChange: PropTypes.func,
  onNameChange: PropTypes.func,
  onSubmit: PropTypes.func,
  intl: PropTypes.func.isRequired,
}

export default injectIntl(CountryListForm)
