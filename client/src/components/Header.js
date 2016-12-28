import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class Header extends Component {
    renderLinks() {
        if (this.props.authenticated) {
            return [
                <li class="nav-item welcome-user" key={1}>
                    <Link class="subheading" to="/dashboard">Welcome, 
                        <span class="subheading" >
                            {this.props.username}
                        </span>
                    </Link>
                </li>,
                <li class="nav-item" key={2}>
                    <Link class="nav-link" to="/signout">Sign Out</Link>
                </li>
            ]
        }
        else {
            // show a link to sign in or sign up
            return [
                <li class="nav-item" key={1}>
                    <Link class="nav-link" to="/signin">Sign In</Link>
                </li>,
                <li class="nav-item" key={2}>
                    <Link class="nav-link" to="/signup">Sign Up</Link>
                </li>
            ];
        }
    };
    render() {
        return (
            <section>
                <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
                    <div class="container">
                        <div class="navbar-header">
                            <Link to="/" class="navbar-brand logo-container">React User Portal</Link>
                        </div>
                        <ul class="nav navbar-nav navbar-right">
                            {this.renderLinks()}
                        </ul>
                    </div>
                </nav>
            </section>
        );
    };
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        username:  state.auth.authenticated ? (state.auth.username || state.user.data.username) : null
    };
}

export default connect(mapStateToProps)(Header);
