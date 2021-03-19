import React, {useEffect} from 'react';
import CardsPage from './CardsPage';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../../redux/store';
import {Redirect, useParams} from 'react-router-dom';
import {createCardTC, deleteCardTC, getCardsTC, updateCardTC} from '../../redux/cards-reducer';

type ParamsType = {
    id: string | undefined
}

function CardsPageContainer() {
    console.log('CardsPageContainer called')

    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state: RootStateType): boolean => state.auth.isLoggedIn)

    const params: ParamsType = useParams()
    const packId = params.id ? params.id : ''

    useEffect(() => {
        dispatch(getCardsTC(packId))
    }, [dispatch, packId])

    const cards = useSelector((state: RootStateType) => state.cardsPage.cards)
    const totalCardsCount = useSelector((state: RootStateType) => state.cardsPage.totalCardsCount)
    const itemsPerPage = useSelector((state: RootStateType) => state.cardsPage.itemsPerPage)
    const currentPage = useSelector((state: RootStateType) => state.cardsPage.currentPage)
    const packTitle = useSelector((state: RootStateType) => state.cardsPage.packTitle)

    const pagesCount = Math.ceil(totalCardsCount / itemsPerPage)

    const pages = [];
    for (let i = 1; i <= pagesCount; i++) pages.push(i)

    const createCard = (id: string) => { // fix args
        dispatch(createCardTC(id))
    }

    const deleteCard = (packId: string, cardId: string) => {
        dispatch(deleteCardTC(packId, cardId))
    }

    const updateCard = (packId: string, cardId: string) => {
        dispatch(updateCardTC(packId, cardId))
    }

    return (
        !isLoggedIn
            ? <Redirect to={'/login'}/>
            : <CardsPage
                cards={cards}
                packId={packId}
                packTitle={packTitle}
                createCard={createCard}
                deleteCard={deleteCard}
                updateCard={updateCard}
                itemsPerPage={itemsPerPage}
                totalCardsCount={totalCardsCount}
                currentPage={currentPage}
                onPageChange={a => a}
            />
    )
}

export default CardsPageContainer;
