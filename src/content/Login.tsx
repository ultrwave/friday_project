import React, {useState} from 'react';
import style from './styles/Login.module.css'
import SuperInputText from '../common/SuperInputText/SuperInputText';
import SuperCheckbox from '../common/SuperCheckbox/SuperCheckbox';
import SuperButton from '../common/SuperButton/SuperButton';
import {NavLink} from 'react-router-dom';
import SuperInputPassword from '../common/SuperInputPassword/SuperInputPassword';

type LoginFormStateType = {
    email: InputStateType
    password: InputStateType
    rememberMe: boolean
    globalFormError: string
}

type InputStateType = {
    value: string
    error: string
    touched: boolean
}

function Login() {

    console.log('Login called')
    let [state, setState] = useState<LoginFormStateType>(
        {
            email: {value: '', error: '', touched: false},
            password: {value: '', error: '', touched: false},
            rememberMe: false,
            globalFormError: ''
        })

    const validate = (value: string, type: 'email' | 'password'): string => {
        switch (type) {
            case 'email':
                return (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) ? '' : 'Invalid email'
            case 'password':
                return /^[a-zA-Z0-9!@#$%^&*]{6,16}$/i.test(value) ? '' : 'Invalid password'
            default:
                return ''
        }
    }

    const onChangeHandler = (field: 'email' | 'password') => (value: string) => {
        setState({
            ...state, [field]:
                {
                    ...state[field],
                    value: value.trim(),
                    error: state[field].touched ? validate(value, field) : ''
                }
        })
    }

    const onBlurHandler = (field: 'email' | 'password') => (e: React.FocusEvent<HTMLInputElement>) => {
        setState({
            ...state, [field]:
                {
                    ...state[field],
                    error: state[field].value ? validate(e.target.value, field) : 'Required field',
                    touched: true
                }
        })
    }

    const checkBoxHandler = (rememberMe: boolean) => {
        setState({...state, rememberMe}
        )
    }

    const disableSubmit = !!(state.email.error || state.password.error || state.globalFormError)

    console.log(state)

    return (
        <form className={style.form}>
            <h1>Sign in</h1>
            <SuperInputText
                value={state.email.value}
                error={state.email.error}
                onChangeText={onChangeHandler('email')}
                onBlur={onBlurHandler('email')}
            />
            <SuperInputPassword
                value={state.password.value}
                error={state.password.error}
                onChangeText={onChangeHandler('password')}
                onBlur={onBlurHandler('password')}
            />
            <NavLink to={'/recover'}><span>Forgot password?</span></NavLink>
            <div className={style.rememberMe}>
                <SuperCheckbox onChangeChecked={checkBoxHandler} checked={state.rememberMe}/>
                <span>Remember me</span>
            </div>
            <SuperButton disabled={disableSubmit}>Sign in</SuperButton>
            <NavLink to={'/registration'}><span>Registration</span></NavLink>
        </form>
    )
}

export default Login;
