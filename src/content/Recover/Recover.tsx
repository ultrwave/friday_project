import React, {useState} from 'react';
import style from '../styles/Recover.module.css'
import SuperInputText from '../../common/SuperInputText/SuperInputText';
import {NavLink} from 'react-router-dom';
import SuperButton from '../../common/SuperButton/SuperButton';
import {RecoverFormStateType} from './RecoverContainer';
import RecoverTimer from './RecoverTimer';

type RecoverPropsType = {
    formState: RecoverFormStateType
    getTime(): number
    onChangeHandler(value: string): void
    onBlurHandler(e: React.FocusEvent<HTMLInputElement>): void
    onSubmitHandler(email: string): void
}

const Recover = ({formState, onChangeHandler, onBlurHandler, onSubmitHandler, getTime}: RecoverPropsType) => {

    console.log('Recover called')

    let [timerIsActive, showTimer] = useState(true)

    const submitForm = () => {
        onSubmitHandler(formState.value)
        showTimer(true)
    }

    return (
        <form className={style.form}>
            <h1>Recover</h1>
            <SuperInputText
                value={formState.value}
                error={formState.error}
                onChangeText={onChangeHandler}
                onBlur={onBlurHandler}
                placeholder={'Email'}
            />
            <div className={style.timerContainer}>
                {timerIsActive
                    ? <RecoverTimer getTime={getTime} showTimer={showTimer}/>
                    : <SuperButton disabled={!!formState.error} onClick={submitForm}>Send</SuperButton>
                }
            </div>
            <NavLink to={'/login'}><span>Login page</span></NavLink>
        </form>
    )
}

export default Recover;
