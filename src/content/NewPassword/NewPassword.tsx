import React from 'react';
import style from '../styles/Login.module.css'
import SuperButton from '../../common/SuperButton/SuperButton';
import {NavLink} from 'react-router-dom';
import {NewPasswordFormStateType} from './NewPasswordContainer';
import SuperInputPassword from '../../common/SuperInputPassword/SuperInputPassword';

type RecoverPropsType = {
    formState: NewPasswordFormStateType
    onChangeHandler(value: string): void
    onBlurHandler(e: React.FocusEvent<HTMLInputElement>): void
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
        onSubmitHandler(formState.value)
    }

    return (
        <form className={style.form}>
            <h1>New password</h1>
            <SuperInputPassword
                value={formState.value}
                error={formState.error}
                onChangeText={onChangeHandler}
                onBlur={onBlurHandler}
                placeholder={'Enter new password'}
            />
            <SuperButton disabled={!!formState.error} onClick={submitForm}>Send</SuperButton>
            <NavLink to={'/login'}><span>Login page</span></NavLink>
        </form>
    )
}

export default NewPassword