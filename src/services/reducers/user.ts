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
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILED,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS, UPDATE_USER_FAILED
} from "../constants/user";
import {IUser} from "../../utils/interface/interface";
import {TUserActions} from "../actions/user";

type TUserState = {
    user: IUser;

    authRequest: boolean;
    authFailed: boolean,
    authSuccess: boolean,
    forgotPassword: boolean,
}

const initialState: TUserState = {
    user: {
        name: '',
        password: '',
        email: '',
    },

    authRequest: false,
    authFailed: false,
    authSuccess: false,
    forgotPassword: false,
}

export const userReducer = (state = initialState, action: TUserActions): TUserState => {
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
                user: action.user,
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
                user: action.user,
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
                ...state,
                authRequest: false,
                authFailed: false,
                authSuccess: true,
                user: action.user,
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

        case UPDATE_USER_REQUEST: {
            return {
                ...state,
            }
        }

        case UPDATE_USER_SUCCESS: {
            return {
                ...state,
                user: action.user,
            }
        }

        case UPDATE_USER_FAILED: {
            return {
                ...state,
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
                ...state,
                forgotPassword: true,
            }
        }

        case FORGOT_PASSWORD_FAILED: {
            return {
                ...state,
                forgotPassword: false,
            }
        }

        case LOGOUT_REQUEST: {
            return {
                ...state,
            }
        }

        case LOGOUT_SUCCESS: {
           return {
               ...state,
               user: {
                   name: '',
                   password: '',
                   email: '',
               },
               authSuccess: false,
           }
        }

        case LOGOUT_FAILED: {
            return {
                ...state,
            }
        }

        default:
            return state;
    }
}
