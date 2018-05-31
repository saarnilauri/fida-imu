import React from 'react'
import PropTypes from 'prop-types'
import ErrorMsg from '../../ErrorMsg'
import ButtonGroup from '../../ButtonGroup'
import FormElement from '../../FormGroupElement'

const CountryListForm = props => {
  const { onSubmit, error, onNameChange, name, area, onAreaChange, code, onCodeChange, editMode, cancelEdit } = props
  const buttons = [
    {
      color: 'primary',
      onClick: () => {},
      title: editMode ? 'Save' : 'Add',
      type: 'submit',
    },
  ]
  if (editMode) {
    buttons.push({
      onClick: cancelEdit,
      color: 'secondary',
      title: 'cancel',
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
        placeholder="Country name"
        icon="map-marker"
      />
      <FormElement onChange={onAreaChange} value={area} name="area" id="area" placeholder="Region" icon="map" />
      <FormElement
        onChange={onCodeChange}
        value={code}
        name="code"
        id="code"
        placeholder="Country code (ie. fi)"
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
}

export default CountryListForm
