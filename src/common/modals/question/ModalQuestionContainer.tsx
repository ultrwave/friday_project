import {useState} from "react";
import ModalQuestion from "./ModalQuestion";

export type ModalQuestionContainerPropsType = {
    buttonTitle?: string
    modalText?: string
    isMine: boolean
    answerCallback?: (answer: boolean) => void;
}

const ModalQuestionContainer = (
    {
        buttonTitle = 'ModalQuestion',
        modalText = 'Question text',
        answerCallback = () => {
        },
        isMine
    }: ModalQuestionContainerPropsType) => {

    const [show, setShow] = useState(false);
    const [answer, setAnswer] = useState(false);

    const setTrue = () => {
        setAnswer(true);
        setShow(false);
        answerCallback(true)

    };
    const setFalse = () => {
        setAnswer(false);
        setShow(false);
        answerCallback(false)
    };


    return (
        <>
            <div>
                <button onClick={() => setShow(true)}
                disabled={!isMine}>{buttonTitle}</button>
                {/*{answer ? <span>Yes</span> : <span>No</span>}*/}
            </div>

            <ModalQuestion
                show={show}

                setTrue={setTrue}
                setFalse={setFalse}

                enableBackground={true}
                backgroundOnClick={() => setShow(false)}

                width={300}
                height={200}
            >
                {modalText}
            </ModalQuestion>
        </>
    );
};

export default ModalQuestionContainer;