import {GetPacksResponseType, packsAPI} from '../api/authAPI';
import {setAppStatusAC} from './app-reducer';
import {ThunkAction} from 'redux-thunk';
import {RootStateType} from './store';
import {Action} from 'redux';

type PageStateType = {
    packs: Array<GetPacksResponseType>
    totalPacksCount: number
    itemsPerPage: number
    currentPage: number
    params: GetPacksParamsType
}

export type GetPacksParamsType = {
    packName?: string
    min?: number
    max?: number
    page: number
    pageCount: number
    sortPacks: '1created' | '0created' | '1updated' | '0updated'
}

const initialState: PageStateType = {
    packs: [],
    totalPacksCount: 0,
    itemsPerPage: 5,
    currentPage: 1,
    params: {
        page: 1,
        pageCount: 10,
        sortPacks: '0updated',
    }
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

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootStateType,
    unknown,
    Action<string>>

export const getPacksTC = ():AppThunk => (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'))
    const params = getState().packsPage.params
    packsAPI.getPacks(params)
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

export const createPackTC = (name: string):AppThunk => (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'))
    packsAPI.createPack(name)
        .then((response) => {
            console.log(response)
            const page = getState().packsPage.currentPage
            const pageCount = getState().packsPage.itemsPerPage
            dispatch(getPacksTC())
        })
        .catch(e => console.log(e))
        .finally(() => {
            dispatch(setAppStatusAC('idle'))
        })
}

export const deletePackTC = (id: string):AppThunk => (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'))
    packsAPI.deletePack(id)
        .then((response) => {
            console.log(response)
            const page = getState().packsPage.currentPage
            const pageCount = getState().packsPage.itemsPerPage
            dispatch(getPacksTC())
        })
        .catch(e => console.log(e))
        .finally(() => {
            dispatch(setAppStatusAC('idle'))
        })
}
// fix newName
export const updatePackTC = (id: string, newName?: string):AppThunk => (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'))
    packsAPI.updatePack(id, 'UPDATED Pack')
        .then((response) => {
            console.log(response)
            const page = getState().packsPage.currentPage
            const pageCount = getState().packsPage.itemsPerPage
            dispatch(getPacksTC())
        })
        .catch(e => console.log(e))
        .finally(() => {
            dispatch(setAppStatusAC('idle'))
        })
}