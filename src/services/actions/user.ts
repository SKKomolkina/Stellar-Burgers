import {
    forgotPasswordRequest,
    loginRequest,
    logOutRequest,
    registrationRequest,
    resetPasswordRequest, updateTokenRequest,
    updateUserInfoRequest,
    userRequest
} from "../../utils/auth";
import {
    FORGOT_PASSWORD_FAILED,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    LOGIN_FAILED,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_FAILED,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    REGISTRATION_FAILED,
    REGISTRATION_REQUEST,
    REGISTRATION_SUCCESS,
    RESET_PASSWORD_FAILED,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    UPDATE_TOKEN_FAILED,
    UPDATE_TOKEN_REQUEST,
    UPDATE_TOKEN_SUCCESS,
    UPDATE_USER_FAILED,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    USER_FAILED,
    USER_REQUEST,
    USER_SUCCESS
} from "../constants/user";
import {IUser} from "../../utils/interface/interface";
import {AppDispatch, AppThunk} from "../types";

//actions
export interface IUpdateUserRequest {
    readonly type: typeof UPDATE_USER_REQUEST;
}

export const updateUserRequestAction = (): IUpdateUserRequest => ({
    type: UPDATE_USER_REQUEST,
})

export interface IUpdateUserSuccess {
    readonly type: typeof UPDATE_USER_SUCCESS;
    user: IUser;
}

export const updateUserSuccessAction = (user: IUser): IUpdateUserSuccess => ({
    type: UPDATE_USER_SUCCESS,
    user
})

export interface IUpdateUserFailed {
    readonly type: typeof UPDATE_USER_FAILED;
}

export const updateUserFailedAction = (): IUpdateUserFailed => ({
    type: UPDATE_USER_FAILED,
})

export interface ILogoutRequest {
    readonly type: typeof LOGOUT_REQUEST;
}

export const logoutRequestAction = (): ILogoutRequest => ({
    type: LOGOUT_REQUEST,
})

export interface ILogoutSuccess {
    readonly type: typeof LOGOUT_SUCCESS;
}

export const logoutSuccessAction = (): ILogoutSuccess => ({
    type: LOGOUT_SUCCESS,
})

export interface ILogoutFailed {
    readonly type: typeof LOGOUT_FAILED;
}

export const logoutFailedAction = (): ILogoutFailed => ({
    type: LOGOUT_FAILED,
})

export interface IUserRequest {
    readonly type: typeof USER_REQUEST;
}

export const userRequestAction = (): IUserRequest => ({
    type: USER_REQUEST,
})

export interface IUserSuccess {
    readonly type: typeof USER_SUCCESS;
    user: IUser;
}

export const userSuccessAction = (user: IUser): IUserSuccess => ({
    type: USER_SUCCESS,
    user,
})

export interface IUserFailed {
    readonly type: typeof USER_FAILED;
}

export const userFailedAction = (): IUserFailed => ({
    type: USER_FAILED,
})

export interface ILoginRequest {
    readonly type: typeof LOGIN_REQUEST;
}

export const loginRequestAction = (): ILoginRequest => ({
    type: LOGIN_REQUEST,
})

export interface ILoginSuccess {
    readonly type: typeof LOGIN_SUCCESS;
    user: IUser;
}

export const loginSuccessAction = (user: IUser): ILoginSuccess => ({
    type: LOGIN_SUCCESS,
    user,
})

export interface ILoginFailed {
    readonly type: typeof LOGIN_FAILED;
}

export const loginFailedAction = (): ILoginFailed => ({
    type: LOGIN_FAILED,
})

export interface IRegistrationRequest {
    readonly type: typeof REGISTRATION_REQUEST;
}

export const registrationRequestAction = (): IRegistrationRequest => ({
    type: REGISTRATION_REQUEST,
})

export interface IRegistrationSuccess {
    readonly type: typeof REGISTRATION_SUCCESS;
    user: IUser;
}

export const registrationSuccessAction = (user: IUser): IRegistrationSuccess => ({
    type: REGISTRATION_SUCCESS,
    user,
})

export interface IRegistrationFailed {
    readonly type: typeof REGISTRATION_FAILED;
}

export const registrationFailedAction = (): IRegistrationFailed => ({
    type: REGISTRATION_FAILED,
})

export interface IUpdateTokenRequest {
    readonly type: typeof UPDATE_TOKEN_REQUEST;
}

export const updateTokenRequestAction = (): IUpdateTokenRequest => ({
    type: UPDATE_TOKEN_REQUEST,
})

export interface IUpdateTokenSuccess {
    readonly type: typeof UPDATE_TOKEN_SUCCESS;
    user: IUser;
}

export const updateTokenSuccessAction = (user: IUser): IUpdateTokenSuccess => ({
    type: UPDATE_TOKEN_SUCCESS,
    user,
})

export interface IUpdateTokenFailed {
    readonly type: typeof UPDATE_TOKEN_FAILED;
}

export const updateTokenFailedAction = (): IUpdateTokenFailed => ({
    type: UPDATE_TOKEN_FAILED,
})

export interface IForgotPasswordRequest {
    readonly type: typeof FORGOT_PASSWORD_REQUEST;
}

export const forgotPasswordRequestAction = (): IForgotPasswordRequest => ({
    type: FORGOT_PASSWORD_REQUEST,
})

