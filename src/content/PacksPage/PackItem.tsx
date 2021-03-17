import React from 'react';
import {NavLink} from 'react-router-dom';
import style from '../styles/PacksPage.module.css'
import {GetPacksResponseType} from '../../api/authAPI';

type PackItemPropsType = {
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


function PackItem(props: GetPacksResponseType) { //todo - _id?
    return (
        <li key={props._id}>
            <div className={style.packItem}>
                <div style={{width: '15%'}}>{props.name}</div>
                <div style={{width: '15%'}}>{props.cardsCount}</div>
                <div style={{width: '15%'}}>{props.created}</div>
                <div style={{width: '10%'}}>...</div>
                <div style={{width: '15%'}}>
                    <button>Delete</button>
                    <button>Update</button>
                </div>
                <div style={{width: '30%'}}>
                    <NavLink to={'/profile'}>cards</NavLink>
                </div>
            </div>
        </li>
    )
}

export default PackItem;
