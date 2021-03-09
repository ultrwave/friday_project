import React, { useState} from 'react';
import SuperButton from "../common/SuperButton/SuperButton";
import SuperInputText from "../common/SuperInputText/SuperInputText";
import SuperCheckbox from "../common/SuperCheckbox/SuperCheckbox";
import s from './styles/Registration.module.css'
import {LoginAPI} from "../registrationAPI";

type RegistrationPropsType = {
    error?: string
}

type StateType = {
    email: string
    password1: string
    password2: string
}
const initialState: StateType = {
    email:"",
    password1: "",
    password2: ""
}

function Registration() {
    const [state, setState] = useState<StateType>( initialState );
    const emailError = state.email ? "" : "Field can't be empty";

    const pw1Error = state.password1 ? "" : "Field can't be empty";

    const pw2Error = state.password2 ? "" : "Field can't be empty";

    const showAlert = () => {
        if (emailError) {
            alert("Введите текст");
        } else {
            //alert(`${state.email}\n${state.password1}\n${state.password2}\n`); // если нет ошибки показать текст
            LoginAPI.registerUser(state.email,state.password1)
                .then((res:any)=>{
                    console.log(res)
                })
        }
    };

    const handleEmail = (val:string) => {
        //alert(val)
        setState({...state, email: val})
    }
    const handlePw1 = (val:string) => {
        //alert(val)
        setState({...state, password1: val})
    }
    const handlePw2 = (val:string) => {
       // alert(val)
        setState({...state, password2: val})
    }



    return (
        <>

            <div>
                Registration
            </div>
            <div>
                <SuperInputText
                    value={state.email}
                    onChangeText={handleEmail}
                    onEnter={showAlert}
                    error={emailError}
                    className={s.green}
                    />
                <SuperInputText
                    value={state.password1}
                    onChangeText={handlePw1}
                    onEnter={showAlert}
                    error={pw1Error}
                    className={s.green}
                />
                <SuperInputText
                    value={state.password2}
                    onChangeText={handlePw2}
                    onEnter={showAlert}
                    error={pw2Error}
                    className={s.green}
                />

                <SuperButton
                    red={false} // пропсу с булевым значением не обязательно указывать true
                    onClick={showAlert}
                >
                    Button {/*// название кнопки попадёт в children*/}
                </SuperButton>


            </div>
        </>
    )
}

export default Registration;
