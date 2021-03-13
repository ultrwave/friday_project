import React, {useState} from 'react';
import inputValidator from '../../common/inputValidator';
import Recover from './Recover';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../../redux/store';
import {recoverPasswordTC, setRecoverLinkTimestampAC} from '../../redux/recover-reducer';
import {Redirect} from 'react-router-dom';

export type RecoverFormStateType = {
    value: string
    error: string
    touched: boolean
}

!localStorage.timerData && localStorage.setItem('timerData', '0')

function RecoverContainer() {
    console.log('RecoverContainer called')

    const dispatch = useDispatch()
    let [formState, setFormState] =
        useState<RecoverFormStateType>({value: '', error: '', touched: false})

    // Timer

    const timerValueMs = 6000
    dispatch(setRecoverLinkTimestampAC(Number(localStorage.timerData)))
    const getTime = () => (Number(localStorage.timerData) + timerValueMs - (new Date).valueOf())

    // Handlers

    const onChangeHandler = (value: string) => {
        setFormState({
            ...formState,
            value: value.trim(),
            error: formState.touched ? inputValidator(value, 'email') : ''
        })
    }

    const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
        setFormState({
            ...formState,
            error: formState.value ? inputValidator(e.target.value, 'email') : 'Required field',
            touched: true
        })
    }

    const onSubmitHandler = (email: string) => {
        setFormState({
            ...formState,
            error: formState.value ? inputValidator(email, 'email') : 'Required field',
            touched: true
        })
        if (!formState.error) dispatch(recoverPasswordTC(email))
    }

    // Render

    return (
            <Recover
                formState={formState}
                getTime={getTime}
                onChangeHandler={onChangeHandler}
                onBlurHandler={onBlurHandler}
                onSubmitHandler={onSubmitHandler}
            />
    )
}

export default RecoverContainer;
