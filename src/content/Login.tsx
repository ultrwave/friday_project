import React, {useState} from 'react';
import style from './styles/Login.module.css'
import SuperInputText from '../common/SuperInputText/SuperInputText';
import SuperCheckbox from '../common/SuperCheckbox/SuperCheckbox';
import SuperButton from '../common/SuperButton/SuperButton';
import {NavLink} from 'react-router-dom';

type LoginPropsType = {
    error?: string
}

function Login(props: any) {

    console.log('Login called')
    let [error, setError] = useState({email: '', password: ''})
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [rememberMe, setRM] = useState(false)

    const validateEmail = () => {
        const valid = (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))
        setError({...error, email: valid ? '' : 'Invalid email format'})
    }

    const validatePass = () => {
        // const valid = (/^[a-zA-Z0-9!@#$%^&*]{6,16}$/i.test(password))
        const valid = password.length > 2
        setError({...error, password: valid ? '' : 'Invalid password'})
    }

    const emailOnChangeHandler = (value: string) => {
        setEmail(value)
        validateEmail()
    }

    const passwordOnChangeHandler = (value: string) => {
        setPassword(value)
        validatePass()
    }

    console.log(`email: ${email}; password: ${password}; errorE: ${error.email}; errorP: ${error.password}`)

    return (
        <form className={style.form}>
            <h1>Sign in</h1>
            <SuperInputText
                className={style.login}
                value={email}
                onChangeText={emailOnChangeHandler}
                error={error.email}
            />
            <SuperInputText
                className={style.pass}
                value={password}
                onChangeText={passwordOnChangeHandler}
                type='password'
                error={error.password}
            />
            <div>
                <NavLink to={'/recover'}><span>Forgot password?</span></NavLink>
            </div>
            <div className={style.rememberMe}>
                <SuperCheckbox/>
                <span>Remember me</span>
            </div>
            <div>
                <SuperButton disabled={true}>Sign in</SuperButton>
            </div>
            <div>
                <NavLink to={'/registration'}><span>Registration</span></NavLink>
            </div>
        </form>
    )
}

export default Login;
