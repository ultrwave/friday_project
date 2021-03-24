import React, {useState} from 'react';
import Modal from './Modal';

function ModalContainer(props: any) {
    const [show, setShow] = useState(false)

    return (
        <>
            <button onClick={() => setShow(true)}>Simple modal</button>
            <Modal
                enableBackground={true}
                backgroundOnClick={() => setShow(false)}

                width={300}
                height={200}
                // modalOnClick={() => setShow(false)}

                show={show}
            >
                Simple Modal
                <div style={{marginTop: '5px'}}><button onClick={() => setShow(false)}>Close</button></div>
            </Modal>
        </>
    );
}

export default ModalContainer;