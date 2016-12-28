import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import NotFoundPage from './components/NotFound';

import HomePage from './components/Home';
import SigninPage from './components/Signin';
import SignoutPage from './components/Signout';
import SignupPage from './components/Signup';
import Dashboard from './components/Dashboard';
import RequireAuth from './utils/RequireAuth';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="signin" component={SigninPage} />
     <Route path="signout" component={SignoutPage} />
    <Route path="signup" component={SignupPage} />
    <Route path="dashboard" component={RequireAuth(Dashboard)} />

    <Route path="*" component={NotFoundPage} />
  </Route>
);