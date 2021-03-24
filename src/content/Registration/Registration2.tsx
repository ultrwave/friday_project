import React, {FormEvent} from 'react';
import SuperButton from '../../common/SuperButton/SuperButton';
import SuperInputText from '../../common/SuperInputText/SuperInputText';
import style from '../styles/Registration.module.css'
import {RegistrationFormStateType} from "./RegistrationContainer";
import {RegistrationValidatorFieldType} from '../../common/registrationInputValidator';

// type RegistrationPropsType = {
//     error?: string
// }
type RegistrationPropsType = {
    registrationFormState: RegistrationFormStateType
    onChangeHandler(field: RegistrationValidatorFieldType): (value: string) => void
    onBlurHandler(field: RegistrationValidatorFieldType): (e: React.FocusEvent<HTMLInputElement>) => void
    onSubmitHandler(email: string, password: string): void
}

// type StateType = {
//     email: string
//     password1: string
//     password2: string
//     errorResponse: string
//     successfullyRegistered: boolean
// }
// const initialState: StateType = {
//     email: "",
//     password1: "",
//     password2: "",
//     errorResponse: "",
//     successfullyRegistered: false
// }

// const RegistrationFormInitialState: RegistrationFormStateType = {}


function Registration2({registrationFormState, onChangeHandler, onBlurHandler, onSubmitHandler}: RegistrationPropsType) {
    // const [state, setState] = useState<StateType>(initialState);
    // const emailError = state.email ? "" : "Field can't be empty";
    //
    // const pw1Error = state.password1 ? "" : "Field can't be empty";
    //
    // const pw2Error = state.password2 ? "" : "Field can't be empty";

    const email = registrationFormState.email
    const password = registrationFormState.password
    const password2 = registrationFormState.password2
    const errorResponse = registrationFormState.errorResponse

    const submitForm = (e: FormEvent<HTMLFormElement>) => {
        e.stopPropagation()
        onSubmitHandler(email.value, password.value)
    }

    const disableSubmit = !!(email.error || password.error || password2.error || registrationFormState.globalFormError)
    // const handleSignUp = () => {
    //     if (false) {
    //         alert("Введите текст");
    //     } else {
    //         API.registerUser(state.email, state.password1)
    //             .then((res: any) => {
    //                 console.log(`User ${res.data.addedUser.email} successfully signed up`)
    //                 //setState({...state, errorResponse: error.response.data.error})
    //                 //return <Redirect to={'/friday_project#/login/'}/>
    //                 setSuccessfulRegistration(true)
    //
    //             })
    //             .catch((error) => {
    //                 setState({...state, errorResponse: error.response.data.error})
    //             })
    //     }
    // };

    // const handleEmail = (val: string) => {
    //     //alert(val)
    //     setState({...state, email: val, errorResponse: ""})
    // }
    // const handlePw1 = (val: string) => {
    //     //alert(val)
    //     setState({...state, password1: val, errorResponse: ""})
    // }
    // const handlePw2 = (val: string) => {
    //     // alert(val)
    //     setState({...state, password2: val, errorResponse: ""})
    // }

    // const setSuccessfulRegistration = (val: boolean) => {
    //     setState({...state, successfullyRegistered: val})
    // }

    return (
        <div className={style.pageContainer}>
        <form className={style.form} onSubmit={submitForm}>
            <h1>Sign Up</h1>
            <div className={style.registrationErrorMessage}>
                {errorResponse}
            </div>
            <div>
                <SuperInputText
                    title={'Email'}
                    value={email.value}
                    error={email.error}
                    onChangeText={onChangeHandler('email')}
                    onBlur={onBlurHandler('email')}
                    // placeholder={'Email'}
                    type={'text'}
                />

                <SuperInputText
                    title={'Password'}
                    value={password.value}
                    error={password.error}
                    onChangeText={onChangeHandler('password')}
                    onBlur={onBlurHandler('password')}
                    // placeholder={'Password'}
                    type={'password'}
                />

                <SuperInputText
                    title={'Confirm password'}
                    value={password2.value}
                    error={password2.error}
                    onChangeText={onChangeHandler('password2')}
                    onBlur={onBlurHandler('password2')}
                    // placeholder={'Password'}
                    type={'password'}
                />
                {/*<SuperInputText*/}
                {/*    title={'Password'}*/}
                {/*    value={password.value}*/}
                {/*    onChangeText={handlePw1}*/}
                {/*    onEnter={handleSignUp}*/}
                {/*    error={pw1Error}*/}
                {/*    className={style.green}*/}
                {/*/>*/}
                {/*<SuperInputText*/}
                {/*    title={'Confirm password'}*/}
                {/*    value={password2.value}*/}
                {/*    onChangeText={handlePw2}*/}
                {/*    onEnter={handleSignUp}*/}
                {/*    error={pw2Error}*/}
                {/*    className={style.green}*/}
                {/*/>*/}

                <SuperButton
                    disabled={disableSubmit}
                    type={'submit'}
                >
                    Sign up {/* название кнопки попадёт в children*/}
                </SuperButton>
            </div>

        </form>
        </div>


        // state.successfullyRegistered ?
        //     <Redirect to={'login'}/>
        //     :
        //     <div className={style.form}>
        //
        //         <div>
        //             Registration
        //         </div>
        //         <div className={style.registrationErrorMessage}>
        //             {state.errorResponse}
        //         </div>
        //         <div>
        //             <SuperInputText
        //                 title={'Email'}
        //                 value={state.email}
        //                 onChangeText={handleEmail}
        //                 onEnter={handleSignUp}
        //                 error={emailError}
        //                 className={style.green}
        //             />
        //             <SuperInputText
        //                 title={'Password'}
        //                 value={state.password1}
        //                 onChangeText={handlePw1}
        //                 onEnter={handleSignUp}
        //                 error={pw1Error}
        //                 className={style.green}
        //             />
        //             <SuperInputText
        //                 title={'Confirm password'}
        //                 value={state.password2}
        //                 onChangeText={handlePw2}
        //                 onEnter={handleSignUp}
        //                 error={pw2Error}
        //                 className={style.green}
        //             />
        //
        //             <SuperButton
        //                 red={false} // пропсу с булевым значением не обязательно указывать true
        //                 onClick={handleSignUp}
        //             >
        //                 Sign up {/*// название кнопки попадёт в children*/}
        //             </SuperButton>
        //
        //
        //         </div>
        //     </div>
    )
}

export default Registration2;
