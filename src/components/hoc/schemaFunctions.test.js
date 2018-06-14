import {
  bool,
  checkbox,
  number,
  typeahead,
  dateTime,
  select,
  text,
  checkboxSchema,
  hiddenSchema,
  numberSchema,
  radioSchema,
  selectSchema,
  textareaSchema,
  radioEnum,
  password,
  dateTimeSchema,
  typeaheadSchema,
} from './schemaFunctions'

describe('form JSON schema functions', () => {
  it('get right schema for boolean field', () => {
    expect(bool('test')).toEqual({
      type: 'boolean',
      title: 'test',
    })
  })
  it('get right schema for text field', () => {
    expect(text('test')).toEqual({
      type: 'string',
      title: 'test',
    })
  })
  it('get right schema for number field', () => {
    expect(number('test')).toEqual({
      type: 'integer',
      title: 'test',
    })
  })
  it('get right schema for dateTime field', () => {
    expect(dateTime('test')).toEqual({
      type: 'string',
      format: 'date-time',
      title: 'test',
    })
  })
  it('get right schema for checkbox field', () => {
    expect(checkbox('test', ['a', 'b'], ['A', 'B'])).toEqual({
      type: 'array',
      title: 'test',
      uniqueItems: true,
      items: {
        enum: ['a', 'b'],
        enumNames: ['A', 'B'],
        type: 'string',
      },
    })
  })
  it('get right schema for typeahed field', () => {
    expect(typeahead('test', ['a', 'b'])).toEqual({
      type: 'array',
      title: 'test',
      uniqueItems: true,
      items: {
        enum: ['a', 'b'],
        type: 'string',
      },
    })
  })
  it('get right schema for radio enum field', () => {
    expect(radioEnum('test', ['a', 'b'])).toEqual({
      type: 'array',
      title: 'test',
      items: {
        enum: ['a', 'b'],
        type: 'string',
      },
    })
  })
  it('get right schema for password field with default min lenght', () => {
    expect(password('test')).toEqual({
      type: 'string',
      title: 'test',
      minLength: 6,
    })
  })
  it('get right schema for password field with given min lenght', () => {
    expect(password('test', 8)).toEqual({
      type: 'string',
      title: 'test',
      minLength: 8,
    })
  })

  it('get right schema for select field', () => {
    expect(select('test', ['a', 'b'], ['A', 'B'])).toEqual({
      type: 'string',
      title: 'test',
      enum: ['a', 'b'],
      enumNames: ['A', 'B'],
    })
  })

  it('get right schema for checkbox field ui widget', () => {
    expect(checkboxSchema()).toEqual({
      'ui:widget': 'checkboxes',
    })
  })
  it('get right schema for hidden field ui widget', () => {
    expect(hiddenSchema()).toEqual({
      'ui:widget': 'hidden',
    })
  })
  it('get right schema for number field ui widget', () => {
    expect(numberSchema()).toEqual({
      'ui:widget': 'updown',
    })
  })
  it('get right schema for radio field ui widget', () => {
    expect(radioSchema()).toEqual({
      'ui:widget': 'radio',
    })
  })
  it('get right schema for date time field ui widget', () => {
    expect(dateTimeSchema()).toEqual({
      'ui:widget': 'datetime',
    })
  })
  it('get right schema for typeahead field ui widget', () => {
    expect(typeaheadSchema()).toEqual({
      typeahead: {
        clearButton: true,
        multiple: true,
        options: undefined,
      },
      'ui:field': 'typeahead',
    })
  })
  it('get right schema for select field ui widget', () => {
    expect(selectSchema()).toEqual({
      'ui:widget': 'select',
    })
  })
  it('get right schema for textarea field ui widget', () => {
    expect(textareaSchema(10)).toEqual({
      'ui:widget': 'textarea',
      'ui:options': {
        rows: 10,
      },
    })
  })
  it('get right schema for textarea field ui widget with default 5 rows', () => {
    expect(textareaSchema()).toEqual({
      'ui:widget': 'textarea',
      'ui:options': {
        rows: 5,
      },
    })
  })
})
