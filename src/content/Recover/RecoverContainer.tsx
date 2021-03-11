import React, {useCallback, useState} from 'react';
import inputValidator from '../../common/inputValidator';
import Recover from './Recover';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../../redux/store';
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
    const isLoggedIn = useSelector((state: RootStateType): boolean => state.auth.isLoggedIn)
    let [formState, setFormState] =
        useState<RecoverFormStateType>({value: '', error: '', touched: false})

    // Timer

    const timerValueMs = 10000
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
        dispatch(recoverPasswordTC(email))
    }

    // Render

    return (
        isLoggedIn ?
            <h1>redirect to profile</h1>
            :
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
