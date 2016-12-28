import React from 'react';
import expect from 'expect';
import { mount, shallow } from 'enzyme';

import SignupPage from '../../src/components/Signup';

function setup(saving) {
  const props = {
    actions: { signupUser: () => { return Promise.resolve(); } },
    handleSubmit: () => { },
    fields: {
      name: "name",
      username: "username",
      email: "email",
      password: "pass",
      confirmPassword: "pass"
    }
  };

  return shallow(<SignupPage {...props} />);
}

describe('Signup Page', () => {

  // it('should renders form and h2', () => {
  //   const wrapper = setup();
  //   expect(wrapper.find('form').length).toBe(1);
  //   expect(wrapper.find('h2').text()).toEqual('Sign up');
  // });

  // it('should show error message when trying to save with empty username', () => {
  //   const wrapper = setup();
  //   const saveButton = wrapper.find('button').hasClass("btn-primary");
  //   expect(saveButton.prop('type')).toBe('submit');
  //   saveButton.simulate('click');
  //   expect(wrapper.state().errors.title).toBe('Title must be at least 5 characters.');

  // });
});
