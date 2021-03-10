import React from 'react';
import style from '../styles/Recover.module.css'
import SuperInputText from '../../common/SuperInputText/SuperInputText';
import {NavLink} from 'react-router-dom';
import SuperButton from '../../common/SuperButton/SuperButton';
import {RecoverFormStateType} from './RecoverContainer';

type RecoverPropsType = {
    timeTillNextLink: string
    formState: RecoverFormStateType
    onChangeHandler(value: string): void
    onBlurHandler(e: React.FocusEvent<HTMLInputElement>): void
    onSubmitHandler(email: string): void
}

function Recover({formState, onChangeHandler, onBlurHandler, onSubmitHandler, timeTillNextLink}: RecoverPropsType) {

    const submitForm = () => onSubmitHandler(formState.value)

    return (
        <form className={style.form}>
            <h1>Recover</h1>
            <SuperInputText
                value={formState.value}
                error={formState.error}
                onChangeText={onChangeHandler}
                onBlur={onBlurHandler}
                placeholder={'Email'}
            />
            <SuperButton disabled={!!formState.error} onClick={submitForm}>Send</SuperButton>
            {timeTillNextLink}
            <NavLink to={'/login'}><span>Login page</span></NavLink>
        </form>
    )
}

export default Recover;
