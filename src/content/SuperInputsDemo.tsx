import React, {useState} from 'react';
import SuperButton from '../common/SuperButton/SuperButton';
import SuperInputText from '../common/SuperInputText/SuperInputText';
import SuperCheckbox from '../common/SuperCheckbox/SuperCheckbox';
import s from './styles/Registration.module.css'
import SearchContainer from "../common/Search/SearchContainer";
import PaginationContainer from "../common/Pagination/PaginationContainer";
import ModalContainer from "../common/modals/ModalContainer";
import ModalQuestionContainer from '../common/modals/question/ModalQuestionContainer';

type RegistrationPropsType = {
    error?: string
}

function SuperInputsDemo() {
    const [text, setText] = useState<string>("");
    const error = text ? "" : "Field can't be empty";

    const showAlert = () => {
        if (error) {
            alert("Введите текст");
        } else {
            alert(text); // если нет ошибки показать текст

        }
    };

    const [checked, setChecked] = useState<boolean>(false);
    // const testOnChange = (e: ChangeEvent<HTMLInputElement>) =>
    //     setChecked(e.currentTarget.checked);


    return (
        <div className={s.demoContainer}>
            <h1>
                SuperInputs Demo
            </h1>
            <div>
                <SuperInputText
                    value={text}
                    onChangeText={setText}
                    onEnter={showAlert}
                    error={error}
                    className={s.green} // проверьте, работает ли смешивание классов
                />

                <SuperButton
                    red={text === ''} // пропсу с булевым значением не обязательно указывать true
                    onClick={showAlert}
                >
                    Button {/*// название кнопки попадёт в children*/}
                </SuperButton>

                <SuperCheckbox checked={checked} onChangeChecked={setChecked}>
                    CheckboxText {/*// этот текст попадёт в children*/}
                </SuperCheckbox>
                <div>SearchComponent:
                    <div style={{'border': 'solid 1px black'}}><SearchContainer placeholder={'placeholder'}
                                                                                showOnlyMyPacksCheckbox/></div>
                </div>
                <div>Pagination:
                    <div style={{'border': 'solid 1px black'}}><PaginationContainer totalItems={50}/></div>
                </div>
                {/*<div>Sort:*/}
                {/*    <div style={{'border': 'solid 1px black'}}><SortContainer/></div>*/}
                {/*</div>*/}
                <ModalContainer modalText={'Simple Modal'} buttonText={'Close it!'}/>
                <ModalQuestionContainer isMine={true}/>
            </div>
        </div>
    )
}

export default SuperInputsDemo;
