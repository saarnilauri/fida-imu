import userReducer from './user'

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(userReducer(undefined, {})).toEqual({
      users: {},
    })
  })

  it('should handle USERS_SET', () => {
    expect(userReducer(undefined, {
      type: 'USERS_SET',
      users: {
        name: 'Tester',
        email: 'test@test.com',
      },
    })).toEqual({
      users: {
        name: 'Tester',
        email: 'test@test.com',
      },
    })
  })
})
