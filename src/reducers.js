import {combineReducers} from 'redux'
import {
    REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE
} from './actions/register'
import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE
} from './actions/login'
import {
    LOGOUT_SUCCESS
} from './actions/logout'
import {
    USERS_REQUEST, USERS_SUCCESS, USERS_FAILURE, USER_EDITED
} from './actions/home'

function auth(state = {
    user: {},
    isFetching: false,
    isAuthenticated: !!localStorage.getItem('access_token')
}, action) {
    switch (action.type) {
        case REGISTER_REQUEST:
            return Object.assign({}, state, {
                user: action.user,
                isFetching: true,
                isAuthenticated: false,
                errorMessage: ''
            });
        case REGISTER_SUCCESS:
            return Object.assign({}, state, {
                user: action.user,
                isFetching: false,
                isAuthenticated: true,
                errorMessage: ''
            });
        case REGISTER_FAILURE:
            return Object.assign({}, state, {
                user: {},
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.message
            });
        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                user: action.creds,
                isFetching: true,
                isAuthenticated: false,
                errorMessage: ''
            });
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                user: {},
                isFetching: false,
                isAuthenticated: true,
                errorMessage: ''
            });
        case LOGIN_FAILURE:
            return Object.assign({}, state, {
                user: {},
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.message
            });
        case LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false
            });
           
        default:
            return state
    }
}

function allUsers(state = {
    allUsersList: [],
    isFetching: false,
    isEdited: false,
    isAuthenticated: !!localStorage.getItem('access_token'),
    errorMessage: ''
}, action) {
    switch (action.type) {
        case USERS_REQUEST:
            return Object.assign({}, state, {
                allUsersList: [],
                isFetching: false,
                isAuthenticated: true,
                errorMessage: ''
            });
        case USERS_SUCCESS:
            // console.log('action', action);
            return Object.assign({}, state, {
                allUsersList: action.user,
                isFetching: false,
                isAuthenticated: true,
                errorMessage: ''
            });
        case USERS_FAILURE:
            return Object.assign({}, state, {
                allUsersList: [],
                isFetching: false,
                isAuthenticated: true,
                errorMessage: action.message
            });
        case USER_EDITED:
            return Object.assign({}, state, {
                allUsersList: [],
                isFetching: false,
                isAuthenticated: true,
                errorMessage: '',
                isEdited: true
            });
        default:
            return state
    }
}

const loginApp = combineReducers({
    auth,
    allUsers
});

export default loginApp