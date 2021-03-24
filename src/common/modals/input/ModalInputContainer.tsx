import React, {useState} from 'react';
import ModalInput from './ModalInput';

export type ModalInputContainerPropsType = {
    buttonTitle?: string
    modalText?: string
    defaultAnswer?: string
    answerCallback?: (answer: string) => void;
    inputsCount?: 1 | 2 | 3


}

function ModalInputContainer(props: ModalInputContainerPropsType) {
    const [show, setShow] = useState(false);
    const [answer, setAnswer] = useState(props.defaultAnswer || 'test answer');

    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const setAnswerHandler = (value: string) => {
        setAnswer(value)
        // debugger
        props.answerCallback && props.answerCallback(value)
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

    if( props.inputsCount === 2){
        modalInputProps.inputData = [[value1, setValue1], [value2, setValue2]]
    } else if (props.inputsCount === 3) {
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
            <ModalInput
                {...modalInputProps}
                // show={show}
                // close={() => setShow(false)}
                // modalText={props.modalText}
                //
                // answer={answer}
                // setAnswer={setAnswerHandler}
                //
                // inputData={[[value1, setValue1], [value2, setValue2]]}
                //
                // enableBackground={true}
                // backgroundOnClick={() => setShow(false)}
                //
                // width={300}
                // height={200}
            >
            </ModalInput>
        </>
    );
}

export default ModalInputContainer;