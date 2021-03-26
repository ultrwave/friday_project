import React, {useState} from 'react';
import ModalInput2, {AnswersType} from './ModalInput2';


// export type AnswerType = { answer: string, value1?: string, value2?: string }


export type ModalInputContainerPropsType = {
    buttonTitle?: string
    modalText?: string
    defaultAnswers: AnswersType
    // answerCallback?: (answer: string[]) => void;
    answerCallback?: (answers: AnswersType) => void;
    inputsCount?: 1 | 2 | 3
}

function ModalInputContainer2(props: ModalInputContainerPropsType) {
    // const {answer1, answer2, answer3} = props.defaultAnswers

    const [show, setShow] = useState(false);
    const [answers, setAnswers] = useState(props.defaultAnswers );

    // const [value1, setValue1] = useState('');
    // const [value2, setValue2] = useState('');


    const setAnswerHandler = ({answer1, answer2, answer3}: AnswersType) => {
        setAnswers({answer1, answer2, answer3})
        props.answerCallback && props.answerCallback({
            answer1,
            answer2,
            answer3
        })
    }

    const modalInputProps: any = {
        show: show,
        close: () => setShow(false),
        modalText: props.modalText,
        answers: answers,
        setAnswer: setAnswerHandler,
        enableBackground: true,
        backgroundOnClick: () => setShow(false),
        width: 300,
        height: 200,
    }

    // if (props.inputsCount === 3) {
    //     modalInputProps.inputData = [[value1, setValue1], [value2, setValue2]]
    // } else if (props.inputsCount === 2) {
    //     modalInputProps.inputData = [[value1, setValue1]]
    // }

    return (
        <>
            <div>
                <button onClick={() => setShow(true)}>{props.buttonTitle || 'Modal Input'}</button>
                {/*{answers.answer1}{`-${answers?.answer2}`}{`-${answers?.answer3}`}*/}
                {/*{answer}-{value1}-{value2}*/}
                {/*{answer}*/}
            </div>
            <ModalInput2 {...modalInputProps}>
            </ModalInput2>
        </>
    );
}

export default ModalInputContainer2;