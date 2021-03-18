const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_ITEMS_ON_PAGE = 'SET_ITEMS_ON_PAGE';

export type InitialStateType = {
    currentPage: number
    itemsOnPage: number
}

const initialState: InitialStateType = {
    currentPage: 1,
    itemsOnPage: 10,
}

type ActionTypes =
    | ReturnType<typeof setCurrentPageAC>

export const paginationReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {

        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload.value
            }
        case SET_ITEMS_ON_PAGE:
            return {
                ...state,
                itemsOnPage: action.payload.value
            }


        default:
            return state
    }
}

export const setCurrentPageAC = (value: number) => ({
        type: SET_CURRENT_PAGE,
        payload: {value}
    }
)

export const setItemsOnPageAC = (value: number) => ({
        type: SET_ITEMS_ON_PAGE,
        payload: {value}
    }
)