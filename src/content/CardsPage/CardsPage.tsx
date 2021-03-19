import React from 'react';
import style from '../styles/CardsPage.module.css'
import {CardType} from '../../api/authAPI';
import CardItem from './CardItem';

type PacksPagePropsType = {
    cards: Array<CardType>
    packTitle: string
    packId: string
    itemsPerPage: number
    totalCardsCount: number
    currentPage: number
    createCard(packId: string): void // fix args
    deleteCard(packId: string, cardId: string): void
    updateCard(packId: string, cardId: string): void
    onPageChange(page: number): void
}

export type AddCardFormStateType = {
    value: string
    error: string
    hide: boolean
    touched: boolean
}

function CardsPage(props: PacksPagePropsType) {
    console.log('CardsPage called')

    const cards = props.cards.map(c => {
        return <CardItem {...c}
                         key={c._id}
                         deleteCallback={() => props.deleteCard(props.packId, c._id)}
                         updateCallback={() => props.updateCard(props.packId, c._id)}
        />
    })

    return (
        <div className={style.packsPageWrapper}>
            <h1 style={{alignSelf: 'center'}}>Pack Name</h1>
            <div className={style.table}>
                <div className={style.tableHeader}>
                    <div style={{width: '15%'}}>Question</div>
                    <div style={{width: '10%'}}>Answer</div>
                    <div style={{width: '15%'}}>Grade</div>
                    <div style={{width: '10%'}}>Updated</div>
                    <div style={{width: '10%'}}>Created</div>
                    <div style={{width: '15%'}}>
                        <button onClick={() => props.createCard(props.packId)}>New card</button>
                    </div>
                    <div style={{width: '25%'}}/>
                </div>
                <ul>
                    {cards}
                </ul>
            </div>
        </div>
    )
}

export default CardsPage;
