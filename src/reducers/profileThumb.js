import find from 'lodash/find'

const INITIAL_STATE = {
  thumb: null,
}

export const applySetUserProfileThumb = (state, action) => {
  // console.log(state, action)
  return {
    ...state,
    thumb: action.payload,
  }
}

export const loadThumbURL = uid => (dispatch, getState, getFirebase) => {
  const firebase = getFirebase()
  firebase
    .ref('images')
    .once('value')
    .then(snap => {
      const userImage = find(snap.val(), image => {
        return image.parentFolder === uid && image.name.indexOf('uploadedFiles/user') !== -1
      })
      if (userImage) {
        dispatch({ type: 'SET_PROFILE_THUMB', payload: userImage.tiny })
      }
    })
}

const profileThumbReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SET_PROFILE_THUMB': {
    return applySetUserProfileThumb(state, action)
  }
  default:
    return state
  }
}

export default profileThumbReducer
