export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

function requestLogin(creds) {
    return {
        type: LOGIN_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        creds
    }
}

function receiveLogin(user) {
    return {
        type: LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        id_token: user.tokenId
    }
}

// function loginError(message) {
//     return {
//         type: LOGIN_FAILURE,
//         isFetching: false,
//         isAuthenticated: false,
//         message
//     }
// }

export function loginUser(creds) {
    console.log('executed.....', creds.profileObj);
    return dispatch => {
        dispatch(requestLogin(creds));
        localStorage.setItem('profileObj', JSON.stringify(creds.profileObj));
        localStorage.setItem('id_token', creds.tokenId);
        localStorage.setItem('access_token', creds.accessToken);
        // Dispatch the success action
        dispatch(receiveLogin(creds));
        // this.props.history.push('/dev');
    }
}

// Calls the API to get a token and dispatches actions along the way
// export function loginUser(creds) {
//     console.log('executed.....');
//     let config = {
//         method: 'POST',
//         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
//         body: `username=${creds.username}&password=${creds.password}`
//     };

//     return dispatch => {
//         // We dispatch requestLogin to kickoff the call to the API
//         dispatch(requestLogin(creds));
//         // const history = useHistory();
//         return fetch('http://localhost:3001/login', config)
//             .then(response => response.json().then(user => ({ user, response }))
//             ).then(({ user, response }) =>  {
//                 if (!response.ok) {
//                     // dispatch the error condition
//                     console.log('u---->',user, response);
//                     dispatch(loginError(user.message));
//                     return Promise.reject(user)
//                 } else {
//                     // If login was successful, set the token in local storage
//                     localStorage.setItem('id_token', user.id_token);
//                     localStorage.setItem('access_token', user.access_token);
//                     // Dispatch the success action
//                     dispatch(receiveLogin(user));
//                 }
//             }).catch(err => console.log("Error: ", err))
//     }
// }
