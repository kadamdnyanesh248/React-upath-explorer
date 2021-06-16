import React, {Component} from 'react'
import GoogleLoginPage from './GoogleLoginPage.js'
// import Login from './Login'
// import Logout from './Logout'
import Home from './Home'
import Header from './Header'
// import Register from './LoginRegister'
// import {registerUser} from '../actions/register'
// import {loginUser} from '../actions/login'
// import {getAllUsers} from '../actions/home'
// import {logoutUser} from '../actions/logout'
import PropTypes from 'prop-types'

export default class Dashboard extends Component {

    render() {
        const {dispatch, isAuthenticated, errorMessage, allUsers} = this.props;

        return (
            <nav className='navbar'>
                <div className='container-fluid'>
                    <div className='navbar-form'>
                        {!isAuthenticated && 
                        <div>
                            <GoogleLoginPage
                                dispatch={dispatch}
                                errorMessage={errorMessage}
                            />
                            {/* <Register
                                errorMessage={errorMessage}
                                onRegisterClick={creds => dispatch(registerUser(creds))}
                                onLoginClick={creds => dispatch(loginUser(creds))}
                            /> */}
                        </div>
                        }
                        {isAuthenticated &&
                        <div>
                            {/* <Logout onLogoutClick={() => dispatch(logoutUser())}/> */}
                            <Header 
                                dispatch={dispatch}
                                errorMessage={errorMessage}
                            />
                            <Home 
                                allUsers={allUsers}
                                dispatch={dispatch}
                            />
                        </div>
                        }

                    </div>
                </div>
            </nav>
        )
    }
}

Dashboard.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
};