import React from 'react';
import {CardType} from '../../api/API';
import style from '../styles/LearnPage.module.css'

type LearnPagePropsType = {
    title: string
    cards: Array<CardType>
    packId: string
    cardId: string
    grade: number
}

function LearnPage(props: LearnPagePropsType) {
    console.log('LearnPage called')

    return (
        <div>
            <h1>Pack name</h1>
            <h2>Card №1</h2>
            <div>
                <span>Question</span>
                <div>
                    <button>Не знал</button>
                    <button>Забыл</button>
                    <button>Долго думал</button>
                    <button>Перепутал</button>
                    <button>Знал</button>
                </div>
            </div>
            <button>Next</button>
        </div>
    )
}

export default LearnPage;
