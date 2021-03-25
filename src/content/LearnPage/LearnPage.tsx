import React, {useEffect, useState} from 'react';
import {CardType} from '../../api/API';
import style from '../styles/LearnPage.module.css'

type LearnPagePropsType = {
    title: string
    card?: CardType
    amount: number
    index: number
    cardId: string
    grade: number
    getNextCard(): void
    setGrade(grade: number): void
}

function LearnPage(props: LearnPagePropsType) {
    console.log('LearnPage called')

    let [show, setShow] = useState(false)

    useEffect(()=> {
        setShow(false)
    }, [props.index])

    const showHandler = () => setShow(!show)

    return (
        <div>
            <h1>{props.title}</h1>
            <h2>{props.card ? `${props.index}/${props.amount}` : 'Pack is empty'}</h2>
            {props.card &&
            <div>
                <span>{props.card.question}</span>
                {show
                    ? <div>
                        <button>Не знал</button>
                        <button>Забыл</button>
                        <button>Долго думал</button>
                        <button>Перепутал</button>
                        <button>Знал</button>
                    </div>
                    : <button onClick={showHandler}>Check</button>
                }
                <button onClick={props.getNextCard}>Next</button>
            </div>
            }
        </div>
    )
}

export default LearnPage;
