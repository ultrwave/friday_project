import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:7542/2.0/',
    headers: {

    }
})

export const authAPI = {
    login(email: string, password: string, rememberMe: boolean = false) {
        return instance.post('/auth/login', {email, password, rememberMe})
            .then(response => response)
    },
    forgot(email: string, from: string, message: string) {
        return instance.post('/auth/forgot', {email, from, message})
            .then(response => response)
    },
    me(){
        return instance.post('/auth/me', {})
            .then(response => response)
    }
}