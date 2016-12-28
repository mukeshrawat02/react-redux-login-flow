import axios from 'axios';
import { browserHistory } from 'react-router';
import * as types from './types';

const API_URL = 'http://localhost:9000/api';

export function signinUser({ username, password }) {
  return function (dispatch) {
    dispatch({
      type: types.SIGNIN_USER
    });

    return axios.post(`${API_URL}/signin`, { username, password })
      .then(response => {
        dispatch(signinUserSuccess(response.data.content.username));
        // - Save the JWT token
        setToken(response.data.token);
        // - redirect to the route '/dashboard'
        browserHistory.push('/dashboard');
      })
      .catch((error) => dispatch(onError(error.response || error)));
  }
};

export function signinUserSuccess(payload) {
  return {
    type: types.SIGNIN_USER_SUCCESS,
    payload
  };
}

export function signupUser({name, username, email, password}) {
  return dispatch => {
    dispatch({
      type: types.SIGNUP_USER
    });

    axios.post(`${API_URL}/signup`, { name, username, email, password })
      .then(response => {
        dispatch(signupUserSuccess(response.data.content.username));
        setToken(response.data.token);
        browserHistory.push('/dashboard');
      })
      .catch(error => dispatch(onError(error.response || error)));
  }
}

export function signupUserSuccess(payload) {
  return {
    type: types.SIGNUP_USER_SUCCESS,
    payload
  };
}

export const signoutUser = () => {
  removeToken();
  return {
    type: types.SIGNOUT_USER
  };
}


export const getCurrentUser = () => {
  var token = getToken();
  return (dispatch, state) => {
    dispatch({
      type: types.LOAD_USER
    });

    axios.get(`${API_URL}/user`, {
      headers: { 'x-access-token': token }
    })
      .then(response => {
        dispatch(getUserSuccess(response.data.content));
      })
      .catch(error => dispatch(onLoadUserError(error.response || error)));
  }
}

export function getUserSuccess(payload) {
  return {
    type: types.LOAD_USER_SUCCESS,
    payload
  };
}

export const updateUser = ({name, username, email}) => {
  var token = getToken();
  return (dispatch, state) => {
    dispatch({
      type: types.UPDATE_USER
    });

    axios.put(`${API_URL}/user`, { name, username, email }, {
      headers: { 'x-access-token': token }
    })
      .then(response => dispatch({
        type: types.UPDATE_USER_SUCCESS,
        payload: response.data.content
      })
      )
      .catch(error => dispatch(onUpdateUserError(error.response || error)));
  }
}

export function resetValidateFields() {
  return {
    type: types.RESET_VALIDATE_FIELDS
  }
};

export const onError = (response) => {
  return {
    type: types.BAD_REQUEST,
    payload: getErrorMessage(response)
  };
}

export const onLoadUserError = (response) => {
  return {
    type: types.UPDATE_USER_FAIL,
    payload: getErrorMessage(response)
  };
}

export const onUpdateUserError = (response) => {
  return {
    type: types.UPDATE_USER_FAIL,
    payload: getErrorMessage(response)
  };
}

const getErrorMessage = (response) => {
  let errorMessage;
  if (response.data) {
    errorMessage = response.data;
  }
  else {
    errorMessage = response;
  }
  return errorMessage;
}

const setToken = (token) => {
  localStorage.setItem('token', token);
}

export const getToken = () => {
  return localStorage.getItem('token');
}

const removeToken = () => {
  localStorage.removeItem('token');
}