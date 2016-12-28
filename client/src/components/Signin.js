import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { Card, CardText } from 'material-ui/Card';
import toastr from 'toastr';

import { signinUser, resetValidateFields } from '../actions';
import renderTextField from '../utils/renderTextField';

const marginLeft = {
  marginLeft: 12
};

const validate = values => {
  const errors = {};
  const requiredFields = ['username', 'password'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  return errors;
}

class Signin extends Component {
  constructor() {
    super();

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
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
    const { handleSubmit, pristine, reset, submitting, fields: { username, password } } = this.props;

    return (
      <Card class="row col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <h2 class="card-heading heading">Login</h2>
          {this.onError()}

          <div>
            <Field
              name="username"
              type="text"
              component={renderTextField}
              label="Username*" />
          </div>
          <div>
            <Field
              name="password"
              type="password"
              component={renderTextField}
              label="Password*" />
          </div>

          <div class="button-line pull-right">
            <button type="submit"
              class="btn btn-primary"
              disabled={pristine || submitting}>
              Sign in
            </button>

            <button type="button"
              class="btn btn-secondary"
              onClick={this.onReset}
              disabled={pristine || submitting}
              style={marginLeft}>
              Clear Values
            </button>
          </div>
          <CardText>Don't have an account? <Link to={'/signup'}>Create one</Link>.</CardText>
        </form>
      </Card>
    );
  }

  handleFormSubmit({ username, password }) {
    this.props.signinUser({ username, password });
  }
  onReset() {
    this.props.resetValidateFields();
    this.props.reset();
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
  form: 'signin',
  fields: ['username', 'password'],
  validate
});

export default connect(mapStateToProps, { signinUser, resetValidateFields })(form(Signin));

