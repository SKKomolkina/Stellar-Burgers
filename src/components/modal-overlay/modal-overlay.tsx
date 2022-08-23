import styles from './modal-overlay.module.css';

import React from "react";

interface IModalOverLay {
    close: () => void;
    children: any;
}

const ModalOverlay: React.FC<IModalOverLay> = ({close, children}) => {
    return (
        <div className={styles.overlay}>
            <div onClick={close} className={styles.background}/>
            {children}
        </div>
    )
}

export default ModalOverlay;
