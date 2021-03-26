import React, {useState} from 'react';
import ModalInput from './ModalInput';


// export type AnswerType = { answer: string, value1?: string, value2?: string }

export type ModalInputContainerPropsType = {
    buttonTitle?: string
    modalText?: string
    defaultAnswer?: string
    // answerCallback?: (answer: string[]) => void;
    answerCallback?: (answer: {
        answer: string,
        value1: string,
        value2: string
    }) => void;
    inputsCount?: 1 | 2 | 3
}

function ModalInputContainer(props: ModalInputContainerPropsType) {
    const [show, setShow] = useState(false);
    const [answer, setAnswer] = useState(props.defaultAnswer || 'test answer');

    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');


    const setAnswerHandler = (value: string) => {
        setAnswer(value)
        props.answerCallback && props.answerCallback({
            answer: value,
            value1,
            value2
        })
    }

    const modalInputProps: any = {
        show: show,
        close: () => setShow(false),
        modalText: props.modalText,
        answer: answer,
        setAnswer: setAnswerHandler,
        enableBackground: true,
        backgroundOnClick: () => setShow(false),
        width: 300,
        height: 200,
    }

    if (props.inputsCount === 3) {
        modalInputProps.inputData = [[value1, setValue1], [value2, setValue2]]
    } else if (props.inputsCount === 2) {
        modalInputProps.inputData = [[value1, setValue1]]
    }

    return (
        <>
            <div>
                <button onClick={() => setShow(true)}>{props.buttonTitle || 'Modal Input'}</button>
                {answer}{value1 && `-${value1}`}{value2 && `-${value2}`}
                {/*{answer}-{value1}-{value2}*/}
                {/*{answer}*/}
            </div>
            <ModalInput {...modalInputProps}>
            </ModalInput>
        </>
    );
}

export default ModalInputContainer;