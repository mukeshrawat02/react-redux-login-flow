import * as type from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case type.SIGNIN_USER:
    case type.SIGNUP_USER:
      return { ...state, error: null, authenticated: false };

    case type.SIGNIN_USER_SUCCESS:
    case type.SIGNUP_USER_SUCCESS:
      return { ...state, error: null, username: action.payload, authenticated: true };

    case type.ACTIVE_SESSION:
      return { ...state, error: null, authenticated: true };

    case type.BAD_REQUEST:
      return { ...state, error: action.payload };

    case type.SIGNOUT_USER:
      return { ...state, error: null, username: null, authenticated: false };

    case type.RESET_VALIDATE_FIELDS:
      return { ...state, error: null };

    default:
      return state;
  }
}
