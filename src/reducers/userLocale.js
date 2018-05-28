const INITIAL_STATE = {
  locale: 'fi',
}

const applySetLocale = (state, action) => ({
  locale: action.payload,
})

const userLocaleReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SET_LOCALE': {
    return applySetLocale(state, action)
  }
  default:
    return state
  }
}

export default userLocaleReducer
