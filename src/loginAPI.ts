import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:7542/2.0/',
    headers: {

    }
})

export const loginAPI = {
    login(email: string, password: string, rememberMe: boolean = false) {
        return instance.post('/auth/login', {email, password, rememberMe})
            .then(response => response)
    },
    registerUser(email:string,password:string) {
        return  instance.post('/auth/register', {'email':email,'password':password})
    },
}