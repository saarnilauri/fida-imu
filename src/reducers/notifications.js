const INITIAL_STATE = {
  notification: ""
};

export const sendNotification = payload => ({
  type: "NOTIFICATION",
  payload
});

const applySetPayload = (state, action) => ({
  ...state,
  notification: action.payload
});

const notificationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "NOTIFICATION": {
      return applySetPayload(state, action);
    }
    case "CLEAN_NOTIFICATION": {
      return applySetPayload(state, { payload: "" });
    }
    default:
      return state;
  }
};

export default notificationReducer;
