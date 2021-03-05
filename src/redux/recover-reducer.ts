type PageStateType = {}

const initialState: PageStateType = {}

type ActionTypes =
    | ReturnType<typeof someAC>

export const recoverReducer = (state: PageStateType = initialState, action: ActionTypes): PageStateType => {

    switch (action.type) {

        case 'SOME-ACTION':
            return {
                ...state,
            }

        default:
            return state
    }
}


const SOME_ACTION = 'SOME-ACTION'

const someAC = () => ({
        type: SOME_ACTION
    } as const
)