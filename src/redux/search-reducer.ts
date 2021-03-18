
const SET_SEARCH_VALUE = 'SET_SEARCH_VALUE';


export type InitialStateType = {
    searchValue: string
}

const initialState: InitialStateType = {
    searchValue: '',
}


type ActionTypes =
    | ReturnType<typeof setSearchAC>

export const searchReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {

    switch (action.type) {

        case SET_SEARCH_VALUE:
            return {
                ...state,
                searchValue: action.payload.value
            }

        default:
            return state
    }
}

export const setSearchAC = (value: string) => ({
        type: SET_SEARCH_VALUE,
        payload: {value}
    }
)