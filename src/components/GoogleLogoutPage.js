import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { GoogleLogout } from 'react-google-login';
import {logoutUser} from '../actions/logout'

class GoogleLoginPage extends Component{
  responseGoogle = (response) => {
    console.log(response);
    this.props.dispatch(logoutUser(response));
  }

  render(){
  return (
    <GoogleLogout
      clientId = {process.env.CLIENT_ID}
      buttonText="Logout"
      icon={false}
      onLogoutSuccess={this.responseGoogle.bind(this)}
    />
  )}
};
GoogleLoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default GoogleLoginPage