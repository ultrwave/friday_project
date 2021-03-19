import {setAppStatusAC} from "./app-reducer";
import {API} from "../api/API";
import {DispatchType} from "./auth-reducer";

const SET_SUCCESSFULLY_REGISTERED = 'SET-SUCCESSFULLY-REGISTERED'

type PageStateType = {
    isSuccessfullyRegistered: boolean
}

const initialState: PageStateType = {
    isSuccessfullyRegistered: false
}

type ActionTypes =
    | ReturnType<typeof setSuccessfullyRegisteredAC>

export const registrationReducer = (state: PageStateType = initialState, action: ActionTypes): PageStateType => {

    switch (action.type) {

        case SET_SUCCESSFULLY_REGISTERED:

            return {...state, isSuccessfullyRegistered: action.isSuccessfullyRegistered}

        default:
            return state
    }
}


export const setSuccessfullyRegisteredAC = (isSuccessfullyRegistered: boolean) => ({
        type: SET_SUCCESSFULLY_REGISTERED,
        isSuccessfullyRegistered
    } as const
)

export const registrationTC = (email: string, password: string) => (dispatch: DispatchType) => {
    // dispatch(setAppStatusAC('loading'))
    // API.registration(email, password)
    //     .then((response) => {
    //          dispatch(setProfileAC(response))
    //         dispatch(setIsLoggedInAC(true))
    //     })
    //     .catch(e => console.log('Error: ', {...e}))
    //     .finally(() => dispatch(setAppStatusAC('idle')))
    dispatch(setAppStatusAC('loading'))
    API.registration(email, password)
        .then((response) => {
             //dispatch(setProfileAC(response))
             dispatch(setSuccessfullyRegisteredAC(true))
        })
        .catch(e => console.log('Error: ', {...e}))
        .finally(() => dispatch(setAppStatusAC('idle')))
}


