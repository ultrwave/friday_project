import React, {useEffect} from 'react';
import LearnPage from './LearnPage';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../../redux/store';
import {Redirect, useParams} from 'react-router-dom';
import {createCardTC, deleteCardTC, getCardsTC, updateCardTC} from '../../redux/cards-reducer';

type ParamsType = {
    id: string | undefined
    title: string | undefined
}

function LearnPageContainer() {
    console.log('LearnPageContainer called')

    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state: RootStateType): boolean => state.auth.isLoggedIn)
    const cardId = useSelector((state: RootStateType): string => state.learnPage.cardId)
    const grade = useSelector((state: RootStateType): number => state.learnPage.grade)


    const params: ParamsType = useParams()
    const packId = params.id ? params.id : ''
    const title = params.title ? params.title : 'Pack'

    useEffect(() => {
        dispatch(getCardsTC(packId))
    }, [dispatch, packId])

    const cards = useSelector((state: RootStateType) => state.cardsPage.cards)

    return (
        <LearnPage title={title}
                   cards={cards}
                   packId={packId}
                   cardId={cardId}
                   grade={grade}
        />
    )
}

export default LearnPageContainer;
