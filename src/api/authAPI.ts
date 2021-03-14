import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:7542/2.0/',
    // baseURL: 'https://neko-back.herokuapp.com/2.0',
    headers: {

    }
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
    registerUser(email:string,password:string) {
        return  instance.post('/auth/register', {email, password})
    },
}

export const packsAPI = {
    getPacks() {
        return instance.get('/cards/pack') //todo - params?
    },
    createPack(data: CreatePackType) {
      return instance.post('/cards/pack', data)
    },
    deletePack(id: string) {
        return instance.delete(`/cards/pack?id=${id}`)
    },
    updatePack(cardsPack: PackType) {
        return instance.put('/cards/pack', cardsPack)
    }
}


export type PackType = {
    _id: string,
    name?: string
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