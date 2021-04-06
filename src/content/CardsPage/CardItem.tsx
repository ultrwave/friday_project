import React, {useEffect, useState} from 'react';
import style from '../styles/CardsPage.module.css'
import {CardType} from '../../api/AuthAPI';
import {useSelector} from 'react-redux';
import {RootStateType} from '../../redux/store';
import ModalQuestionContainer from "../../common/modals/question/ModalQuestionContainer";
import ModalInputContainer2 from "../../common/modals/input2/ModalInputContainer2";
import {AnswersType} from "../../common/modals/input2/ModalInput2";

type CardItemPropsType = {
    deleteCallback(): void
    updateCallback(question: string, answer: string): void
}

function CardItem(props: CardType & CardItemPropsType) {

    const myId = useSelector((state: RootStateType) => state.auth.profile?._id)
    const itemIsMine = props.user_id === myId

    let [delay, setDelay] = useState(true)

    useEffect(() => {
        const timerId = setTimeout(() => setDelay(false), 100)
        return () => clearTimeout(timerId)
    }, [delay])

    const updated = new Date(props.updated)
        .toLocaleDateString("en-UE", {hour12: false, hour: 'numeric', minute: 'numeric'});

    const created = new Date(props.created)
        .toLocaleDateString("en-UE", {hour12: false, hour: 'numeric', minute: 'numeric'});

    const deleteHandler = (answer: boolean) => {
        if (answer) {
            props.deleteCallback()
        }
    }

    const inputHandler = (value: AnswersType) => {
        props.updateCallback(value.field1.value || 'Updated card', value.field2?.value || 'Empty answer')
    }

    return (
        <li style={delay ? {} : {opacity: '1.0'}}>
            <div className={`${style.cardItem}${itemIsMine ? '' : (' ' + style.itemIsNotMine)}`}>
                <div style={{width: '15%'}}>{props.question}</div>
                <div style={{width: '10%'}}>{props.answer}</div>
                <div style={{width: '15%'}}>
                    {Math.round((props.grade + Number.EPSILON) * 100) / 100}</div>
                <div style={{width: '10%', fontSize: '12px'}}>{updated}</div>
                <div style={{width: '10%', fontSize: '12px'}}>{created}</div>
                <div style={{width: '15%', display: 'flex', flexDirection: 'row'}}>
                    {/*<button disabled={!itemIsMine}*/}
                    {/*        onClick={props.deleteCallback}>Delete</button>*/}
                    <ModalQuestionContainer buttonTitle={'Delete'}
                        // modalText={'Delete card?'}
                                            isMine={itemIsMine}
                                            answerCallback={deleteHandler}>
                        <>
                            <div style={{fontSize: '2em'}}>{props.question}</div>
                            <div>Delete card?</div>
                        </>
                    </ModalQuestionContainer>
                    {/*<button style={{marginLeft: '5px'}}*/}
                    {/*        disabled={!itemIsMine}*/}
                    {/*        onClick={props.updateCallback}>Update*/}
                    {/*</button>*/}
                    <ModalInputContainer2 buttonTitle={'Update'}
                                          modalText={'Enter new name'}
                                          isMine={itemIsMine}
                                          defaultAnswers={{
                                              field1: {title: 'Question', value: props.question},
                                              field2: {title: 'Answer', value: props.answer},
                                              // field3: {}
                                          }}
                                          answerCallback={inputHandler}
                    />
                </div>
                <div style={{width: '25%'}}/>
            </div>
        </li>
    )
}

export default CardItem;
