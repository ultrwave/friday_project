import axios from 'axios';
import {GetPacksParamsType} from '../redux/packs-reducer';
import {GetCardsParamsType} from '../redux/cards-reducer';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:7542/2.0/',
    // baseURL: 'https://neko-back.herokuapp.com/2.0',
    headers: {}
})

export const API = {
    me() {
        return instance.post('/auth/me')
            .then(response => response.data)
    },
    login(email: string, password: string, rememberMe: boolean = false) {
        return instance.post('/auth/login', {email, password, rememberMe})
            .then(response => response.data)
    },
    logout() {
        return instance.delete('/auth/me')
    },
    forgot(email: string, from: string, message: string) {
        return instance.post('/auth/forgot', {email, from, message})
    },
    setNewPassword(password: string, resetPasswordToken: string) {
        return instance.post('/auth/set-new-password', {password, resetPasswordToken})
    },
    registration(email: string, password: string) {
        return instance.post('/auth/register', {email, password})
    },
}

export const packsAPI = {
    getPacks(params: GetPacksParamsType) {
        return instance.get('/cards/pack', {params})
            .then(response => response.data)
    },
    createPack(name: string) {
        return instance.post('/cards/pack', {cardsPack: {name}})
    },
    deletePack(id: string) {
        return instance.delete(`/cards/pack?id=${id}`)
    },
    updatePack(id: string, newName: string) {
        return instance.put('/cards/pack', {cardsPack: {_id: id, name: newName}})
    }
}

export const cardsAPI = {
    getCards(id: string, params: GetCardsParamsType) { // todo - fix params
        return instance.get(`/cards/card?cardsPack_id=${id}`, {params})
            .then(response => response.data)
    },
    createCard(data: CreateCardType) {
        return instance.post('/cards/card', {card: data})
    },
    deleteCard(id: string) {
        return instance.delete(`/cards/card?id=${id}`)
    },
    updateCard(id: string) {
        return instance.put('/cards/card', {card: {_id: id, question: 'updated'}})
    },
    sendGrade(card_id: string, grade: number) {
        return instance.put('/cards/grade', {card_id, grade})
            .then(response => response.data.updatedGrade)
        return instance.put('/cards/card', {card: {_id: card_id, question: 'updated'}})
    }
}


export type GetPacksResponseType = {
    _id: string
    user_id: string
    user_name: string
    name: string
    path: string // папка
    cardsCount: number
    grade: number // средняя оценка карточек
    shots: number // количество попыток
    rating: number // лайки
    type: 'pack' // ещё будет "folder" (папка)
    created: string
    updated: string
}

export type CreatePackType = { // todo - оранж поля?
    name?: string // если не отправить будет таким
    path?: string // если не отправить будет такой
    grade?: number // не обязателен
    shots?: number // не обязателен
    rating?: number // не обязателен
    deckCover?: string // не обязателен
    private?: boolean // если не отправить будет такой
    type?: string // если не отправить будет таким
}

export type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    rating: number
    shots: number
    type: string
    user_id: string
    created: string
    updated: string
    __v: number
    _id: string
}

export type CreateCardType = {
    answer?: string // если не отправить будет таким
    question?: string // если не отправить будет таким
    cardsPack_id?: string
    grade?: number // 0..5, не обязателен
    rating?: number // не обязателен
    shots?: number // не обязателен
    type?: string // если не отправить будет таким
    answerImg?: string // не обязателен
    questionImg?: string // не обязателен
    questionVideo?: string // не обязателен
    answerVideo?: string // не обязателен
}

export type CardsResponseType = {
    cards: CardType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}