import {
    REGISTRATION_REQUEST,
    REGISTRATION_SUCCESS,
    REGISTRATION_FAILED,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    USER_SUCCESS,
    USER_REQUEST,
    USER_FAILED,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILED
} from "../actions/user";

const initialState = {
    user: {},

    authRequest: false,
    authFailed: false,
    authSuccess: false,
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTRATION_REQUEST: {
            return {
                ...state,
                authRequest: true,
            }
        }

        case REGISTRATION_SUCCESS: {
            return {
                ...state,
                authRequest: false,
                authFailed: false,
                authSuccess: true,
                user: action,
            }
        }

        case REGISTRATION_FAILED: {
            return {
                ...state,
                authRequest: false,
                authFailed: true,
                authSuccess: false,
            }
        }

        case LOGIN_REQUEST: {
            return {
                ...state,
                authRequest: true,
            }
        }

        case LOGIN_SUCCESS: {
            return {
                ...state,
                authRequest: false,
                authFailed: false,
                authSuccess: true,
                user: action,
            }
        }

        case LOGIN_FAILED: {
            return {
                ...state,
                authRequest: false,
                authFailed: true,
                authSuccess: false,
            }
        }

        case USER_REQUEST: {
            return {
                ...state,
                authRequest: true,
            }
        }

        case USER_SUCCESS: {
            return {
                authRequest: false,
                authFailed: false,
                authSuccess: true,
                user: action,
            }
        }

        case USER_FAILED: {
            return {
                ...state,
                authRequest: false,
                authFailed: true,
                authSuccess: false,
            }
        }

        case RESET_PASSWORD_REQUEST: {
            return {
                ...state,
            }
        }

        case RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
            }
        }

        case RESET_PASSWORD_FAILED: {
            return {
                ...state,
            }
        }

        case FORGOT_PASSWORD_REQUEST: {
            return {
                ...state,
            }
        }

        case FORGOT_PASSWORD_SUCCESS: {
            return {
                ...state
            }
        }

        case FORGOT_PASSWORD_FAILED: {
            return {
                ...state,
            }
        }

        default:
            return state;
    }
}
