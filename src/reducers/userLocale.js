const INITIAL_STATE = {
  locale: 'fi',
}

export const setNavigatorLanguage = () => ({ type: 'SET_LOCALE', payload: navigator.language.substr(0, 2) })
export const setLocaleLanguage = locale => ({ type: 'SET_LOCALE', payload: locale })

const applySetLocale = (state, action) => ({
  locale: action.payload,
})

const userLocaleReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SET_LOCALE': {
    if (localStorage) {
      localStorage.setItem('locale', action.payload)
    }
    return applySetLocale(state, action)
  }
  default:
    return state
  }
}

export default userLocaleReducer
