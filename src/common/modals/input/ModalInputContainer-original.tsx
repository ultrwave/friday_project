import React, {useState} from 'react';
import ModalInput from './ModalInput';

function ModalInputContainerOriginal(props: any) {
    const [show, setShow] = useState(false);
    const [answer, setAnswer] = useState('test answer');

    // const [value1, setValue1] = useState('');
    // const [value2, setValue2] = useState('');


    return (
        <>
            <div>
                <button onClick={() => setShow(true)}>Original MOdal Input</button>
                {/*{answer}-{value1}-{value2}*/}
                {answer}
            </div>
            <ModalInput
                show={show}
                close={() => setShow(false)}

                answer={answer}
                setAnswer={setAnswer}

                //inputData={[[value1, setValue1], [value2, setValue2]]}

                enableBackground={true}
                backgroundOnClick={() => setShow(false)}

                width={300}
                height={200}

            >

            </ModalInput>
        </>
    );
}

export default ModalInputContainerOriginal;