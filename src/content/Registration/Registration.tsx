import React, {useState} from 'react';
import SuperButton from '../../common/SuperButton/SuperButton';
import SuperInputText from '../../common/SuperInputText/SuperInputText';
import style from '../styles/Registration.module.css'
import {Redirect} from 'react-router-dom';
import {API} from '../../api/API';

type RegistrationPropsType = {
    error?: string
}

type StateType = {
    email: string
    password1: string
    password2: string
    errorResponse: string
    successfullyRegistered: boolean
}
const initialState: StateType = {
    email: "",
    password1: "",
    password2: "",
    errorResponse: "",
    successfullyRegistered: false
}

function Registration() {
    const [state, setState] = useState<StateType>(initialState);
    const emailError = state.email ? "" : "Field can't be empty";

    const pw1Error = state.password1 ? "" : "Field can't be empty";

    const pw2Error = state.password2 ? "" : "Field can't be empty";

    const handleSignUp = () => {
        if (emailError) {
            alert("Введите текст");
        } else {
            // API.registerUser(state.email, state.password1)
            //     .then((res: any) => {
            //         console.log(`User ${res.data.addedUser.email} successfully signed up`)
            //         //setState({...state, errorResponse: error.response.data.error})
            //         //return <Redirect to={'/friday_project#/login/'}/>
            //         setSuccessfulRegistration(true)
            //
            //     })
            //     .catch((error) => {
            //         setState({...state, errorResponse: error.response.data.error})
            //     })
        }
    };

    const handleEmail = (val: string) => {
        //alert(val)
        setState({...state, email: val, errorResponse: ""})
    }
    const handlePw1 = (val: string) => {
        //alert(val)
        setState({...state, password1: val, errorResponse: ""})
    }
    const handlePw2 = (val: string) => {
        // alert(val)
        setState({...state, password2: val, errorResponse: ""})
    }

    const setSuccessfulRegistration = (val: boolean) => {
        setState({...state, successfullyRegistered: val})
    }

    return (

        state.successfullyRegistered ?
            <Redirect to={'login'}/>
            :
            <div className={style.form}>

                <div>
                    Registration
                </div>
                <div className={style.registrationErrorMessage}>
                    {state.errorResponse}
                </div>
                <div>
                    <SuperInputText
                        title={'Email'}
                        value={state.email}
                        onChangeText={handleEmail}
                        onEnter={handleSignUp}
                        error={emailError}
                        className={style.green}
                    />
                    <SuperInputText
                        title={'Password'}
                        value={state.password1}
                        onChangeText={handlePw1}
                        onEnter={handleSignUp}
                        error={pw1Error}
                        className={style.green}
                    />
                    <SuperInputText
                        title={'Password confirmation'}
                        value={state.password2}
                        onChangeText={handlePw2}
                        onEnter={handleSignUp}
                        error={pw2Error}
                        className={style.green}
                    />

                    <SuperButton
                        red={false} // пропсу с булевым значением не обязательно указывать true
                        onClick={handleSignUp}
                    >
                        Sign up {/*// название кнопки попадёт в children*/}
                    </SuperButton>


                </div>
            </div>
    )
}

export default Registration;
