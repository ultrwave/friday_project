import {DispatchType} from './auth-reducer';
import {API} from '../api/API';

type PageStateType = {
    timerIsOn: boolean
}

const initialState: PageStateType = {
    timerIsOn: false,
}

type ActionTypes =
    | ReturnType<typeof toggleTimerAC>

export const recoverReducer = (state: PageStateType = initialState, action: ActionTypes): PageStateType => {

    switch (action.type) {

        case TOGGLE_TIMER_STATUS:
            return {...state, timerIsOn: action.timerIsOn}

        default:
            return state
    }
}

const TOGGLE_TIMER_STATUS = 'TOGGLE-TIMER-STATUS'

export const toggleTimerAC = (timerIsOn: boolean) => ({
        type: TOGGLE_TIMER_STATUS,
        timerIsOn
    } as const
)

// Thunks

export const recoverPasswordTC = (email: string, baseUrl: string) => (dispatch: DispatchType) => {
    const from = 'Administrator'
    const message =
        `<div style="background-color: lime; padding: 15px"> password recovery link:
         <a href='${baseUrl}/$token$'>link</a></div>`
    API.forgot(email, from, message)
        .then(response => {
            // localStorage.timerData = Date.now()
        })
        .catch(e => {
            console.log('Recover Error', e)
        })
        .finally(() => {
            localStorage.timerData = Date.now()
            dispatch(toggleTimerAC(true))
        })

}