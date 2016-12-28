import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';
import './styles/main.scss';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import routes from './routes';
import { ACTIVE_SESSION } from './actions/types';
import { getToken, getCurrentUser } from './actions';
import configureStore from './store/configureStore.js';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const store = configureStore();

const token = getToken();
// If we have a token, consider the user to be signed in
if (token) {
    store.dispatch({ type: ACTIVE_SESSION });
    store.dispatch(getCurrentUser());
}

render(
    <Provider store={store}>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
            <Router history={browserHistory} routes={routes} />
        </MuiThemeProvider>
    </Provider>,
    document.querySelector('.container'));