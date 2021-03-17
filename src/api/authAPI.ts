import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:7542/2.0/',
    // baseURL: 'https://neko-back.herokuapp.com/2.0',
    headers: {}
})

export const authAPI = {
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
    registerUser(email: string, password: string) {
        return instance.post('/auth/register', {email, password})
    },
}

export const packsAPI = {
    getPacks() {
        return instance.get('/cards/pack') //todo - params?
            .then(response => response.data)
    },
    createPack(data: CreatePackType) {
        return instance.post('/cards/pack', data)
    },
    deletePack(id: string) {
        return instance.delete(`/cards/pack?id=${id}`)
    },
    updatePack(cardsPack: GetPacksResponseType) {
        return instance.put('/cards/pack', cardsPack)
    }
}

export const cardsAPI = {
    getCards() {
        return instance.get('/cards/card') //todo - params?
    },
    createCard(data: CreatePackType) {
        return instance.post('/cards/card', data)
    },
    deleteCard(id: string) {
        return instance.delete(`/cards/card?id=${id}`)
    },
    updateCard(cardsPack: GetPacksResponseType) {
        return instance.put('/cards/card', cardsPack)
    }
}


export type GetPacksResponseType = {
    _id: string
    user_id: string
    name: string
    path: string // папка
    cardsCount: number
    grade: number // средняя оценка карточек
    shots: number // количество попыток
    rating: number // лайки
    type: "pack" // ещё будет "folder" (папка)
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
    answer: string // если не отправить будет таким
    question: string // если не отправить будет таким
    cardsPack_id: string
    grade: number // 0..5, не обязателен
    rating: number // не обязателен
    shots: number // не обязателен
    type: string // если не отправить будет таким
    answerImg: string // не обязателен
    questionImg: string // не обязателен
    questionVideo: string // не обязателен
    answerVideo: string // не обязателен
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