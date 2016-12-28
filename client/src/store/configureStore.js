import {createStore, applyMiddleware} from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import reduxThunk from 'redux-thunk';

import rootReducer from '../reducers';

export default function configureStore(initalState) {
    return createStore(rootReducer, initalState, applyMiddleware(reduxThunk, reduxImmutableStateInvariant())
  );
}