export interface IForgotPasswordSuccess {
    readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}

export const forgotPasswordSuccessAction = (): IForgotPasswordSuccess => ({
    type: FORGOT_PASSWORD_SUCCESS,
})

export interface IForgotPasswordFailed {
    readonly type: typeof FORGOT_PASSWORD_FAILED;
}

export const forgotPasswordFailedAction = (): IForgotPasswordFailed => ({
    type: FORGOT_PASSWORD_FAILED,
})

export interface IResetPasswordRequest {
    readonly type: typeof RESET_PASSWORD_REQUEST;
}

export const resetPasswordRequestAction = (): IResetPasswordRequest => ({
    type: RESET_PASSWORD_REQUEST,
})

export interface IResetPasswordSuccess {
    readonly type: typeof RESET_PASSWORD_SUCCESS;
}

export const resetPasswordSuccessAction = (): IResetPasswordSuccess => ({
    type: RESET_PASSWORD_SUCCESS,
})

export interface IResetPasswordFailed {
    readonly type: typeof RESET_PASSWORD_FAILED;
}

export const resetPasswordFailedAction = (): IResetPasswordFailed => ({
    type: RESET_PASSWORD_FAILED,
})

//union
export type TUserActions =
    | ILoginRequest | ILoginSuccess | ILoginFailed
    | ILogoutRequest | ILogoutSuccess | ILogoutFailed
    | IUserRequest | IUserSuccess | IUserFailed
    | IUpdateUserRequest | IUpdateUserSuccess | IUpdateUserFailed
    | IUpdateTokenRequest | IUpdateTokenSuccess | IUpdateTokenFailed
    | IRegistrationRequest | IRegistrationSuccess | IRegistrationFailed
    | IForgotPasswordRequest | IForgotPasswordSuccess | IForgotPasswordFailed
    | IResetPasswordRequest | IResetPasswordSuccess | IResetPasswordFailed

//functions
export const updateUser = (email: string, name: string): AppThunk =>
    (dispatch: AppDispatch) => {
        dispatch(updateUserRequestAction())

        updateUserInfoRequest(email, name)
            .then(res => {
                if (res) {
                    dispatch(updateUserSuccessAction(res))
                } else {
                    dispatch(updateUserFailedAction())
                }
            })
            .catch(() => {
                dispatch(updateUserFailedAction())
            })
    }

export const logOut = (): AppThunk => (dispatch: AppDispatch) => {
    dispatch(logoutRequestAction())

    logOutRequest()
        .then(res => {
            if (res) {
                dispatch(logoutSuccessAction())
            } else {
                dispatch(logoutFailedAction())
            }
        })
        .catch(() => {
            dispatch(logoutFailedAction())
        })
}

export const getUser = (): AppThunk => (dispatch: AppDispatch) => {
    dispatch(userRequestAction())

    userRequest()
        .then(res => {
            if (res) {
                dispatch(userSuccessAction(res))
            } else {
                dispatch(userFailedAction())
            }
        })
        .catch(() => {
            dispatch(updateTokenRequestAction())
        })
    // .catch(async err => {
    //     if (err.message === 'jwt expired') {
    //         updateTokenRequest()
    //             .then(await userRequest())
    //     }
    // })
}

export const login = (email: string, password: string): AppThunk =>
    (dispatch: AppDispatch) => {
        dispatch(loginRequestAction())

        loginRequest(email, password)
            .then(res => {
                if (res) {
                    dispatch(loginSuccessAction(res.user))
                } else {
                    dispatch(loginFailedAction())
                }
            })
            .catch(() => {
                dispatch(loginFailedAction())
            })
    }

export const registration = (email: string, password: string, name: string): AppThunk =>
    (dispatch: AppDispatch) => {
        dispatch(registrationRequestAction())

        registrationRequest(email, password, name)
            .then(res => {
                if (res) {
                    dispatch(registrationSuccessAction(res))
                } else {
                    dispatch(registrationFailedAction())
                }
            })
            .catch(() => {
                dispatch(registrationFailedAction())
            })
    }

export const updateToken = (): AppThunk => (dispatch: AppDispatch) => {
    dispatch(updateTokenRequestAction())

    updateTokenRequest()
        .then((res: any) => {
            if (res) {
                dispatch(updateTokenSuccessAction(res.user))
            } else {
                dispatch(updateTokenFailedAction())
            }
        })
        .catch(() => {
            dispatch(updateTokenFailedAction())
        })
}

export const forgotPassword = (email: string): AppThunk =>
    (dispatch: AppDispatch) => {
        dispatch(forgotPasswordRequestAction())

        forgotPasswordRequest(email)
            .then(() => {
                dispatch(forgotPasswordSuccessAction())
            })
            .catch(() => {
                dispatch(forgotPasswordFailedAction())
            })
    }

export const resetPassword = (password: string, token: string): AppThunk =>
    (dispatch: AppDispatch) => {
        dispatch(resetPasswordRequestAction())

        resetPasswordRequest(password, token)
            .then(res => {
                if (res) {
                    dispatch(resetPasswordSuccessAction())
                } else {
                    dispatch(resetPasswordFailedAction())
                }
            })
            .catch(() => {
                dispatch(resetPasswordFailedAction())
            })
    }

