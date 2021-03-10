import axios from 'axios';
import {useEffect, useState} from "react";
import React from 'react'

const instance = axios.create({
    withCredentials: true,
    baseURL: '',
    headers: {

    }
})

export const LoginAPI = {
    registerUser(email:string,password:string) {
           return  instance.post('http://localhost:7542/2.0/auth/register', {'email':email,'password':password})
    },
}


