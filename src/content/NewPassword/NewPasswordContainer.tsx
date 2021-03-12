import React, {useState} from 'react';
import inputValidator from '../../common/inputValidator';
import NewPassword from './NewPassword';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../../redux/store';
import {setNewPasswordTC} from '../../redux/auth-reducer';
import {Redirect, useParams} from 'react-router-dom';

export type NewPasswordFormStateType = {
    password: InputType
    confirm: InputType
}

type InputType = {
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
    const isLoggedIn = useSelector((state: RootStateType): boolean => state.auth.isLoggedIn)
    const params: ParamsType = useParams()
    const token = params.token ? params.token : ''

    let [formState, setFormState] = useState<NewPasswordFormStateType>(
        {
            password: {value: '', error: '', touched: false},
            confirm: {value: '', error: '', touched: false}
        })

    const onChangeHandler = (field: 'password' | 'confirm') => (value: string) => {
        setFormState({
            ...formState, [field]:
                {
                    ...formState[field],
                    value: value.trim(),
                    error: formState[field].touched ? inputValidator(value, 'password') : ''
                }
        })
    }

    const onBlurHandler = (field: 'password' | 'confirm') => (e: React.FocusEvent<HTMLInputElement>) => {
        setFormState({
            ...formState, [field]:
                {
                    ...formState[field],
                    error: formState[field].value ?
                        inputValidator(e.target.value, 'password') : 'Required field',
                    touched: true
                }
        })
    }

    const onSubmitHandler = (password: string) => {
        if (formState.password.value !== formState.confirm.value) {
            setFormState({...formState, confirm: {...formState.confirm, error: 'Passwords do not match'}})
        } else {
            dispatch(setNewPasswordTC(password, token))
        }
    }

    return (
        !(!isLoggedIn && !token) //todo
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
