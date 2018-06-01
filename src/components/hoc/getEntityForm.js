import React, { Component } from 'react'
import { injectIntl } from 'react-intl'
import { EntityFormPropTypes } from './EntityPropTypes'
import ButtonGroup from '../ButtonGroup'
import Form from '../Form'
import FormElement from '../FormGroupElement'
import { getAddEditCancelButtonSetup } from './helperFunctions'

const getEntityForm = (entity, formFields) => {
  class EntityForm extends Component {
    render() {
      const { onSubmit, error, onValueChange, getValue, editMode, cancelEdit } = this.props
      const { formatMessage } = this.props.intl
      const buttons = getAddEditCancelButtonSetup({
        title: {
          add: formatMessage({ id: 'actions.add' }),
          save: formatMessage({ id: 'actions.save' }),
          cancel: formatMessage({ id: 'actions.cancel' }),
        },
        editMode,
        cancelEdit,
      })
      return (
        <Form onSubmit={onSubmit} error={error ? error.message : null}>
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
        </Form>
      )
    }
  }
  EntityForm.propTypes = EntityFormPropTypes
  return injectIntl(EntityForm)
}

export default getEntityForm
