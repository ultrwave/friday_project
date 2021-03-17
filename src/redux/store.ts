import { applyMiddleware, combineReducers, createStore } from "redux"
import thunkMiddleware from 'redux-thunk';
import {authReducer} from './auth-reducer';
import {passwordReducer} from './password-reducer';
import {profileReducer} from './profile-reducer';
import {recoverReducer} from './recover-reducer';
import {registrationReducer} from './registration-reducer';
import {appReducer} from './app-reducer';
import {packsReducer} from './packs-reducer';
import {cardsReducer} from './cards-reducer';

export const rootReducer = combineReducers({
    appState: appReducer,
    auth: authReducer,
    pagePassword: passwordReducer,
    pageProfile: profileReducer,
    pageRecover: recoverReducer,
    pageRegistration: registrationReducer,
    packsPage: packsReducer,
    cardsPage: cardsReducer
})

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type RootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store

export default store