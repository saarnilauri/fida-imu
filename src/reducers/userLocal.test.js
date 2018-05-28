import userLocaleReducer from './userLocale'

describe('userLocale reducer', () => {
  it('should return the initial state', () => {
    expect(userLocaleReducer(undefined, {})).toEqual({
      locale: 'fi',
    })
  })

  it('should handle SET_LOCALE', () => {
    expect(
      userLocaleReducer(undefined, {
        type: 'SET_LOCALE',
        payload: 'en',
      }),
    ).toEqual({
      locale: 'en',
    })
  })
})
