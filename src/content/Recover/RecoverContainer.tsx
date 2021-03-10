import React, {useState} from 'react';
import inputValidator from '../../common/inputValidator';
import Recover from './Recover';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../../redux/store';
import {recoverPasswordTC} from '../../redux/recover-reducer';

export type RecoverFormStateType = {
    value: string
    error: string
    touched: boolean
}



function RecoverContainer() {
    console.log('Recover called')
    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state: RootStateType): boolean => state.auth.isLoggedIn)
    const lastLinkTime =
        useSelector((state: RootStateType): number => state.pageRecover.lastLinkTimestamp)
    let [formState, setFormState] = useState<RecoverFormStateType>(
        {value: '', error: '', touched: false})
    console.log(lastLinkTime)

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

    let timeTillNextLink = (lastLinkTime + 60000 - (new Date()).getTime())
    if (timeTillNextLink < 0) timeTillNextLink = 0

    function msToTime(ms: number) {
        let minutes = Math.floor(ms / 60000);
        let seconds = ((ms % 60000) / 1000);
        console.log(minutes, seconds)
        return minutes + ":" + (seconds < 10 ? '0' : '') + Math.floor(seconds)
    }


    return (
        isLoggedIn ?
            <h1>redirect to profile</h1>
            :
            <Recover
                formState={formState}
                timeTillNextLink={msToTime(timeTillNextLink)}
                onChangeHandler={onChangeHandler}
                onBlurHandler={onBlurHandler}
                onSubmitHandler={onSubmitHandler}
            />
    )
}

export default RecoverContainer;
