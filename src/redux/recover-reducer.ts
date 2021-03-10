import {DispatchType} from './auth-reducer';
import {authAPI} from '../authAPI';

type PageStateType = {
    lastLinkTimestamp: number
}

const initialState: PageStateType = {
    lastLinkTimestamp: 0
}

type ActionTypes =
    | ReturnType<typeof setRecoverLinkSentAC>

export const recoverReducer = (state: PageStateType = initialState, action: ActionTypes): PageStateType => {

    switch (action.type) {

        case 'SET-RECOVER-LINK-SENT':
            console.log(state)
            return {
                ...state,
                lastLinkTimestamp: action.time
            }

        default:
            return state
    }
}


const SET_RECOVER_LINK_SENT = 'SET-RECOVER-LINK-SENT'

const setRecoverLinkSentAC = (time: number) => ({
        type: SET_RECOVER_LINK_SENT,
        time
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
            dispatch(setRecoverLinkSentAC((new Date).valueOf()))
        })
        .catch(e => {
            dispatch(setRecoverLinkSentAC((new Date).valueOf()))
            console.log('Recover Error', e)
        })
}