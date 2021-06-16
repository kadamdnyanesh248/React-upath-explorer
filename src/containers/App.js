import React, {Component} from 'react'
import {connect} from 'react-redux'
import Dashboard from '../components/Dashboard'
import PropTypes from 'prop-types'
import '../App.css';

class App extends Component {
    render() {
        const {dispatch, isAuthenticated, errorMessage, allUsersList} = this.props
        return (
            <div>
                <Dashboard
                    isAuthenticated={isAuthenticated}
                    errorMessage={errorMessage}
                    dispatch={dispatch}
                    allUsers={allUsersList}
                />
            </div>
        )
    }
}

App.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    allUsersList: PropTypes.array
};

function mapStateToProps(state) {
    const {auth} = state;
    const {isAuthenticated, errorMessage} = auth;
    return {
        isAuthenticated,
        errorMessage,
    }
}

export default connect(mapStateToProps)(App)