import axios from 'axios';
import {toast} from 'material-react-toastify';

export const USERS_REQUEST = 'USERS_REQUEST';
export const USERS_SUCCESS = 'USERS_SUCCESS';
export const USERS_FAILURE = 'USERS_FAILURE';
export const USER_EDITED = 'USER_EDITED';

function requestAllUsers() {
    return {
        type: USERS_REQUEST,
        user: [],
        message: ''
    }
}

function receiveAllUsers(user) {
    return {
        type: USERS_SUCCESS,
        user,
        message: ''
    }
}

function AllUsersError(message) {
    return {
        type: USERS_FAILURE,
        user: [],
        message
    }
}

function receiveEditUsers(payload) {
    return {
        type: USER_EDITED,
        isEdited: payload
    }
}

// Calls the API
export function getAllUsers(limit, start) {
    return dispatch => {
        // We dispatch requestLogin to kickoff the call to the API
        dispatch(requestAllUsers());
        axios
        .get('http://localhost:3001/getAllUsers',{params: {limit, start}})
         .then((resp) => {
            console.log('resputin----->', resp.data);
            dispatch(receiveAllUsers(resp.data));
        })
        .catch((error) => {
            console.log('error', error);
            dispatch(AllUsersError(error.message));
        })
    }
}
export function deleteUser(id) {
    return dispatch => {
        // dispatch(requestDeleteUsers());
        axios
        .delete(`http://localhost:3001/deleteUser/${id}`)
         .then((resp) => {
            console.log('ra ra resputin----->', resp.data);
            dispatch(getAllUsers(100, 1));
            toast.success( resp.data, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
            });
            // dispatch(receiveDeleteUsers(resp.data));
        })
        .catch((error) => {
            console.log('error', error);
            // dispatch(DeleteUsersError(error.message));
        })
    }
}
export function editUser(creds) {
    return dispatch => {
        // dispatch(requestDeleteUsers());
        let config = {
            givenName: creds.givenName,
            familyName: creds.familyName,
        };
        axios
        .put(`http://localhost:3001/updateUser/${creds.id}`, config)
         .then((resp) => {
            console.log('ra ra resputin----->', resp.data);
            dispatch(getAllUsers(100, 1));
            toast.success( resp.data, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
            });
            console.log('modified with ID', resp.data.includes('modified with ID'))
            const isEdited = resp.data.includes('modified with ID') ? true : false;
            dispatch(receiveEditUsers(isEdited));
        })
        .catch((error) => {
            console.log('error', error);
            // dispatch(DeleteUsersError(error.message));
        })
    }
}
