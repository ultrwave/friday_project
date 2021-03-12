import {DispatchType} from './auth-reducer';
import {authAPI} from '../api/authAPI';

type PageStateType = {
    lastLinkTimestamp: number
}

const initialState: PageStateType = {
    lastLinkTimestamp: 0,
}

type ActionTypes =
    | ReturnType<typeof setRecoverLinkTimestampAC>

export const recoverReducer = (state: PageStateType = initialState, action: ActionTypes): PageStateType => {

    switch (action.type) {

        case 'SET-RECOVER-LINK-TIMESTAMP':
            state.lastLinkTimestamp = action.timeMs
            return state

        default:
            return state
    }
}

const SET_RECOVER_LINK_TIMESTAMP = 'SET-RECOVER-LINK-TIMESTAMP'

export const setRecoverLinkTimestampAC = (timeMs: number) => ({
        type: SET_RECOVER_LINK_TIMESTAMP,
        timeMs
    } as const
)

// Thunks
// todo - url heroku
export const recoverPasswordTC = (email: string) => (dispatch: DispatchType) => {
    const from = 'Administrator'
    const message =
        `<div style="background-color: lime; padding: 15px"> password recovery link:
         <a href='http://localhost:3000/#/set-new-password/$token$'>link</a></div>`
    authAPI.forgot(email, from, message)
        .then(response => {
            dispatch(setRecoverLinkTimestampAC(localStorage.timerData = (new Date).valueOf()))
        })
        .catch(e => {
            console.log('Recover Error', e)
        })
}