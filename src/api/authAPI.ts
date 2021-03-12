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