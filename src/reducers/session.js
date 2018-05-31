const INITIAL_STATE = {
  authUser: null
};

const applySetAuthUser = (state, action) => ({
  ...state,
  authUser: action.authUser
});

const applySetUserProfile = (state, action) => ({
  ...state,
  userProfile: action.userProfile
});

const sessionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "AUTH_USER_SET": {
      return applySetAuthUser(state, action);
    }
    case "SET_USER_PROFILE": {
      return applySetUserProfile(state, action);
    }
    default:
      return state;
  }
};

export default sessionReducer;
