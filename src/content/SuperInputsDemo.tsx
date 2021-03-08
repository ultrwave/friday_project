import React, { useState} from 'react';
import SuperButton from "../common/SuperButton/SuperButton";
import SuperInputText from "../common/SuperInputText/SuperInputText";
import SuperCheckbox from "../common/SuperCheckbox/SuperCheckbox";
import s from './styles/Registration.module.css'

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
        <>

            <div>
                SuperInputs Demo
            </div>
            <div>
                <SuperInputText
                    value={text}
                    onChangeText={setText}
                    onEnter={showAlert}
                    error={error}
                    className={s.green} // проверьте, рабоет ли смешивание классов
                    />

                <SuperButton
                    red={text===''} // пропсу с булевым значением не обязательно указывать true
                    onClick={showAlert}
                >
                    Button {/*// название кнопки попадёт в children*/}
                </SuperButton>

                <SuperCheckbox checked={checked} onChangeChecked={setChecked}>
                    CheckboxText {/*// этот текст попадёт в children*/}
                </SuperCheckbox>
            </div>
        </>
    )
}

export default SuperInputsDemo;
