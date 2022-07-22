import {
    forgotPasswordRequest,
    loginRequest,
    registrationRequest,
    resetPasswordRequest, updateTokenRequest,
    userRequest
} from "../../utils/auth";
import {setCookie} from "../../utils/utils";

export const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const REGISTRATION_FAILED = 'REGISTRATION_FAILED';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const USER_REQUEST = 'USER_REQUEST';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAILED = 'USER_FAILED';

export const UPDATE_TOKEN_REQUEST = 'UPDATE_TOKEN_REQUEST';
export const UPDATE_TOKEN_SUCCESS = 'UPDATE_TOKEN_SUCCESS';
export const UPDATE_TOKEN_FAILED = 'UPDATE_TOKEN_FAILED';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';

export function getUser() {
    return function (dispatch) {
        dispatch({
            type: USER_REQUEST,
        })
        userRequest()
            .then(res => {
                if (res) {
                    dispatch({
                        type: USER_SUCCESS,
                        user: res,
                    })
                } else {
                    dispatch({
                        type: USER_FAILED,
                    })
                }
            })
    }
}


export function login(email, password) {
    return function (dispatch) {
        dispatch({
            type: LOGIN_REQUEST,
        })
        loginRequest(email, password)
            .then(res => {
                if (res) {
                    dispatch({
                        type: LOGIN_SUCCESS,
                        user: res.user,
                    })
                } else {
                    dispatch({
                        type: LOGIN_FAILED,
                    })
                }
            })
    }
}

export function registration(email, password, name) {
    return function (dispatch) {
        dispatch({
            type: REGISTRATION_REQUEST,
        })
        registrationRequest(email, password, name)
            .then(res => {
                if (res) {
                    dispatch({
                        type: REGISTRATION_SUCCESS,
                        user: res,
                    })
                } else {
                    dispatch({
                        type: REGISTRATION_FAILED,
                    })
                }
            })
    }
}

export function updateToken() {
    return function (dispatch) {
        dispatch({
            type: UPDATE_TOKEN_REQUEST,
        })
        updateTokenRequest()
            .then(res => {
                if (res) {
                    dispatch({
                        type: UPDATE_TOKEN_SUCCESS,
                        user: res.user,
                    })
                } else {
                    dispatch({
                        type: UPDATE_TOKEN_FAILED,
                    })
                }
            })
    }
}

export function forgotPassword(email) {
    return function (dispatch) {
        dispatch({
            type: FORGOT_PASSWORD_REQUEST,
        })
        forgotPasswordRequest(email)
            .then(res => {
                if (res) {
                    dispatch({
                        type: FORGOT_PASSWORD_SUCCESS,
                    })
                } else {
                    dispatch({
                        type: FORGOT_PASSWORD_FAILED,
                    })
                }
            })
    }
}

export function resetPassword(password, token) {
    return function (dispatch) {
        dispatch({
            type: RESET_PASSWORD_REQUEST,
        })
        resetPasswordRequest(password, token)
            .then(res => {
                if (res) {
                    dispatch({
                        type: RESET_PASSWORD_SUCCESS,
                    })
                } else {
                    dispatch({
                        type: RESET_PASSWORD_FAILED,
                    })
                }
            })
    }
}
