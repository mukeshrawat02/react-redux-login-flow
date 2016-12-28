import expect from 'expect';
import React from 'react';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';

import * as actions from '../../src/actions';
import * as types from '../../src/actions/types';


describe('Signin Action', () => {
  describe('signinUserSuccess', () => {
    it('should create a SIGNIN_USER_SUCCESS action', () => {
      //arrange
      const payload = 'mukeshrawat0284';
      const expectedAction = {
        type: types.SIGNIN_USER_SUCCESS,
        payload
      };

      //act
      const action = actions.signinUserSuccess(payload);

      //assert
      expect(action).toEqual(expectedAction);
    });
  });
});

describe('Signup Action', () => {
  describe('signupUserSuccess', () => {
    it('should create a SIGNUP_USER_SUCCESS action', () => {
      //arrange
      const payload = 'mukeshrawat0284';
      const expectedAction = {
        type: types.SIGNUP_USER_SUCCESS,
        payload
      };

      //act
      const action = actions.signupUserSuccess(payload);

      //assert
      expect(action).toEqual(expectedAction);
    });
  });
});

describe('GET User Action', () => {
  describe('getUserSuccess', () => {
    it('should create a LOAD_USER_SUCCESS action', () => {
      //arrange
      const payload = { name: "mukesh", email: "mukesh@xyz.com", username: "mrawat" };
      const expectedAction = {
        type: types.LOAD_USER_SUCCESS,
        payload
      };

      //act
      const action = actions.getUserSuccess(payload);

      //assert
      expect(action).toEqual(expectedAction);
    });
  });
});