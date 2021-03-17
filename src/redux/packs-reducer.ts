import {packsAPI, GetPacksResponseType} from '../api/authAPI';
import {DispatchType} from './auth-reducer';
import {setAppStatusAC} from './app-reducer';

type PageStateType = {
    packs: Array<GetPacksResponseType>
    totalPacksCount: number
    itemsPerPage: number
    currentPage: number
}

const initialState: PageStateType = {
    packs: [],
    totalPacksCount: 0,
    itemsPerPage: 5,
    currentPage: 1
}

type ActionTypes =
    | ReturnType<typeof setPacksAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setItemsPerPageAC>
    | ReturnType<typeof setTotalPacksCountAC>


export const packsReducer = (state: PageStateType = initialState, action: ActionTypes): PageStateType => {

    switch (action.type) {

        case 'SET-PACKS':
            return {...state, packs: action.packs}

        case 'SET-CURRENT-PAGE':
            return {...state, currentPage: action.currentPage}

        case 'SET-ITEMS-PER-PAGE':
            return {...state, itemsPerPage: action.itemsPerPage}

        case 'SET-TOTAL-PACKS-COUNT':
            return {...state, totalPacksCount: action.totalPacksCount}

        default:
            return state
    }
}


const SET_PACKS = 'SET-PACKS'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_ITEMS_PER_PAGE = 'SET-ITEMS-PER-PAGE'
const SET_TOTAL_PACKS_COUNT = 'SET-TOTAL-PACKS-COUNT'


export const setPacksAC = (packs: Array<GetPacksResponseType>) => (
    {
        type: SET_PACKS,
        packs
    } as const
)

export const setCurrentPageAC = (currentPage: number) => (
    {
        type: SET_CURRENT_PAGE,
        currentPage
    } as const
)

export const setItemsPerPageAC = (itemsPerPage: number) => (
    {
        type: SET_ITEMS_PER_PAGE,
        itemsPerPage
    } as const
)

export const setTotalPacksCountAC = (totalPacksCount: number) => (
    {
        type: SET_TOTAL_PACKS_COUNT,
        totalPacksCount
    } as const
)

// Thunks

export const getPacksTC = (page: number, pageCount: number) => (dispatch: DispatchType) => {
    dispatch(setAppStatusAC('loading'))
    packsAPI.getPacks()
        .then((response) => {
            console.log(response)
            dispatch(setPacksAC(response.cardPacks))
            dispatch(setTotalPacksCountAC(response.cardPacksTotalCount))
        })
        .catch(e => console.log(e))
        .finally(() => {
            dispatch(setAppStatusAC('idle'))
        })
}