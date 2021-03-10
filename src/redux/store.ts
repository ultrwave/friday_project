import { applyMiddleware, combineReducers, createStore } from "redux"
import thunkMiddleware from 'redux-thunk';
import {authReducer} from './auth-reducer';
import {passwordReducer} from './password-reducer';
import {profileReducer} from './profile-reducer';
import {recoverReducer} from './recover-reducer';
import {registrationReducer} from './registration-reducer';

export const rootReducer = combineReducers({
    pageLogin: authReducer,
    pagePassword: passwordReducer,
    pageProfile: profileReducer,
    pageRecover: recoverReducer,
    pageRegistration: registrationReducer
})

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

// @ts-ignore
window.store = store

export default store