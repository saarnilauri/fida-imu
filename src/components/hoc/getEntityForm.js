import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import ErrorMsg from '../ErrorMsg'
import ButtonGroup from '../ButtonGroup'
import FormElement from '../FormGroupElement'

const getEntityForm = (entity, formFields) => {
  class EntityForm extends Component {
    render() {
      const { onSubmit, error, onValueChange, getValue, editMode, cancelEdit } = this.props
      const { formatMessage } = this.props.intl
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
          {Object.keys(formFields).map(key => (
            <FormElement
              key={key}
              onChange={onValueChange}
              value={getValue(key)}
              name={key}
              id={key}
              placeholder={formatMessage({ id: `${entity}.list.page.form.placeholder.${key}` })}
              icon={formFields[key].icon}
            />
          ))}
          <ButtonGroup buttons={buttons} />
        </form>
      )
    }
  }

  EntityForm.propTypes = {
    cancelEdit: PropTypes.func,
    editMode: PropTypes.bool,
    onValueChange: PropTypes.func,
    getValue: PropTypes.func,
    onSubmit: PropTypes.func,
    intl: PropTypes.object.isRequired,
    error: PropTypes.string,
  }

  return injectIntl(EntityForm)
}

export default getEntityForm
