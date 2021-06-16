import axios from 'axios';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

function requestRegister(creds) {
    return {
        type: REGISTER_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        user: {
            id: 0,
            imageUrl: '',
            // fullName: '',
            email: '',
            givenName: '',
            familyName: '',
            googleId: '',
            loggedIn: ''
        },
    }
}

function receiveRegister(user, msg) {
    return {
        type: REGISTER_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        user: {
            msg,
            id: user.id,
            imageUrl: user.imageUrl,
            // fullName: user.fullName,
            email: user.email,
            givenName: user.givenName,
            familyName: user.familyName,
            googleId: user.googleId,
            loggedIn: user.loggedIn
        },
        message: ''
    }
}

function registerError(message) {
    return {
        type: REGISTER_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        user: {
            id: 0,
            imageUrl: '',
            // fullName: '',
            email: '',
            givenName: '',
            familyName: '',
            googleId: '',
            loggedIn: ''
        },
        message
    }
}

// Calls the API to get a token and dispatches actions along the way
export function registerUser(creds) {
    let config = {
        // method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        // body: `imageUrl=${creds.imageUrl}&fullName=${creds.fullName}&email=${creds.email}&givenName=${creds.givenName}&familyName=${creds.familyName}&googleId=${creds.googleId}&loggedIn=${creds.loggedIn}`
        payload: {
            imageUrl: creds.imageUrl,
            // fullName: creds.fullName,
            email: creds.email,
            givenName: creds.givenName,
            familyName: creds.familyName,
            googleId: creds.googleId,
            loggedIn: creds.loggedIn
        }
    };
    
    return dispatch => {
        // We dispatch requestRegister to kickoff the call to the API
        dispatch(requestRegister(creds));
        
        console.log('process.env.BASE_URL', process.env.BASE_URL);
        return axios
        .post('http://localhost:3001/registerUser', config)
         .then((resp) => {
            console.log('uuuuuuuser', resp.data);
            dispatch(receiveRegister(resp.data.payload, resp.data.message));
        })
        .catch((error) => {
            console.log('error', error);
            dispatch(registerError(error.message));
        })
        // return fetch('http://localhost:3001/registerUser', config)
        //     .then(response => response.json().then(user => ({ user, response }))
        //     ).then(({ user, response }) => {
        //         console.log('resp----->', response, user);
        //         dispatch(receiveRegister(user));
        //         if (!response.ok) {
        //             // dispatch the error condition
        //             // dispatch(registerError(user.message));
        //             return Promise.reject(user)
        //         } else {
        //             // If Register was successful, set the token in local storage
        //             localStorage.setItem('id_token', user.id_token);
        //             localStorage.setItem('access_token', user.access_token);
        //             // Dispatch the success action
        //         }
        //     }).catch(err => console.log("Error: ", err))
    }
}
