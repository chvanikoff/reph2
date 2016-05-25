import React from "react";
import { connect } from "react-redux";

import authActions from 'actions/auth';


class Registration extends React.Component {
  componentDidMount() {
    // Clean up all previously set errors before rendering the element
    this.props.dispatch({
      type: 'AUTH_REGISTRATION_ERROR',
      errors: []
    });
  }

  render() {
    const errors = this.buildErrors(this.props.errors);
    return <main role="main">
      <div className="jumbotron">
        <form className="form-auth" onSubmit={this.handleSubmit.bind(this)}>
          <h2 className="form-auth-heading">Registration</h2>
          <label htmlFor="inputEmail" className="sr-only">Email</label>
          <input ref="email" type="text" placeholder="Email" className="form-control input-first" id="inputEmail" required autofocus />
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input ref="password" type="password" placeholder="Password" className="form-control input-inner" id="inputPassword" required />
          <label htmlFor="inputPasswordConfirm" className="sr-only">Password confirmation</label>
          <input ref="password_confirmation" type="password" placeholder="Password confirmation" className="form-control input-last" id="inputPasswordConfirm" required />
          <div className="checkbox">
            <label>
              <input ref="terms_confirmation" type="checkbox" value="true" /> I agree to <a href="#">the terms and conditions</a>
            </label>
          </div>
          <input className="btn btn-lg btn-info btn-block" type="submit" value="Register" />
          {errors}
        </form>
      </div>
    </main>;
  }

  handleSubmit(e) {
    e.preventDefault();

    const data = {
      email: this.refs.email.value,
      password_plain: this.refs.password.value,
      password_plain_confirmation: this.refs.password_confirmation.value,
      terms_confirmed: this.refs.terms_confirmation.checked
    };
    const { dispatch } = this.props;

    dispatch(authActions.register(data));
  }

  buildErrors(errors) {
    if (errors == []) {
      return null;
    }
    let errors_elements = [];
    let key, el, err_key;
    let i = 0;
    for (err_key in errors) {
      i++;
      key = `signupError${i}`;
      el = <li key={key}>{errors[err_key]}</li>;
      errors_elements.push(el);
    }
    return <div className="form_errors">
      <ul>{errors_elements}</ul>
    </div>;
  }
};

const mapStateToProps = (state) => {
  return {
    errors: state.auth.registration_errors
  };
};
export default connect(mapStateToProps)(Registration);