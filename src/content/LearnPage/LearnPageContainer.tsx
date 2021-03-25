import React, {useEffect, useState} from 'react';
import LearnPage from './LearnPage';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../../redux/store';
import {Redirect, useParams} from 'react-router-dom';
import {createCardTC, deleteCardTC, getCardsTC, updateCardTC} from '../../redux/cards-reducer';
import {setGradeAC} from '../../redux/learn-reducer';

type ParamsType = {
    id: string | undefined
    title: string | undefined
}

function LearnPageContainer() {
    console.log('LearnPageContainer called')

    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state: RootStateType): boolean => state.auth.isLoggedIn)

    const params: ParamsType = useParams()
    const title = params.title ? params.title : 'Pack'
    const packId = params.id ? params.id : ''

    console.log(params)

    useEffect(() => {
        dispatch(getCardsTC(packId))
    }, [dispatch, packId])

    const cards = useSelector((state: RootStateType) => state.cardsPage.cards)
    const cardId = useSelector((state: RootStateType): string => state.learnPage.cardId)
    const grade = useSelector((state: RootStateType): number => state.learnPage.grade)

    let [index, setIndex] = useState(0)
    let card = cards[index]

    const setGrade = (grade: number) => {
        dispatch(setGradeAC(grade))
    }

    const getNextCard = () => setIndex(i => index + 1 >= cards.length? 0 : i + 1)

    return (
        <LearnPage title={title}
                   card={card}
                   index={index + 1}
                   amount={cards.length}
                   cardId={cardId}
                   grade={grade}
                   getNextCard={getNextCard}
                   setGrade={setGrade}
        />
    )
}

export default LearnPageContainer;
