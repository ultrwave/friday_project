import React, {useState} from 'react';
import inputValidator from '../../common/inputValidator';
import NewPassword from './NewPassword';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../../redux/store';
import {setNewPasswordTC} from '../../redux/auth-reducer';
import {Redirect, useParams} from 'react-router-dom';

export type NewPasswordFormStateType = {
    value: string
    error: string
    touched: boolean
}

type ParamsType = {
    token: string | undefined
}

function NewPasswordContainer() {
    console.log('NewPasswordContainer called')

    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state: RootStateType):boolean => state.auth.isLoggedIn)
    const params: ParamsType = useParams()
    const token = params.token ? params.token : ''

    let [formState, setFormState] = useState<NewPasswordFormStateType>(
        {value: '', error: '', touched: false})

    const onChangeHandler = (value: string) => {
        setFormState({
            ...formState,
            value: value.trim(),
            error: formState.touched ? inputValidator(value, 'password') : ''
        })
    }

    const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
        setFormState({
            ...formState,
            error: formState.value ? inputValidator(e.target.value, 'password') : 'Required field',
            touched: true
        })
    }

    const onSubmitHandler = (password: string) => {
        dispatch(setNewPasswordTC(password, token))
    }

    return (
        !isLoggedIn && !token
            ? <Redirect to={'/profile'}/>
            :
            <NewPassword
            formState={formState}
            onChangeHandler={onChangeHandler}
            onBlurHandler={onBlurHandler}
            onSubmitHandler={onSubmitHandler}
        />
    )
}

export default NewPasswordContainer;
