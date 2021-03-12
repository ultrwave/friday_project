import React from 'react';
import style from '../styles/Recover.module.css'

type RecoverTimerPropsType = {
    getTime(): number
    showTimer(show: boolean): void
}

type RecoverTimerStateType = {
    timeMs: number
}

class RecoverTimer extends React.Component<RecoverTimerPropsType, RecoverTimerStateType> {

    timerID: any

    constructor(props: RecoverTimerPropsType) {
        super(props);
        this.state = {timeMs: this.props.getTime()};
    }

    componentDidMount() {
        console.log('RecoverTimer called')
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    convertMsToTime(ms: number) {
        let minutes = Math.floor(ms / 60000);
        let seconds = ((ms % 60000) / 1000);
        return minutes + ':' + (seconds < 10 ? '0' : '') + Math.floor(seconds)
    }

    tick() {
        if (this.props.getTime() < 0) {
            clearInterval(this.timerID)
            this.props.showTimer(false)
        } else {
            this.setState({timeMs: this.props.getTime()})
        }
    };

    time() {
        return this.state.timeMs > 0 ? this.convertMsToTime(this.state.timeMs) : '...'
    }

    render() {
        return (
                <span className={style.timer}>
                {`Time till next link: ${this.time()}`}
                </span>
        )
    }
}


export default RecoverTimer;

