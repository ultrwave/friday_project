import React, {CSSProperties, ReactChild, ReactChildren, ReactElement, useEffect} from 'react';

export type ModalPropsType = {
    enableBackground?: boolean;
    backgroundStyle?: CSSProperties;
    backgroundOnClick?: () => void;

    width: number;
    height: number;
    modalStyle?: CSSProperties;
    modalOnClick?: () => void;

    show: boolean
    // children?: ReactChild | ReactChild[] | ReactChildren | ReactChildren[];
    children?: ReactChild | ReactChildren | (string | ReactChildren | ReactElement)[];
    // children?: (string | ReactChildren | ReactElement)[];

}


function Modal(props: ModalPropsType) {
    const {
        enableBackground,
        backgroundStyle,
        backgroundOnClick = () => {
        },

        width,
        height,
        modalStyle,
        modalOnClick = () => {
        },

        show, children
    } = props

    // disable page scroll on modal show
    useEffect(() => {
        if (show) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = 'unset';
        }
    }, [show]);

    const top = `calc(50vh - ${height / 2}px)`;
    const left = `calc(50vw - ${width / 2}px)`;

    if (!show) return null

    return (
        <>
            {enableBackground && <div
                style={{
                    position: 'fixed',
                    top: '0px',
                    left: '0px',
                    width: '100vw',
                    height: '100vh',
                    overflowY: 'hidden',

                    background: 'black',
                    opacity: 0.35,
                    zIndex: 20,

                    ...backgroundStyle,
                }}
                onClick={backgroundOnClick}
            />}

            <div
                style={{
                    position: 'fixed',
                    top,
                    left,
                    width,
                    height,
                    display: 'flex',
                    flexFlow: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',

                    background: 'white',
                    zIndex: 21,

                    ...modalStyle,
                }}
                onClick={modalOnClick}
            >
                {children}
            </div>
        </>
    );
}

export default Modal;