import React, {useEffect, useState} from 'react';
import {CardType} from '../../api/API';
import style from '../styles/LearnPage.module.css'
import {useSelector} from 'react-redux';
import {RootStateType} from '../../redux/store';

type LearnPagePropsType = {
    title: string
    card: CardType
    amount: number
    index: number
    smartMode: boolean
    toggleMode(): void
    getNextCard(): void
    setGrade(card_id: string, grade: number): void
}

function LearnPage({title, card, amount, index, smartMode, toggleMode, getNextCard, setGrade}: LearnPagePropsType) {
    console.log('LearnPage called')

    const loading = useSelector((state: RootStateType):boolean => state.appState.status !== 'idle')

    let [show, setShow] = useState(false)
    let [answer, setAnswer] = useState(0)

    useEffect(() => {
        setShow(false)
        setAnswer(0)
    }, [index])

    const showHandler = () => setShow(!show)

    const answerHandler = (e: React.MouseEvent) => {
        const button = e.target as HTMLButtonElement
        setAnswer(+button.value)
        setGrade(card._id, +button.value)
    }

    return (
        <div className={style.pageContainer}>
            <h1>{title}</h1>
            <h2 className={style.modeTitle}
                onClick={toggleMode}>
                <span style={{marginRight: '5px'}}>Smart random is</span>
                <span style={{color: smartMode? 'CadetBlue' : 'Salmon'}}>{smartMode ? 'ON' : ' OFF'}</span>
            </h2>
            <h2 className={`${card ? style.cardsCount : style.packEmpty}
            ${!smartMode && index === amount ? style.lastCard : ''}`}>
                {card && !loading? `${index}/${amount}` : 'Pack is empty'}
            </h2>
            {card &&
            <div className={style.cardContainer}>
                <div className={style.card}>
                    <span className={style.question}>{card.question}</span>
                    {show
                        ? <div className={style.answerContainer}>
                            <span className={style.answer}>{card.answer}</span>
                            <div className={style.buttonsBlock}>
                                <button value={1} disabled={!!answer}
                                        className={`${style.answerButton}${(answer === 1)
                                            ? ' ' + style.highlightAnswer : ''}`}
                                        style={(answer === 1) ? {border: '2px solid Maroon'} : {}}
                                        onClick={answerHandler}>Не знал
                                </button>
                                <button value={2} disabled={!!answer}
                                        className={`${style.answerButton}${(answer === 2)
                                            ? ' ' + style.highlightAnswer : ''}`}
                                        style={(answer === 2) ? {border: '2px solid Salmon'} : {}}
                                        onClick={answerHandler}>Забыл
                                </button>
                                <button value={3} disabled={!!answer}
                                        className={`${style.answerButton}${(answer === 3)
                                            ? ' ' + style.highlightAnswer : ''}`}
                                        style={(answer === 3) ? {border: '2px solid Orange'} : {}}
                                        onClick={answerHandler}>Долго думал
                                </button>
                                <button value={4} disabled={!!answer}
                                        className={`${style.answerButton}${(answer === 4)
                                            ? ' ' + style.highlightAnswer : ''}`}
                                        style={(answer === 4) ? {border: '2px solid CadetBlue'} : {}}
                                        onClick={answerHandler}>Перепутал
                                </button>
                                <button value={5} disabled={!!answer}
                                        className={`${style.answerButton}${(answer === 5)
                                            ? ' ' + style.highlightAnswer : ''}`}
                                        style={(answer === 5) ? {border: '2px solid LimeGreen'} : {}}
                                        onClick={answerHandler}>Знал
                                </button>
                            </div>
                        </div>
                        : <button className={style.checkButton} onClick={showHandler}>Check</button>
                    }
                </div>
                {amount > 1 &&
                <button className={style.nextButton}
                        onClick={getNextCard}>
                    <span>Next</span>
                </button>
                }
            </div>
            }
        </div>
    )
}

export default LearnPage;
