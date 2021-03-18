import {CardType, cardsAPI} from '../api/authAPI';
import {setAppStatusAC} from './app-reducer';
import {ThunkAction} from 'redux-thunk';
import {RootStateType} from './store';
import {Action} from 'redux';

type PageStateType = {
    cards: Array<CardType>
    totalCardsCount: number
    itemsPerPage: number
    currentPage: number
    params: GetCardsParamsType
}

export type GetCardsParamsType = {
    cardName?: string
    min?: number
    max?: number
    page: number
    pageCount: number
    sortCards: '1created' | '0created' | '1updated' | '0updated'
}

const initialState: PageStateType = {
    cards: [],
    totalCardsCount: 0,
    itemsPerPage: 5,
    currentPage: 1,
    params: {
        page: 1,
        pageCount: 10,
        sortCards: '0updated',
    }
}

type ActionTypes =
    | ReturnType<typeof setCardsAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setItemsPerPageAC>
    | ReturnType<typeof setTotalCardsCountAC>


export const cardsReducer = (state: PageStateType = initialState, action: ActionTypes): PageStateType => {

    switch (action.type) {

        case 'SET-CARDS':
            return {...state, cards: action.cards}

        case 'SET-CURRENT-PAGE':
            return {...state, currentPage: action.currentPage}

        case 'SET-ITEMS-PER-PAGE':
            return {...state, itemsPerPage: action.itemsPerPage}

        case 'SET-TOTAL-CARDS-COUNT':
            return {...state, totalCardsCount: action.totalCardsCount}

        default:
            return state
    }
}

const SET_CARDS = 'SET-CARDS'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_ITEMS_PER_PAGE = 'SET-ITEMS-PER-PAGE'
const SET_TOTAL_CARDS_COUNT = 'SET-TOTAL-CARDS-COUNT'

export const setCardsAC = (cards: Array<CardType>) => (
    {type: SET_CARDS, cards} as const
)
export const setCurrentPageAC = (currentPage: number) => (
    {type: SET_CURRENT_PAGE, currentPage} as const
)
export const setItemsPerPageAC = (itemsPerPage: number) => (
    {type: SET_ITEMS_PER_PAGE, itemsPerPage} as const
)
export const setTotalCardsCountAC = (totalCardsCount: number) => (
    {type: SET_TOTAL_CARDS_COUNT, totalCardsCount} as const
)

// Thunks

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootStateType,
    unknown,
    Action<string>>

export const getCardsTC = ():AppThunk =>
    (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'))
    const params = getState().cardsPage.params
    cardsAPI.getCards(params)
        .then((response) => {
            dispatch(setCardsAC(response.cards))
            dispatch(setTotalCardsCountAC(response.cardsTotalCount))
        })
        .catch(e => console.log(e))
        .finally(() => dispatch(setAppStatusAC('idle')))
}

export const createCardTC = (name?: string):AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    cardsAPI.createCard({question: 'New Card'})
        .then(() => dispatch(getCardsTC()))
        .catch(e => console.log(e))
        .finally(() => dispatch(setAppStatusAC('idle')))
}

export const deleteCardTC = (id: string):AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    cardsAPI.deleteCard(id)
        .then(() => dispatch(getCardsTC()))
        .catch(e => console.log(e))
        .finally(() => dispatch(setAppStatusAC('idle')))
}
// fix newName
export const updateCardTC = (id: string, newName?: string):AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    cardsAPI.updateCard(id)
        .then(() => dispatch(getCardsTC()))
        .catch(e => console.log(e))
        .finally(() => dispatch(setAppStatusAC('idle')))
}