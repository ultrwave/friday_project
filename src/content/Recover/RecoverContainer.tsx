import React, {useState} from 'react';
import inputValidator from '../../common/inputValidator';
import Recover from './Recover';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../../redux/store';

export type RecoverFormStateType = {
    value: string
    error: string
    touched: boolean
}

function RecoverContainer() {

    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state: RootStateType): boolean => state.auth.isLoggedIn)

    let [formState, setFormState] = useState<RecoverFormStateType>(
        {value: '', error: '', touched: false})

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
        // dispatch(recoverPasswordTC(email))
    }

    return (
        isLoggedIn ?
            <h1>redirect to profile</h1>
            :
            <Recover
                formState={formState}
                onChangeHandler={onChangeHandler}
                onBlurHandler={onBlurHandler}
                onSubmitHandler={onSubmitHandler}
            />
    )
}

export default RecoverContainer;
