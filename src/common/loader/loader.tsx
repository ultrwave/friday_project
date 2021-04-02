import React, {useEffect, useState} from 'react'
import style from './loader.module.css'
import loader from './loader.svg'

type LoaderPropsType = {
    status: boolean
}

export function Loader({status}: LoaderPropsType) {

    console.log(status)

    let [opacity, setOpacity] = useState({opacity: '0.4'})

    useEffect(() => {
        const id = setTimeout(() => setOpacity({opacity: '1.0'}), 10)
        return clearTimeout(id)
    }, [])

    return (
        <div className={`${style.dimScreen}`}
             style={opacity}>
            <img className={style.loader}
                 src={loader}
                 alt="Loading..."/>
        </div>
    )
}
