import React from 'react';
import style from '../styles/Login.module.css'
import SuperInputText from '../../common/SuperInputText/SuperInputText';
import SuperCheckbox from '../../common/SuperCheckbox/SuperCheckbox';
import SuperButton from '../../common/SuperButton/SuperButton';
import {NavLink} from 'react-router-dom';
import SuperInputPassword from '../../common/SuperInputPassword/SuperInputPassword';
import {LoginFormStateType} from './LoginContainer';
import {ValidatorFieldType} from '../../common/inputValidator';

type LoginPropsType = {
    formState: LoginFormStateType
    onChangeHandler(field: ValidatorFieldType): (value: string) => void
    onBlurHandler(field: ValidatorFieldType): (e: React.FocusEvent<HTMLInputElement>) => void
    checkBoxHandler(rememberMe: boolean): void
    onSubmitHandler(email: string, password: string, rememberMe: boolean): void
}

function Login({formState, onChangeHandler, onBlurHandler, checkBoxHandler, onSubmitHandler}:LoginPropsType) {

    console.log('Login called')

    const email = formState.email
    const password = formState.password
    const rememberMe = formState.rememberMe

    const submitForm = () => {onSubmitHandler(email.value, password.value, rememberMe)}

    const disableSubmit = !!(email.error || password.error || formState.globalFormError)

    return (
        <form className={style.form}>
            <h1>Sign in</h1>
            <SuperInputText
                value={email.value}
                error={email.error}
                onChangeText={onChangeHandler('email')}
                onBlur={onBlurHandler('email')}
                placeholder={'Email'}
            />
            <SuperInputPassword
                value={password.value}
                error={password.error}
                onChangeText={onChangeHandler('password')}
                onBlur={onBlurHandler('password')}
                placeholder={'Password'}
            />
            <NavLink to={'/recover'}><span>Forgot password?</span></NavLink>
            <div className={style.rememberMe}>
                <SuperCheckbox onChangeChecked={checkBoxHandler} checked={rememberMe}/>
                <span>Remember me</span>
            </div>
            <SuperButton disabled={disableSubmit} onClick={submitForm}>Sign in</SuperButton>
            <NavLink to={'/registration'}><span>Registration</span></NavLink>
        </form>
    )
}

export default Login;
