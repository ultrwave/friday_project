import React, {useEffect, useState} from 'react';
import style from '../styles/Recover.module.css'

type RecoverTimerPropsType = {
    getTime(): number
    hideTimer(show: boolean): void
}

function RecoverTimer({getTime, hideTimer}: RecoverTimerPropsType) {
    console.log('RecoverTimer called')

    let [timeMs, setTimeMs] = useState(getTime())

    const tick = () => {
        setTimeMs(getTime())
        if (getTime() < 0) hideTimer(false)
    }

    const convertMsToTime = (ms: number) => {
        let minutes = Math.floor(ms / 60000);
        let seconds = ((ms % 60000) / 1000);
        return minutes + ':' + (seconds < 10 ? '0' : '') + Math.floor(seconds)
    }

    const timerID: any = setInterval(() => tick(), 1000);

    useEffect(() => {

        return () => {
            clearInterval(timerID);
            (new AbortController().abort())
        }
    })

    return (
        <span className={style.timer}>
                {`Time till next link: ${convertMsToTime(timeMs)}`}
            </span>
    )
}

export default RecoverTimer;