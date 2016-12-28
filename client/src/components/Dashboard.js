import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { Card, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField'
import toastr from 'toastr';

import { getCurrentUser, updateUser, resetValidateFields } from '../actions';
import renderTextField from '../utils/renderTextField';

const marginLeft = {
  marginLeft: 12
};

const validate = values => {
  const errors = {};
  const requiredFields = ['email'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address'
    }
  });
  return errors;
}

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: Object.assign({}, this.props.user)
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentWillMount() {
    this.props.getCurrentUser();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ user: Object.assign({}, nextProps.user) });
  }

  handleChange(event) {
    // to clean up notifications
    this.props.resetValidateFields();

    const field = event.target.name;
    let user = this.state.user;
    user[field] = event.target.value;
    return this.setState({ user: user });
  }


  handleFormSubmit() {
    this.props.updateUser(this.state.user);
  }

  Notify() {
    if (this.props.errorMessage) {
      toastr.error(this.props.errorMessage);
    }
    if (this.props.messsage) {
      toastr.success(this.props.messsage);
    }
  }

  componentWillUnmount() {
    this.props.resetValidateFields();
  }

  render() {
    const { handleSubmit, handleChange, pristine, reset, submitting, fields: { name, username, email } } = this.props;
    return (
      <Card class="row col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 card-shadow ">
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <h2 class="card-heading heading">Profile Setting</h2>

          {this.Notify()}

          <div>
            <TextField
              name="name"
              value={this.state.user.name}
              onChange={this.handleChange}
              floatingLabelText="name" />
          </div>
          <div>
            <TextField
              name="username"
              disabled={true}
              value={this.props.user.username}
              floatingLabelText="username" />
          </div>
          <div>
            <TextField
              name="email"
              value={this.state.user.email}
              onChange={this.handleChange}
              floatingLabelText="email" />
          </div>

          <div class="button-line pull-right">
            <button type="submit"
              class="btn btn-primary">
              Update
            </button>

            <button type="button"
              class="btn btn-secondary"
              onClick={reset}
              disabled={pristine || submitting}
              style={marginLeft}>
              Cancel
            </button>
          </div>
          <div>
          </div>
        </form>
      </Card>
    );
  }

}

function mapStateToProps(state) {
  return {
    user: state.user.data || { name: '', username: '', email: '' },
    errorMessage: state.user.error,
    messsage: state.user.messsage
  };
}

const form = reduxForm({
  form: 'dashboard',
  fields: ['name', 'username', 'email'],
  validate
});

export default connect(mapStateToProps, { getCurrentUser, updateUser, resetValidateFields })(form(Dashboard));