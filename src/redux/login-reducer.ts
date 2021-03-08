type PageStateType = {
    isLoggedIn: boolean
}

const initialState: PageStateType = {
    isLoggedIn: false
}

type ActionTypes =
    | ReturnType<typeof logInAC>

export const loginReducer = (state: PageStateType = initialState, action: ActionTypes): PageStateType => {

    switch (action.type) {

        case 'LOG-IN':
            return {
                ...state,
            }

        default:
            return state
    }
}


const LOG_IN = 'LOG-IN'

const logInAC = (login: string, password: string, rememberMe: boolean) => ({
        type: LOG_IN,
        login, password, rememberMe
    } as const
)

// const SET_AUTH = 'LOG-IN'
//
// const logInAC = (login: string, password: string, rememberMe: boolean) => ({
//         type: LOG_IN,
//         login, password, rememberMe
//     } as const
// )

