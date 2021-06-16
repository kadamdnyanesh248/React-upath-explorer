import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types'
import GoogleLogoutPage from './GoogleLogoutPage.js'
// import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';

class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            profile: JSON.parse(localStorage.getItem('profileObj')) || {},
        }
    }
  componentDidMount(){
    console.log('profile ======>', this.state.profile);
  }

  render(){
    const {dispatch, errorMessage} = this.props;
    console.log(this.state.profile, 'aaaaaaaaaaaaaaa')
    return (
    <section>
        <header>
            <div className="header-inner flex justify-between">
                <div className="widget-title">uPath Explorer</div>
                <div className="flex justify-end">
                    <div className="widget-title myname">{this.state.profile.givenName+' '+this.state.profile.familyName}</div>
                    {/* <NotificationsActiveIcon/> */}
                    <div className="logoutCss">
                        <a className="button flex" href="/">
                            <img src={this.state.profile.imageUrl} alt="profilr" />
                            <GoogleLogoutPage
                                className="Logout"
                                dispatch={dispatch}
                                errorMessage={errorMessage}
                            />
                        </a>
                    </div>
                </div>
            </div>
        </header>
    </section>
  )}
};

Header.propTypes = {
    dispatch: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
};

export default Header