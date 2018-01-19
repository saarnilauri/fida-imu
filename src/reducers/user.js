import _ from 'lodash'

const INITIAL_STATE = {
  users: {},
}

const applySetUsers = (state, action) => (_.assign(state, {
  users: action.users,
}))

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'USERS_SET': {
    return applySetUsers(state, action)
  }
  default:
    return state
  }
}

export default userReducer
