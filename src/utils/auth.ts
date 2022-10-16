import {checkResult} from "./api";
import {baseUrl} from "./urls";
import {getCookie, setCookie, deleteCookie} from "./utils";

export const updateUserInfoRequest = (email: string, name: string) => {
    return fetch(`${baseUrl}/auth/user`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            authorization: `${getCookie('accessToken')}`,
        },
        body: JSON.stringify({email, name}),
    })
        .then(data => checkResult(data))
        .then(res => res)
}

export const registrationRequest = (email: string, password: string, name: string) => {
    return fetch(`${baseUrl}/auth/register`, {
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

export const loginRequest = (email: string, password: string) => {
    return fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            // Authorization: 'Bearer ' + getCookie('accessToken')
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
    return fetch(`${baseUrl}/auth/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: localStorage.getItem('refreshToken')
            })
        }
    )
        .then(data => checkResult(data))
        .then(res => {
            setCookie('accessToken', res.accessToken)
            return localStorage.setItem('refreshToken', res.refreshToken)
        })
}

export const userRequest = () => {
    return fetch(`${baseUrl}/auth/user`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            authorization: `${getCookie('accessToken')}`,
        },
    })
        .then(data => checkResult(data))
        .then(res => res)
    // .catch((err) => {
    //     updateTokenRequest()
    //         .then(() => userRequest())
    // })
}

export const forgotPasswordRequest = (email: string) => {
    return fetch(`${baseUrl}/password-reset`, {
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

export const resetPasswordRequest = (password: string, token: string) => {
    return fetch(`${baseUrl}/password-reset/reset`, {
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

export const logOutRequest = () => {
    return fetch(`${baseUrl}/auth/logout`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken')
        })
    })
        .then(data => checkResult(data))
        .then(res => {
            deleteCookie('accessToken');
            localStorage.clear();
            return res;
        })
}
