import sessionReducer from './session'

describe('session reducer', () => {
  it('should return the initial state', () => {
    expect(sessionReducer(undefined, {})).toEqual({
      authUser: null,
    })
  })

  it('should handle AUTH_USER_SET', () => {
    expect(
      sessionReducer(undefined, {
        type: 'AUTH_USER_SET',
        authUser: {
          name: 'Tester',
          email: 'test@test.com',
        },
      }),
    ).toEqual({
      authUser: {
        name: 'Tester',
        email: 'test@test.com',
      },
    })
  })
})
