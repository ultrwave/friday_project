import React from 'react';
import style from '../styles/CardsPage.module.css'
import {CardType} from '../../api/API';
import CardItem from './CardItem';
import SearchContainer from '../../common/SearchComponent/SearchContainer';
import PaginationContainer from '../../common/Pagination/PaginationContainer';
import {useSelector} from 'react-redux';
import {RootStateType} from '../../redux/store';
import {useParams} from 'react-router-dom';

type PacksPagePropsType = {
    title: string
    cards: Array<CardType>
    packId: string
    totalCardsCount: number
    createCard(packId: string): void // fix args
    deleteCard(packId: string, cardId: string): void
    updateCard(packId: string, cardId: string): void
}

export type AddCardFormStateType = {
    value: string
    error: string
    hide: boolean
    touched: boolean
}

function CardsPage(props: PacksPagePropsType) {
    console.log('CardsPage called')

    const filter = useSelector((state: RootStateType): string => state.searchValue.searchValue)

    const cards = props.cards.filter(c => filter? c.question.includes(filter) : true)
        .map(c => {
        return <CardItem {...c}
                         key={c._id}
                         deleteCallback={() => props.deleteCard(props.packId, c._id)}
                         updateCallback={() => props.updateCard(props.packId, c._id)}
        />
    })

    return (
        <div className={style.cardsPageWrapper}>
            <h1 className={style.pageTitle}>{props.title}</h1>
            <div className={style.controlsContainer}>
                <div style={{alignSelf: 'flex-start', marginBottom: '5px'}}>
                    <SearchContainer/>
                </div>
                <div style={{alignSelf: 'flex-end', marginBottom: '5px'}}>
                    <PaginationContainer totalItems={props.totalCardsCount}/>
                </div>
            </div>
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
