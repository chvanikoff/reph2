const processToken = (token) => {
  window.location = "/?token=" + token;
}

const authActions = {
  register: (params) => {
    return (dispatch, getState) => {
      const { ws } = getState();
      ws.channels.auth
        .push("signup", params)
        .receive("ok", (msg) => {
          processToken(msg.token);
        })
        .receive("error", (msg) => {
          dispatch({
            type: 'AUTH_REGISTRATION_ERROR',
            errors: msg.errors
          });
        });
    }
  },
  login: (params) => {
    return (dispatch, getState) => {
      dispatch({
        type: 'AUTH_LOGIN_ERROR',
        value: false
      });
      const { ws } = getState();
      ws.channels.auth
        .push("login", params)
        .receive("ok", (msg) => {
          processToken(msg.token);
        })
        .receive("error", (msg) => {
          dispatch({
            type: 'AUTH_LOGIN_ERROR',
            value: true
          });
        });
    }
  }
};

export default authActions;