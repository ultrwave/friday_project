import React from 'react';
import {NavLink} from 'react-router-dom';
import style from '../styles/PacksPage.module.css'
import {CardType} from '../../api/authAPI';
import {useSelector} from 'react-redux';
import {RootStateType} from '../../redux/store';

type CardItemPropsType = {
    deleteCallback(): void
    updateCallback(): void
}

function CardItem(props: CardType & CardItemPropsType) {

    const myId = useSelector((state: RootStateType) => state.auth.profile?._id)
    const itemIsMine = props.user_id === myId

    const updated = new Date(props.updated)
        .toLocaleDateString("en-UE", {hour12: false, hour: 'numeric', minute: 'numeric'});

    const created = new Date(props.created)
        .toLocaleDateString("en-UE", {hour12: false, hour: 'numeric', minute: 'numeric'});

    return (
        <li>
            <div className={`${style.packItem}${itemIsMine? '' : (' ' + style.itemIsNotMine)}`}>
                <div style={{width: '15%'}}>{props.question}</div>
                <div style={{width: '10%'}}>{props.answer}</div>
                <div style={{width: '15%'}}>
                    {Math.round((props.grade + Number.EPSILON) * 100) / 100}</div>
                <div style={{width: '10%', fontSize: '12px'}}>{updated}</div>
                <div style={{width: '10%', fontSize: '12px'}}>{created}</div>
                <div style={{width: '15%'}}>
                    <button disabled={!itemIsMine}
                            onClick={props.deleteCallback}>Delete</button>
                    <button style={{marginLeft: '5px'}}
                            disabled={!itemIsMine}
                            onClick={props.updateCallback}>Update</button>
                </div>
                <div style={{width: '25%'}}/>
            </div>
        </li>
    )
}

export default CardItem;
