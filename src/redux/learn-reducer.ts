import {CardType} from '../api/API';

type PageStateType = {
    packTitle: string
    cards: Array<CardType>
    cardId: string
    grade: number
}

const initialState: PageStateType = {
    packTitle: 'Pack',
    cards: [],
    cardId: '',
    grade: 0
}

type ActionTypes =
    | ReturnType<typeof setCardIdAC>
    | ReturnType<typeof setGradeAC>



export const learnReducer = (state: PageStateType = initialState, action: ActionTypes): PageStateType => {

    switch (action.type) {

        case 'SET-CARD-ID':
            return {...state, cardId: action.cardId}

        case 'SET-GRADE':
            return {...state, grade: action.grade}

        default:
            return state
    }
}

const SET_CARD_ID = 'SET-CARD-ID'
const SET_GRADE = 'SET-GRADE'

export const setCardIdAC = (cardId: string) => (
    {type: SET_CARD_ID, cardId} as const
)
export const setGradeAC = (grade: number) => (
    {type: SET_GRADE, grade} as const
)


// Thunks

