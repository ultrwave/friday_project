import React, {CSSProperties, ReactChildren, ReactElement, ReactNode, useState} from 'react';
import Modal from "../Modal";
// import InputMap, {IInputData} from "./InputMap";

// export type AnswerType = { answer: string, value1?: string, value2?:string }
export type AnswersType = {
    answer1: string
    answer2?: string
    answer3?: string
}

export type ModalInputPropsType = {
    show: boolean;
    close: () => void;

    // inputData?: IInputData[];
    modalText?: string
    buttonTitle?: string
    answers: AnswersType;
    setAnswer?: (answers: AnswersType) => void;

    inputContainerStyles?: CSSProperties;
    inputStyles?: CSSProperties;
    buttonStyles?: CSSProperties;
    button?: ReactNode;

    enableBackground?: boolean;
    backgroundStyle?: CSSProperties;
    backgroundOnClick?: () => void;

    width: number;
    height: number;
    modalStyle?: CSSProperties;
    modalOnClick?: () => void;
    children?: string | ReactChildren | ReactElement | (string | ReactChildren | ReactElement)[];
}

function ModalInput2({
                         // inputData,
                         modalText,
                         // modalButtonTitle,
                         answers,
                         setAnswer = (answers) => {
                         },

                         inputContainerStyles,
                         inputStyles,
                         buttonStyles,
                         button = 'OK',

                         enableBackground,
                         backgroundStyle,
                         backgroundOnClick = () => {
                         },

                         width,
                         height,
                         modalStyle,
                         modalOnClick = () => {
                         },

                         show,
                         close,
                         children,
                     }: ModalInputPropsType) {
    const [answerData, setAnswerData] = useState(answers);
    const [saveInputs, setSaveInputs] = useState({
        f: () => {
        }
    })

    const successCloseModal = () => {
        saveInputs.f();
        // setAnswer(answerData || '');
        setAnswer(answerData);
        setSaveInputs({
            f: () => {
            }
        }); // unsubscribe
        close();
    };
    console.log(answers.answer1)

    return (
        <Modal
            enableBackground={enableBackground}
            backgroundOnClick={() => {
                setAnswerData(answers);
                backgroundOnClick()
            }}
            backgroundStyle={backgroundStyle}

            width={width}
            height={height}
            modalOnClick={modalOnClick}
            modalStyle={modalStyle}

            show={show}
        >
            {modalText || 'question modal'}
            {/*{children ? children : 'question Modal'}*/}
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    flexFlow: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    ...inputContainerStyles,
                }}
            >
                {/*{answers !== undefined && (*/}
                    <input
                        value={answerData.answer1}
                        style={{...inputStyles}}
                        onChange={e => setAnswerData({...answerData, answer1: e.currentTarget.value})}
                    />
                {/*)}*/}
                {answers?.answer2 && (
                    <input
                        value={answerData.answer2}
                        placeholder={answers.answer1}
                        style={{...inputStyles}}
                        onChange={e => setAnswerData({...answerData, answer2: e.currentTarget.value})}
                    />
                )}

                {answers?.answer3 && (
                    <input
                        value={answerData.answer3}
                        style={{...inputStyles}}
                        onChange={e => setAnswerData({...answerData, answer3: e.currentTarget.value})}
                    />
                )}

            </div>
            <button onClick={successCloseModal} style={{...buttonStyles}}>{button}</button>
        </Modal>
    );
}

export default ModalInput2;