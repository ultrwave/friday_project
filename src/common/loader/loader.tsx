import React, {useEffect, useState} from 'react'
import style from './loader.module.css'
import loader from './loader.svg'
import {useSelector} from 'react-redux';
import {RootStateType} from '../../redux/store';

type LoaderPropsType = {
}

export function Loader(props: LoaderPropsType) {

    const fadeOut = useSelector((state: RootStateType) => state.appState.status)

    return (
        <div className={`${style.dimScreen} ${fadeOut === 'idle' && style.hideLoader}`}>
            <img className={style.loader}
                 src={loader}
                 alt="Loading..."/>
        </div>
    )
}
