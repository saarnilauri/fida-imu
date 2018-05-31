import notificationReducer from './notifications'

describe('notification reducer', () => {
  it('should return the initial state', () => {
    expect(notificationReducer(undefined, {})).toEqual({
      notification: '',
    })
  })

  it('should handle NOTIFICATION', () => {
    expect(
      notificationReducer(undefined, {
        type: 'NOTIFICATION',
        payload: 'test',
      }),
    ).toEqual({ notification: 'test' })
  })
  it('should handle NOTIFICATION', () => {
    expect(
      notificationReducer(undefined, {
        type: 'CLEAN_NOTIFICATION',
      }),
    ).toEqual({ notification: '' })
  })
})
