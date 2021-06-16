import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggleOn: false,
        };
        this.toggleClick = this.toggleClick.bind(this);
    }
    toggleClick() {
        console.log('isToggleOn', this.state.isToggleOn);
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
        console.log('isToggleOn1', this.state.isToggleOn);
    }

    render() {
        const {errorMessage} = this.props;

        return (
            <div>
            {this.state.isToggleOn ?
                <div className="container">
                    <span className="title">Register</span>
                    <div className="">
                        <input type='text' ref='username' className="form-control" placeholder='Username'/>
                        <input type='password' ref='password' className="form-control" placeholder='Password'/>
                        <input type='text' ref='email' className="form-control" placeholder='Email'/>
                        <input type='text' ref='fname' className="form-control" placeholder='First Name'/>
                        <input type='text' ref='lname' className="form-control" placeholder='Last Name'/>
                        <input type='text' ref='phone' className="form-control" placeholder='Phone no.'/>
                        <div className="">
                            <button onClick={(event) => this.handleClickRegister(event)} className="btn margin15">
                                Register
                            </button>
                            <div className="flex">
                                <span>if already registered then </span>
                                <button onClick={this.toggleClick} className="btn">
                                    Login
                                </button>
                            </div>
                        </div>
                        {errorMessage &&
                        <p>{errorMessage}</p>
                        }
                    </div>
                </div>
                :
                <div className="container">
                    <span className="title">Login</span>
                    <div className="">
                        <input type='text' ref='username' className="form-control" placeholder='Username'/>
                        <input type='password' ref='password' className="form-control" placeholder='Password'/>
                        <div className="">
                            <button onClick={(event) => this.handleClickLogin(event)} className="btn margin15">
                                Login
                            </button>
                            <div className="flex">
                                <span>if not registered then </span>
                                <button onClick={this.toggleClick} className="btn">
                                    Register
                                </button>
                            </div>
                        </div>
                        {errorMessage &&
                        <p>{errorMessage}</p>
                        }
                    </div>
                </div>
                }
            </div>
        )
    }

    handleClickLogin(event) {
        const username = this.refs.username;
        const password = this.refs.password;
        const creds = {username: username.value.trim(), password: password.value.trim()};   
        this.props.onLoginClick(creds)
    }
    handleClickRegister(event) {
        const username = this.refs.username;
        const password = this.refs.password;
        const email = this.refs.email;
        const first_name = this.refs.fname;
        const last_name = this.refs.lname;
        const phone = this.refs.phone;
        const creds = { username: username.value.trim(), 
            password: password.value.trim(),
            email: email.value.trim(),
            first_name: first_name.value.trim(),
            last_name: last_name.value.trim(),
            phone: phone.value.trim(),
        };
        console.log(creds);
        this.props.onRegisterClick(creds)
    }
};

Register.propTypes = {
    errorMessage: PropTypes.string
};