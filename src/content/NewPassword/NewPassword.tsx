import React from 'react';
import style from '../styles/Login.module.css'
import SuperButton from '../../common/SuperButton/SuperButton';
import {NavLink} from 'react-router-dom';
import {NewPasswordFormStateType} from './NewPasswordContainer';
import SuperInputPassword from '../../common/SuperInputPassword/SuperInputPassword';

type RecoverPropsType = {
    formState: NewPasswordFormStateType
    onChangeHandler(field: 'password' | 'confirm'): (value: string) => void
    onBlurHandler(field: 'password' | 'confirm'): (e: React.FocusEvent<HTMLInputElement>) => void
    onSubmitHandler(password: string): void
}

const NewPassword = ({
                         formState,
                         onChangeHandler,
                         onBlurHandler,
                         onSubmitHandler,
                     }: RecoverPropsType) => {

    console.log('NewPassword called')

    const submitForm = () => {
        onSubmitHandler(formState.password.value)
    }

    const formError = !!(formState.password.error || formState.confirm.error)

    return (
        <form className={style.form}>
            <h1>New password</h1>
            <SuperInputPassword
                value={formState.password.value}
                error={formState.password.error}
                onChangeText={onChangeHandler('password')}
                onBlur={onBlurHandler('password')}
                placeholder={'Enter new password'}
            />
            <SuperInputPassword
                value={formState.confirm.value}
                error={formState.confirm.error}
                onChangeText={onChangeHandler('confirm')}
                onBlur={onBlurHandler('confirm')}
                placeholder={'Confirm'}
            />
            <SuperButton disabled={formError} onClick={submitForm}>Send</SuperButton>
            <NavLink to={'/login'}><span>Login page</span></NavLink>
        </form>
    )
}

export default NewPassword