import React from 'react';
import style from '../styles/Recover.module.css'
import SuperInputText from '../../common/SuperInputText/SuperInputText';
import {NavLink} from 'react-router-dom';
import SuperButton from '../../common/SuperButton/SuperButton';
import {LoginFormStateType} from '../Login/LoginContainer';
import {ValidatorFieldType} from '../../common/inputValidator';
import {RecoverFormStateType} from './RecoverContainer';

type RecoverPropsType = {
    formState: RecoverFormStateType
    onChangeHandler(value: string): void
    onBlurHandler(e: React.FocusEvent<HTMLInputElement>): void
    onSubmitHandler(email: string): void
}

function Recover({formState, onChangeHandler, onBlurHandler, onSubmitHandler}: RecoverPropsType) {

    const submitForm = () => onSubmitHandler(formState.value)

    const disableSubmit = false

    return (
        <form className={style.form}>
            <h1>Recover</h1>
            <SuperInputText
                value={formState.value}
                error={formState.error}
                onChangeText={onChangeHandler}
                onBlur={onBlurHandler}
            />
            <SuperButton disabled={disableSubmit} onClick={submitForm}>Send</SuperButton>
            <NavLink to={'/login'}><span>Login</span></NavLink>
        </form>
    )
}

export default Recover;
