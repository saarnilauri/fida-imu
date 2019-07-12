export const text = title => ({ type: 'string', title })
export const number = title => ({ type: 'integer', title })
export const dateTime = title => ({
  type: 'string',
  title,
  format: 'date-time',
})
export const bool = title => ({ type: 'boolean', title })
export const radioEnum = (title, itemValues) => ({
  type: 'array',
  title,
  items: {
    type: 'string',
    enum: itemValues,
  },
})
export const typeahed = title => ({ type: 'typeahed', title })
export const checkbox = (title, itemValues, itemNames) => ({
  type: 'array',
  title,
  uniqueItems: true,
  items: {
    type: 'string',
    enum: itemValues,
    enumNames: itemNames,
  },
})
export const select = (title, items, itemNames) => ({
  type: 'string',
  title,
  enum: items,
  enumNames: itemNames,
})
export const password = (title, minLength = 6, placeholder = false) => {
  let field = text(title, placeholder)
  field = Object.assign(field, { minLength })
  return field
}
export const typeahead = (title, values) => ({
  type: 'array',
  title,
  items: {
    type: 'string',
    enum: values,
  },
  uniqueItems: true,
})

const schema = value => ({ 'ui:widget': value })
export const textareaSchema = (rows = 5) =>
  Object.assign(schema('textarea'), { 'ui:options': { rows } })
export const radioSchema = () => schema('radio')
export const numberSchema = () => schema('updown')
export const hiddenSchema = () => schema('hidden')
export const checkboxSchema = () => schema('checkboxes')
export const selectSchema = () => schema('select')
export const dateTimeSchema = () => schema('datetime')
export const passwordSchema = () => schema('password')

export const typeaheadSchema = options => ({
  'ui:field': 'typeahead',
  typeahead: {
    options,
    clearButton: true,
    multiple: true,
  },
})
