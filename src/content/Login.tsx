import React from 'react';
import style from './styles/Login.module.css'
import SuperInputText from '../common/SuperInputText/SuperInputText';
import SuperCheckbox from '../common/SuperCheckbox/SuperCheckbox';
import SuperButton from '../common/SuperButton/SuperButton';

type LoginPropsType = {
    error?: string
}

function Login(props: any) {

    return (
        <div className={style.form}>
            <h1>Sign in</h1>
            <SuperInputText
                className={`${style.login} ${style.textInput}${props.error ? ' ' + style.error : ''}`}
                value={''}
            />
            <SuperInputText
                className={`${style.login} ${style.textInput}${props.error ? ' ' + style.error : ''}`}
                value={''}
                type='password'
            />
            <div>
                <span>Forgot password?</span>
            </div>
            <div>
                <SuperCheckbox/>
                <span>Remember me</span>
            </div>
            <div>
                <SuperButton>Sign in</SuperButton>
            </div>
            <div>
                <span>Registration</span>
            </div>
        </div>
    )
}

export default Login;
