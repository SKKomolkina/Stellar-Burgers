import {checkResult} from "./api";
import {RESET_PASSWORD_URL, REGISTRATION_URL, LOGIN_URL, USER_URL, UPDATE_TOKEN, FORGOT_PASSWORD_URL,} from "./urls";
import {getCookie, setCookie, saveTokens} from "./utils";

export const registrationRequest = (email, password, name) => {
    return fetch(`${REGISTRATION_URL}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password, name}),
    })
        .then(data => checkResult(data))
        .then(res => res)
}

export const loginRequest = (email, password) => {
    return fetch(`${LOGIN_URL}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getCookie('accessToken')
        },
        body: JSON.stringify({email, password}),
    })
        .then(data => checkResult(data))
        .then(res => {
            setCookie('accessToken', res.accessToken);
            localStorage.setItem('refreshToken', res.refreshToken);
            return res;
        })
}

export const updateTokenRequest = () => {
    return fetch(`${UPDATE_TOKEN}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: localStorage.getItem('refreshToken')
            })
        }
    )
        // .then(data => checkResult(data))
        .then(res => res)
}

export const userRequest = () => {
    return fetch(`${USER_URL}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getCookie('accessToken')
        },
    })
        .then(data => checkResult(data))
        .then(res => res)
        .catch(err => {
            if (err.message === 'jwt expired') {
                updateTokenRequest()
                    .then(res => {
                        console.log(res)
                        setCookie('accessToken', res.accessToken)
                        localStorage.setItem('refreshToken', res.refreshToken);
                    })
                    // .then(data => data)
                // const refresh = updateTokenRequest();
                // setCookie('accessToken', refresh.accessToken);
                // localStorage.setItem('refreshToken', refresh.refreshToken);
            }
        })
}

export const forgotPasswordRequest = (email) => {
    return fetch(`${FORGOT_PASSWORD_URL}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email}),
    })
        .then(data => checkResult(data))
        .then(res => res.data)
}

export const resetPasswordRequest = (password, token) => {
    return fetch(`${FORGOT_PASSWORD_URL}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({password, token}),
    })
        .then(data => checkResult(data))
        .then(res => res.data)
}
