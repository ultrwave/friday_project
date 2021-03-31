import React, {CSSProperties, ReactChildren, ReactElement, ReactNode, useState} from 'react';
import Modal from "../Modal";
// import InputMap, {IInputData} from "./InputMap";

// export type AnswerType = { answer: string, value1?: string, value2?:string }
export type FieldType = {
    title?: string,
    value?: string
}
export type AnswersType = {
    field1: FieldType
    field2?: FieldType
    field3?: FieldType
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
        setAnswer(answerData);
        // saveInputs.f();
        setAnswerData({field1:{}, field2:{}, field3:{}});
        // setSaveInputs({
        //     f: () => {
        //     }
        // }); // unsubscribe
        close();
    };
    //console.log(answers.field1)

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
                    value={answerData.field1.value}
                    placeholder={answers.field1.title}
                    style={{...inputStyles}}
                    onChange={e => setAnswerData({
                        ...answerData,
                        field1: {...answerData.field1, value: e.currentTarget.value}
                    })}
                />
                {/*)}*/}
                {answers?.field2 && (
                    <input
                        value={answerData.field2?.value}
                        placeholder={answers.field2.title}
                        style={{...inputStyles}}
                        onChange={e => setAnswerData({
                            ...answerData,
                            field2: {...answerData.field2, value: e.currentTarget.value}
                        })}
                    />
                )}

                {answers?.field3 && (
                    <input
                        value={answerData.field3?.value}
                        placeholder={answers.field3.title}
                        style={{...inputStyles}}
                        onChange={e => setAnswerData({
                            ...answerData,
                            field3: {...answerData.field3, value: e.currentTarget.value}
                        })}
                    />
                )}

            </div>
            <button onClick={successCloseModal} style={{...buttonStyles}}>{button}</button>
        </Modal>
    );
}

export default ModalInput2;