import store from './store';
import {authAPI} from '../authAPI';

type PageStateType = {
    isLoggedIn: boolean
    profile: AuthProfileType | null
}

const initialState: PageStateType = {
    isLoggedIn: false,
    profile: null
}

export type AuthProfileType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number; // количество колод

    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;

    error?: string;
}

export type DispatchType = typeof store.dispatch

type ActionTypes =
    | ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setProfileAC>

export const authReducer = (state: PageStateType = initialState, action: ActionTypes): PageStateType => {

    switch (action.type) {

        case 'SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.isLoggedIn}

        case 'SET-PROFILE':
            return {...state, profile: action.profile}

        default:
            return state
    }
}

const SET_IS_LOGGED_IN = 'SET-IS-LOGGED-IN'
const SET_PROFILE = 'SET-PROFILE'

const setIsLoggedInAC = (isLoggedIn: boolean) => ({
        type: SET_IS_LOGGED_IN,
        isLoggedIn
    } as const
)

const setProfileAC = (profile: AuthProfileType) => ({
    type: SET_PROFILE,
    profile
}) as const

// Thunks

export const checkCookiesTC = () => (dispatch: DispatchType) => { // todo
    authAPI.me()
        .then((response) => {
            dispatch(setProfileAC(response as unknown as AuthProfileType))
            dispatch(setIsLoggedInAC(true))
        })
        .catch(e => {
            console.log('Error: ', {...e})
            dispatch(setIsLoggedInAC(false))
        })
}

export const logInTC = (login: string, password: string, rememberMe: boolean) => (dispatch: DispatchType) => {
    authAPI.login(login, password, rememberMe)
        .then((response) => {
            dispatch(setProfileAC(response as unknown as AuthProfileType)) // todo - wtf ?!
            dispatch(setIsLoggedInAC(true))
        })
        .catch(e => console.log('Error: ', {...e}))
}

export const logOutTC = () => (dispatch: DispatchType) => {
    authAPI.logout()
        .then(response => {
            dispatch(setIsLoggedInAC(false))
        })
        .catch(e => console.log('Error: ', {...e}))
}

export const setNewPasswordTC = (password: string, resetPasswordToken: string) => (dispatch: DispatchType) => {
    authAPI.setNewPassword(password, resetPasswordToken)
        .then(response => {
            dispatch(setIsLoggedInAC(false))
        })
        .catch(e => console.log('Error: ', {...e}))
}
