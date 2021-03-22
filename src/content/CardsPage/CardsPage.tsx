import React from 'react';
import style from '../styles/CardsPage.module.css'
import {CardType} from '../../api/API';
import CardItem from './CardItem';
import SearchContainer from '../../common/Search/SearchContainer';
import PaginationContainer from '../../common/Pagination/PaginationContainer';
import {useSelector} from 'react-redux';
import {RootStateType} from '../../redux/store';

type PacksPagePropsType = {
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

    const filter = useSelector((state: RootStateType): string => state.filterState.nameFilter)
    const pack = useSelector((state: RootStateType) => state.packsPage.packs.find(p => p._id === props.packId))
    const title = pack? pack.name : 'Pack'

    const cards = props.cards.filter(c => filter? c.question.includes(filter) : true)
        .map(c => {
        return <CardItem {...c}
                         key={c._id}
                         deleteCallback={() => props.deleteCard(props.packId, c._id)}
                         updateCallback={() => props.updateCard(props.packId, c._id)}
        />
    })

    return (
        <div className={style.packsPageWrapper}>
            <h1 style={{alignSelf: 'center'}}>{title}</h1>
            <div style={{display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%'}}>
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
