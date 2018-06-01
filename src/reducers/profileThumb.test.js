import profileThumbReducer, { applySetUserProfileThumb } from './profileThumb'

describe('profile picture thumbnail reducer', () => {
  it('should return the initial state', () => {
    expect(profileThumbReducer(undefined, {})).toEqual({
      thumb: null,
    })
  })

  it('should handle SET_PROFILE_THUMB', () => {
    expect(
      profileThumbReducer(undefined, {
        type: 'SET_PROFILE_THUMB',
        payload: 'http://www.test.com/image.jpg',
      }),
    ).toEqual({
      thumb: 'http://www.test.com/image.jpg',
    })
  })

  it('applySetUserProfileThumb returns action', () => {
    expect(applySetUserProfileThumb({ val: 'test' }, { payload: 'test.jpg' })).toEqual({
      val: 'test',
      thumb: 'test.jpg',
    })
  })
})
