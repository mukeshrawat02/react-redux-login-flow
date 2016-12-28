import * as type from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case type.LOAD_USER:
      return { ...state, data: {} };

    case type.LOAD_USER_SUCCESS:
      return { ...state, data: action.payload, error: null,  messsage: null };

    case type.LOAD_USER_FAIL:
      return { ...state, error: action.payload, messsage: null };

    case type.UPDATE_USER:
      return { ...state, data: {} };

    case type.UPDATE_USER_SUCCESS:
      return { ...state, data: action.payload, error: null, messsage: "Your profile has been successfully updated" };

    case type.UPDATE_USER_FAIL:
      return { ...state, error: action.payload, messsage: null};

    case type.RESET_VALIDATE_FIELDS:
      return { ...state, error: null, messsage: null };

    default:
      return state;
  }
}
