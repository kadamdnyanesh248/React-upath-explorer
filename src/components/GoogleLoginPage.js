import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { GoogleLogin } from 'react-google-login';
import {loginUser} from '../actions/login'
import {registerUser} from '../actions/register'

class GoogleLoginPage extends Component{

  async responseFailure(response){
    console.log('Error 350', response);
  };
  async responseSuccess(response){
    console.log(response);
    if (response && response.profileObj && response.tokenObj){
      let creds = {
        email: '',
        givenName: '',
        familyName: '',
        imageUrl: '',
        // fullName: '',
        googleId: '',
        loggedIn: 0,
      }
      creds = {
        email: response.profileObj.email,
        givenName: response.profileObj.givenName,
        familyName: response.profileObj.familyName,
        imageUrl: response.profileObj.imageUrl,
        // fullName: response.profileObj.name,
        googleId: response.profileObj.googleId,
        loggedIn: response.tokenObj.first_issued_at,
      }
      await this.props.dispatch(registerUser(creds));
      await this.props.dispatch(loginUser(response));
    }
  }

  render(){
    return (
      <div className="container">
        <h2>Login</h2>
        <p>Sign in with google to access data!</p>
        <br/>
        <GoogleLogin
          className="login-span login"
          clientId = {process.env.CLIENT_ID}
          buttonText="Login"
          onSuccess={this.responseSuccess.bind(this)}
          onFailure={this.responseFailure.bind(this)}
          cookiePolicy={'single_host_origin'}
          // icon={false}
        />
    </div>
     
  )}
};
GoogleLoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default GoogleLoginPage;