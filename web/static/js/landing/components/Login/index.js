import React from "react";
import { connect } from "react-redux";

import authActions from "actions/auth";


class Login extends React.Component {
  componentDidMount() {
    // Clean up all previously set errors before rendering the element
    this.props.dispatch({
      type: 'AUTH_LOGIN_ERROR',
      value: false
    });
  }
  render() {
    let error;
    if (this.props.login_failed) {
      error = <div className="form_errors">
        <ul>Invalid login or password</ul>
      </div>;
    }
    return <main role="main">
      <div className="jumbotron">
        <form className="form-auth" onSubmit={this.handleSubmit.bind(this)}>
          <h2 className="form-auth-heading">Sign in</h2>
          <label htmlFor="inputEmail" className="sr-only">Username</label>
          <input ref="email" type="text" placeholder="Email" className="form-control input-first" id="inputEmail" required={true} autofocus />
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input ref="password" type="password" placeholder="Password" className="form-control input-last" id="inputPassword" required={true} />
          <button className="btn btn-lg btn-success btn-block" type="submit">Sign in</button>
          {error}
        </form>
      </div>
    </main>;
  }

  handleSubmit(e) {
    e.preventDefault();

    const { email, password } = this.refs;
    const { dispatch } = this.props;
    const params = {email: email.value, password: password.value};

    dispatch(authActions.login(params));
  }
};

const mapStateToProps = (state) => {
  return {
    login_failed: state.auth.login_failed
  };
};
export default connect(mapStateToProps)(Login);