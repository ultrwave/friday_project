import React from 'react'
import style from './loader.module.css'
import loader from './loader.svg'

export function Loader() {
    return (
        <div className={style.dimScreen}>
            <img className={style.loader}
                 src={loader}
                 alt="Loading..."/>
        </div>
    )
}
