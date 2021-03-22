import {applyMiddleware, combineReducers, compose, createStore} from "redux"
import thunkMiddleware from 'redux-thunk';
import {authReducer} from './auth-reducer';
import {recoverReducer} from './recover-reducer';
import {registrationReducer} from './registration-reducer';
import {appReducer} from './app-reducer';
import {searchReducer} from "./search-reducer";
import {paginationReducer} from "./pagination-reducer";
import {packsReducer} from './packs-reducer';
import {cardsReducer} from './cards-reducer';

export const rootReducer = combineReducers({
    appState: appReducer,
    auth: authReducer,
    pageRecover: recoverReducer,
    pageRegistration: registrationReducer,
    filterState: searchReducer,
    pagination: paginationReducer,
    packsPage: packsReducer,
    cardsPage: cardsReducer
})

// let store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

// вариант для работы с расширением (хрома) redux devtools:
// @ts-ignore
const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;
const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunkMiddleware)
));

export type RootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store

export default store