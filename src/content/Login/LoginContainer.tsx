import React, {useState} from 'react';
import inputValidator from '../../common/inputValidator';
import Login from './Login';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../../redux/store';
import {logInTC} from '../../redux/auth-reducer';
import {Redirect} from 'react-router-dom';

export type LoginFormStateType = {
    email: InputStateType
    password: InputStateType
    rememberMe: boolean
    globalFormError: string
}

export type InputStateType = {
    value: string
    error: string
    touched: boolean
}

function LoginContainer() {
    console.log('LoginContainer called')

    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state: RootStateType): boolean => state.auth.isLoggedIn)

    let [formState, setFormState] = useState<LoginFormStateType>(
        {
            email: {value: '', error: '', touched: false},
            password: {value: '', error: '', touched: false},
            rememberMe: false,
            globalFormError: ''
        })

    const onChangeHandler = (field: 'email' | 'password') => (value: string) => {
        setFormState({
            ...formState, [field]:
                {
                    ...formState[field],
                    value: value.trim(),
                    error: formState[field].touched ? inputValidator(value, field) : ''
                }
        })
    }

    const onBlurHandler = (field: 'email' | 'password') => (e: React.FocusEvent<HTMLInputElement>) => {
        setFormState({
            ...formState, [field]:
                {
                    ...formState[field],
                    error: formState[field].value ? inputValidator(e.target.value, field) : 'Required field',
                    touched: true
                }
        })
    }

    const checkBoxHandler = (rememberMe: boolean) => {
        setFormState({...formState, rememberMe}
        )
    }

    const onSubmitHandler = (email: string, password: string, rememberMe: boolean) => {
        dispatch(logInTC(email, password, rememberMe))
    }

    return (
        isLoggedIn
            ? <Redirect to={'profile'}/>
            : <Login
                formState={formState}
                onChangeHandler={onChangeHandler}
                onBlurHandler={onBlurHandler}
                checkBoxHandler={checkBoxHandler}
                onSubmitHandler={onSubmitHandler}
            />
    )
}

export default LoginContainer;
