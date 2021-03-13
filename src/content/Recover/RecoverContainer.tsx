import React, {useState} from 'react';
import inputValidator from '../../common/inputValidator';
import Recover from './Recover';
import {useDispatch} from 'react-redux';
import {recoverPasswordTC, setRecoverLinkTimestampAC} from '../../redux/recover-reducer';

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
    const baseUrl = `${window.location.origin}/#/set-new-password`

    // Timer

    const timerValueMs = 6000
    dispatch(setRecoverLinkTimestampAC(Number(localStorage.timerData)))
    const getTime = () => (Number(localStorage.timerData) + timerValueMs - Date.now())

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
        if (!formState.error) dispatch(recoverPasswordTC(email, baseUrl)) // todo - нужен промис?
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
