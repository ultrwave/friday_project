import React, {useState} from 'react';
import inputValidator from '../../common/inputValidator';
import Login from './Login';

export type LoginFormStateType = {
    email: InputStateType
    password: InputStateType
    rememberMe: boolean
    globalFormError: string
}

export type InputStateType = {
    value: string
    error: string
    touched: boolean
}

function LoginContainer() {

    let [state, setState] = useState<LoginFormStateType>(
        {
            email: {value: '', error: '', touched: false},
            password: {value: '', error: '', touched: false},
            rememberMe: false,
            globalFormError: ''
        })


    const onChangeHandler = (field: 'email' | 'password') => (value: string) => {
        setState({
            ...state, [field]:
                {
                    ...state[field],
                    value: value.trim(),
                    error: state[field].touched ? inputValidator(value, field) : ''
                }
        })
    }

    const onBlurHandler = (field: 'email' | 'password') => (e: React.FocusEvent<HTMLInputElement>) => {
        setState({
            ...state, [field]:
                {
                    ...state[field],
                    error: state[field].value ? inputValidator(e.target.value, field) : 'Required field',
                    touched: true
                }
        })
    }

    const checkBoxHandler = (rememberMe: boolean) => {
        setState({...state, rememberMe}
        )
    }

    return (
        <Login
            formState={state}
            onChangeHandler={onChangeHandler}
            onBlurHandler={onBlurHandler}
            checkBoxHandler={checkBoxHandler}
            onSubmitHandler={() => {}}
        />
    )
}

export default LoginContainer;
