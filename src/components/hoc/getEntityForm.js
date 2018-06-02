import React, { Component } from 'react'
import { injectIntl } from 'react-intl'
import Form from 'react-jsonschema-form'
import { TypeaheadField } from 'react-jsonschema-form-extras/lib/TypeaheadField'
import ReactDatePicker from 'react-jsonschema-form-extras/lib/ReactDatePicker'
import { EntityFormPropTypes } from './EntityPropTypes'
import ButtonGroup from '../ButtonGroup'
import { getAddEditCancelButtonSetup } from './helperFunctions'

const customFields = { typeahead: TypeaheadField, rdp: ReactDatePicker }

const getEntityForm = (entity, formSetup, schema) => {
  class EntityForm extends Component {
    render() {
      const { onSubmit, formData, editMode, cancelEdit } = this.props
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
        <Form
          formData={formData}
          schema={schema}
          uiSchema={formSetup.uiSchema}
          fields={customFields}
          onSubmit={onSubmit}
        >
          <ButtonGroup buttons={buttons} />
        </Form>
      )
    }
  }
  EntityForm.propTypes = EntityFormPropTypes
  return injectIntl(EntityForm)
}

export default getEntityForm
