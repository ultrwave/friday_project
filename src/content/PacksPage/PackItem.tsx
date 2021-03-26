import React, {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import style from '../styles/PacksPage.module.css'
import {GetPacksResponseType} from '../../api/API';
import {useSelector} from 'react-redux';
import {RootStateType} from '../../redux/store';

type PackItemPropsType = {
    deleteCallback(): void
    updateCallback(): void
}

function PackItem(props: GetPacksResponseType & PackItemPropsType) {

    const myId = useSelector((state: RootStateType) => state.auth.profile?._id)
    const itemIsMine = props.user_id === myId

    let [delay, setDelay] = useState(true)

    useEffect(()=> {
        setDelay(false)
    },[delay])

    const updated = new Date(props.updated)
        .toLocaleDateString("en-UE", {hour12: false, hour: 'numeric', minute: 'numeric'});

    const created = new Date(props.created)
        .toLocaleDateString("en-UE", {hour12: false, hour: 'numeric', minute: 'numeric'});

    return (
        <li style={delay? {} : {opacity: '1.0'}}>
            <div className={`${style.packItem}${itemIsMine? '' : (' ' + style.itemIsNotMine)}`}>
                <div style={{width: '15%'}}>{props.name}</div>
                <div style={{width: '10%'}}>{props.cardsCount}</div>
                <div style={{width: '20%', fontSize: '12px', color: 'gray'}}>{props.user_name}</div>
                <div style={{width: '10%', fontSize: '12px', paddingLeft: '12px'}}>{updated}</div>
                <div style={{width: '10%', fontSize: '12px', paddingLeft: '12px'}}>{created}</div>
                <div style={{width: '15%'}}>
                    <button disabled={!itemIsMine}
                            onClick={props.deleteCallback}>Delete</button>
                    <button style={{marginLeft: '5px'}}
                            disabled={!itemIsMine}
                            onClick={props.updateCallback}>Update</button>
                </div>
                <div style={{width: '5%'}}>
                    <NavLink to={`/cards/${props._id}/${encodeURI(props.name)}`}>cards</NavLink>
                </div>
                <div style={{width: '5%'}}>
                    <NavLink to={`/learn/${props._id}/${encodeURI(props.name)}/${itemIsMine? 1 : 0}`}>learn</NavLink>
                </div>
            </div>
        </li>
    )
}

export default PackItem;
