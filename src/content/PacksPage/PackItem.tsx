import React, {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import style from '../styles/PacksPage.module.css'
import {GetPacksResponseType} from '../../api/AuthAPI';
import {useSelector} from 'react-redux';
import {RootStateType} from '../../redux/store';
import ModalQuestionContainer from '../../common/modals/question/ModalQuestionContainer';
import ModalInputContainer2 from '../../common/modals/input2/ModalInputContainer2';
import {AnswersType} from "../../common/modals/input2/ModalInput2";

type PackItemPropsType = {
    deleteCallback(): void
    updateCallback(name: string): void
}

function PackItem(props: GetPacksResponseType & PackItemPropsType) {

    const myId = useSelector((state: RootStateType) => state.auth.profile?._id)
    const itemIsMine = props.user_id === myId

    let [delay, setDelay] = useState(true)

    useEffect(() => {
        const timerId = setTimeout(() => setDelay(false), 100)
    }, [delay])

    const updated = new Date(props.updated)
        .toLocaleDateString('en-UE', {hour12: false, hour: 'numeric', minute: 'numeric'});

    const created = new Date(props.updated).toLocaleString().split(',')[0]

    const deleteHandler = (answer: boolean) => {
        if (answer) {
            props.deleteCallback()
        }
    }

    const inputHandler = (value: AnswersType) => {
        props.updateCallback(value.field1.value || 'Updated pack')
    }

    return (
        <li style={delay ? {} : {opacity: '1.0'}}>
            <div className={`${style.packItem}${itemIsMine ? '' : (' ' + style.itemIsNotMine)}`}>
                <div style={{width: '20%'}}>{props.name}</div>
                <div style={{width: '15%'}}>{props.cardsCount}</div>
                <div style={{width: '10%', fontSize: '12px', color: 'gray'}}>{props.user_name}</div>
                <div style={{width: '15%', fontSize: '12px'}}>{updated}</div>
                <div style={{width: '15%', fontSize: '12px'}}>{created}</div>
                <div style={{width: '15%', display: 'flex', flexDirection: 'row'}}>
                    <ModalQuestionContainer buttonTitle={'Delete'}
                                            modalText={'Delete pack?'}
                                            isMine={itemIsMine}
                                            answerCallback={deleteHandler}/>
                    <ModalInputContainer2 buttonTitle={'Update'}
                                          modalText={'Enter new name'}
                                          isMine={itemIsMine}
                                          defaultAnswers={{
                                              field1: {title: 'Pack Name', value: props.name},
                                              // field2: {},
                                              // field3: {}
                                          }}
                                          answerCallback={inputHandler}
                    />
                </div>
                <div style={{width: '5%'}}>
                    <NavLink to={`/cards/${props._id}/${encodeURI(props.name)}`}>cards</NavLink>
                </div>
                <div style={{width: '5%'}}>
                    <NavLink
                        to={`/learn/${props._id}/${props.name}/${itemIsMine ? 1 : 0}`}>learn</NavLink>
                </div>
            </div>
        </li>
    )
}

export default PackItem;
