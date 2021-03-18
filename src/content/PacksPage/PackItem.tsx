import React from 'react';
import {NavLink} from 'react-router-dom';
import style from '../styles/PacksPage.module.css'
import {GetPacksResponseType} from '../../api/authAPI';
import {useSelector} from 'react-redux';
import {RootStateType} from '../../redux/store';

type PackItemPropsType = {
    deleteCallback(): void
    updateCallback(): void
}

function PackItem(props: GetPacksResponseType & PackItemPropsType) {

    const myId = useSelector((state: RootStateType) => state.auth.profile?._id)
    const itemIsMine = props.user_id === myId

    return (
        <li>
            <div className={`${style.packItem}${itemIsMine? '' : (' ' + style.itemIsNotMine)}`}>
                <div style={{width: '15%'}}>{props.name}</div>
                <div style={{width: '15%'}}>{props.cardsCount}</div>
                <div style={{width: '15%'}}>{props.created}</div>
                <div style={{width: '10%'}}>...</div>
                <div style={{width: '15%'}}>
                    <button disabled={!itemIsMine} onClick={props.deleteCallback}>Delete</button>
                    <button disabled={!itemIsMine} onClick={props.updateCallback}>Update</button>
                </div>
                <div style={{width: '30%'}}>
                    <NavLink to={'/profile'}>cards</NavLink>
                </div>
            </div>
        </li>
    )
}

export default PackItem;
