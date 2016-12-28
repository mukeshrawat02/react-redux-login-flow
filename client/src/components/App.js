import React, { PropTypes, Component } from 'react';

import Header from './Header';
import Footer from './Footer'

export default class App extends Component {
  render() {
    return (
      <div class="container-fluid">
        <Header />
        <div class="container mainbox">
            {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
};

