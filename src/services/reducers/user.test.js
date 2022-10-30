import {userReducer, initialState} from "./user";
import {loginSuccessAction, registrationSuccessAction, userSuccessAction, updateUserSuccessAction} from "../actions/user";

describe('user update reducer', () => {
    test('should return the initial state', () => {
        expect(userReducer(undefined, {})).toEqual(initialState)
    })

    test('should return success user update', () => {
        expect(userReducer(initialState, updateUserSuccessAction({
            email: 'email', password: 'password'
        }))).toEqual({
            ...initialState,
            user: {
                email: 'email',
                password: 'password'
            }
        })
    })
})

describe('user request reducer', () => {
    test('should return the initial state', () => {
        expect(userReducer(undefined, {})).toEqual(initialState)
    })

    test('should return success user request', () => {
        expect(userReducer(initialState, userSuccessAction({
            email: 'email',
            password: 'password',
            name: 'name'
        }))).toEqual({
            ...initialState,
            authRequest: false,
            authFailed: false,
            authSuccess: true,
            user: {
                email: 'email',
                password: 'password',
                name: 'name'
            }
        })
    })
})

describe('user login reducer', () => {
    test('should return the initial state', () => {
        expect(userReducer(undefined, {})).toEqual(initialState)
    })

    test('should return success login', () => {
        expect(
            userReducer(initialState, loginSuccessAction({email: 'email', password: 'password'}))
        ).toEqual({
            ...initialState,
            user: {
                email: 'email',
                password: 'password',
            },
            forgotPassword: false,
            authRequest: false,
            authFailed: false,
            authSuccess: true,
        })
    })
})

describe('user registration reducer', () => {
    test('should return the initial state', () => {
        expect(userReducer(undefined, {})).toEqual(initialState)
    })

    test('should return success registration', () => {
        expect(
            userReducer(initialState, registrationSuccessAction({
                email: 'email', password: 'password', name: 'name'
            }))
        ).toEqual({
            ...initialState,
            authRequest: false,
            authFailed: false,
            authSuccess: true,
            user: {
                email: 'email',
                password: 'password',
                name: 'name',
            }
        })
    })
})

