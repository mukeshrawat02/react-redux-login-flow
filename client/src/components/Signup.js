import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { Card, CardText } from 'material-ui/Card';
import toastr from 'toastr';

import { signupUser, resetValidateFields } from '../actions';
import renderTextField from '../utils/renderTextField';

const marginLeft = {
  marginLeft: 12
};

const validate = values => {
  const errors = {}
  const requiredFields = ['name',
    'username',
    'email',
    'password',
    'confirmPassword']
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address'
    }
    if (values.confirmPassword &&
      values.confirmPassword.trim() !== '' &&
      values.password &&
      values.password.trim() !== '' &&
      values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Password And Confirm Password don\'t match';
    }
  })
  return errors
}

class Signup extends Component {
  constructor() {
    super();

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    if (this.props.authenticated) {
      this.context.router.push('/dashboard');
    }
  }

  componentWillUnmount() {
    this.props.resetValidateFields();
  }

  render() {
    const { handleSubmit, pristine, reset, submitting, fields: {
      name,
      username,
      email,
      password,
      confirmPassword
    }
    } = this.props;

    return (
      <Card class="row col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <h2 class="card-heading heading">Sign up</h2>
          {this.onError()}

          <div>
            <Field
              name="name"
              type="text"
              component={renderTextField}
              label="Name*" />
          </div>
          <div>
            <Field
              name="username"
              type="text"
              component={renderTextField}
              label="Username*" />
          </div>
          <div>
            <Field
              name="email"
              type="email"
              component={renderTextField}
              label="Email*" />
          </div>
          <div>
            <Field
              name="password"
              type="password"
              component={renderTextField}
              label="Password*" />
          </div>
          <div>
            <Field
              name="confirmPassword"
              type="password"
              component={renderTextField}
              label="Confirm Password*" />
          </div>

          <div class="button-line pull-right">
            <button type="submit"
              class="btn btn-primary"
              disabled={pristine || submitting}>
              Sign up
            </button>

            <button type="button"
              class="btn btn-secondary"
              onClick={reset}
              disabled={pristine || submitting}
              style={marginLeft}>
              Cancel
            </button>
          </div>
          <CardText>Already have an account? <Link to={'/signin'}>Log in</Link></CardText>
        </form>
      </Card>
    );
  }

  handleFormSubmit(formProps) {
    this.props.signupUser(formProps);
  }

  onError() {
    if (this.props.errorMessage) {
      toastr.error(this.props.errorMessage);
    }
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    authenticated: state.auth.authenticated
  };
}

const form = reduxForm({
  form: 'signup',
  fields: ['name', 'username', 'email', 'password', 'confirmPassword'],
  validate
});

export default connect(mapStateToProps, { signupUser, resetValidateFields })(form(Signup));

