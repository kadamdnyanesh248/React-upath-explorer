function callApi(endpoint, authenticated) {

    let token = localStorage.getItem('access_token') || null;
    let config = {};

    if(authenticated) {
        if(token) {
            config = { headers: { 'Authorization': `Bearer ${token}` }}
        }
        else throw new Error("No token saved!");
    }

    return fetch(process.env.BASE_URL_API + endpoint, config)
        .then(response => {
            response.text().then(text => ({ text, response }))}
        ).then(({ text, response }) => {
            if (!response.ok) return Promise.reject(text)
            return text
        }).catch(err => console.log(err))
}

export const CALL_API = Symbol('Call API');

// eslint-disable-next-line import/no-anonymous-default-export
export default store => next => action => {

    const callAPI = action[CALL_API];
    if (typeof callAPI === 'undefined') return next(action)
    let {endpoint, types, authenticated} = callAPI;
    const [successType, errorType] = types;
    return callApi(endpoint, authenticated).then(
        response =>
            next({
                response,
                authenticated,
                type: successType
            }),
        error => next({
            error: error.message || 'There was an error.',
            type: errorType
        })
    )
}