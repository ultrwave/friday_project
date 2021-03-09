import axios from 'axios';
import {useEffect, useState} from "react";
import React from 'react'

const instance = axios.create({
    withCredentials: true,
    baseURL: '',
    headers: {

    }
})

type TodolistType = {
    id: string
    order: string
    addedDate: string
    title: string
}


type BaseResponseType<D = {}> = {  // D - как бы переменная, которую мы подставляем к data, а после знака равно - значение по-умолчанию
    resultCode: number
    fieldsErrors: Array<string>
    messages: Array<string>
    data: D
}

// type GetTasksResponse = {
//     error: string | null
//     totalCount: number
//     items: TaskType[]
// }


export const LoginAPI = {
    registerUser(email:string,password:string) {
        // debugger
           return  instance.post('http://localhost:7542/2.0/auth/register', {'email':email,'password':password})
           // return  instance.post<BaseResponseType>('http://localhost:7542/2.0/auth/register', {email:email,password:password})
    },
}


