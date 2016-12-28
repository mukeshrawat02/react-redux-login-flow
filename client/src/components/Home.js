import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

class Home extends Component {
  render() {
    return (
      <div class="jumbotron">
        <h1>Welcome to User Administration Application</h1>
        <p>React, Redux and Node JS responsive web app.</p>
      </div>
    );
  }
}

export default connect(null, actions)(Home);
