import React, {useEffect, useState} from 'react';
import {authAPI} from '../../api/authAPI';
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";
import Registration2 from './Registration2';
import registrationInputValidator from "../../common/registrationInputValidator";
import {logInTC} from "../../redux/auth-reducer";
import {registrationTC, setSuccessfullyRegisteredAC} from "../../redux/registration-reducer";
import {Redirect} from "react-router-dom";

export type RegistrationFormStateType = {
    email: InputStateType
    password: InputStateType
    password2: InputStateType
    errorResponse: string
    successfullyRegistered: boolean
    // rememberMe: boolean
    globalFormError: string

}

export type InputStateType = {
    value: string
    error: string
    touched: boolean
}

// type StateType = {
//     email: string
//     password1: string
//     password2: string
//     errorResponse: string
//     successfullyRegistered: boolean
// }
const initialState: RegistrationFormStateType = {
    email: {value: '', error: '', touched: false},
    password: {value: '', error: '', touched: false},
    password2: {value: '', error: '', touched: false},
    errorResponse: "",
    successfullyRegistered: false,
    globalFormError: ''
}


function RegistrationContainer() {
    console.log('Registration Container component called')
    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state: RootStateType): boolean => state.auth.isLoggedIn)
    const isSuccessfullyRegistered = useSelector((state: RootStateType): boolean => state.pageRegistration.isSuccessfullyRegistered)

    const [registrationFormState, setRegistrationFormState] = useState<RegistrationFormStateType>(initialState);

    useEffect(() => {
        if (isSuccessfullyRegistered) {
            dispatch(setSuccessfullyRegisteredAC(false))
        }
    })

    // const emailError = formState.email ? "" : "Field can't be empty";
    // const pw1Error = formState.password1 ? "" : "Field can't be empty";
    // const pw2Error = formState.password2 ? "" : "Field can't be empty";

    // const handleSignUp = () => {
    //     if (false) {
    //         alert("Введите текст");
    //     } else {
    //         authAPI.registration(registrationFormState.email.value, registrationFormState.password.value)
    //             .then((res: any) => {
    //                 console.log(`User ${res.data.addedUser.email} successfully signed up`)
    //                 setSuccessfulRegistration(true)
    //
    //             })
    //             .catch((error) => {
    //                 setRegistrationFormState({...registrationFormState, errorResponse: error.response.data.error})
    //             })
    //     }
    // };


    // const onChangeHandler = (field: 'email' | 'password') => (value: string) => {
    //     setRegistrationFormState({
    //         ...registrationFormState, [field]:
    //             {
    //                 ...registrationFormState[field],
    //                 value: value.trim(),
    //                 error: registrationFormState[field].touched ? inputValidator(value, field) : ''
    //             }
    //     })
    // }

    const onRegistrationInputsChangeHandler = (field: 'email' | 'password' | 'password2') =>
        (value: string) => {
            setRegistrationFormState({
                ...registrationFormState,
                [field]:
                    {
                        ...registrationFormState[field],
                        value: value.trim(),
                        error: registrationFormState[field].touched ?
                            registrationInputValidator(field, value, registrationFormState.password.value)
                            : ''
                    }, // исправить проверку password2
            })
        }

    // const onPassword2ChangeHandler = (field: 'password2' ) => (value: string) => {
    //     setRegistrationFormState({
    //         ...registrationFormState, [field]:
    //             {
    //                 ...registrationFormState[field],
    //                 value: value.trim(),
    //                 error: registrationFormState[field].touched ? password2Validator(value, field) : ''
    //             }
    //     })
    // }

    const onBlurHandler = (field: 'email' | 'password') => (e: React.FocusEvent<HTMLInputElement>) => {
        setRegistrationFormState({
            ...registrationFormState, [field]:
                {
                    ...registrationFormState[field],
                    error: registrationFormState[field].value ?
                        registrationInputValidator(field, e.target.value, registrationFormState.password.value)
                        : 'Required field',
                    touched: true
                }
        })
    }

    const onSubmitHandler = (email: string, password: string) => {
        // alert(`email: ${email}\npw: ${password}`)
        dispatch(registrationTC(email, password))
    }

    // const setSuccessfulRegistration = (val: boolean) => {
    //     setRegistrationFormState({...registrationFormState, successfullyRegistered: val})
    // }


    return (
        isSuccessfullyRegistered
            ?
            <Redirect to={'profile'}/>
        : <Registration2
            registrationFormState={registrationFormState}
            onChangeHandler={onRegistrationInputsChangeHandler}
            onBlurHandler={onBlurHandler}
            onSubmitHandler={onSubmitHandler}
        />

    )
}

export default RegistrationContainer;
