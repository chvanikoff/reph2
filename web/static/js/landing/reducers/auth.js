const initialState = {
  login_failed: false,
  registration_errors: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "AUTH_REGISTRATION_ERROR":
      return {
        ...state,
        registration_errors: action.errors
      };
    case "AUTH_LOGIN_ERROR":
      return {
        ...state,
        login_failed: action.value
      }
    default:
      return state;
  }
}