import React, {CSSProperties, ReactChildren, ReactElement, ReactNode, useState} from 'react';
import Modal from "../Modal";
import InputMap, {IInputData} from "./InputMap";

export type ModalInputPropsType = {
    show: boolean;
    close: () => void;

    inputData?: IInputData[];
    modalText?: string
    buttonTitle?: string
    answer?: string;
    setAnswer?: (answer: string) => void;

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

function ModalInput({
                        inputData,
                        modalText,
                        // modalButtonTitle,
                        answer,
                        setAnswer = (answer: string) => {
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
    const [answerData, setAnswerData] = useState(answer);
    const [saveInputs, setSaveInputs] = useState({
        f: () => {
        }
    })

    const successCloseModal = () => {
        saveInputs.f();
        setAnswer(answerData || '');
        setSaveInputs({
            f: () => {
            }
        }); // unsubscribe
        close();
    };

    return (
        <Modal
            enableBackground={enableBackground}
            backgroundOnClick={() => {
                setAnswerData(answer);
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
                {answer !== undefined && (
                    <input
                        value={answerData}
                        style={{...inputStyles}}
                        onChange={e => setAnswerData(e.currentTarget.value)}
                    />
                )}
                <InputMap
                    inputData={inputData}
                    setSaveInputs={setSaveInputs} // subscribe

                    inputStyles={inputStyles}
                />

            </div>
            <button onClick={successCloseModal} style={{...buttonStyles}}>{button}</button>
        </Modal>
    );
}

export default ModalInput;