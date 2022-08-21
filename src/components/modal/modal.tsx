import React, {Dispatch, SetStateAction} from "react";
import ReactDOM from "react-dom";

import styles from './modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import ModalOverlay from "../modal-overlay/modal-overlay";

const modalContainer = document.getElementById('react-modals');

interface IModal {
    children: any;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    close: () => void;
}

const Modal: React.FC<IModal> = ({children, isOpen, setIsOpen, close}) => {

    React.useEffect(() => {
        const closeByEsc = (evt: KeyboardEvent) => {
            if (evt.key === 'Escape') {
                close();
            }
        }

        document.addEventListener('keydown', closeByEsc)

        return () => document.removeEventListener('keydown', closeByEsc)
    }, []);

   return modalContainer ? ReactDOM.createPortal(
       <div className={styles.visible}>
           <ModalOverlay close={close}>
               <div className={`${styles.wrapper}`}>
                   <button
                       onClick={() => setIsOpen(false)}
                       className={styles.button}>
                       <CloseIcon type="primary" />
                   </button>

                   {children}
               </div>
           </ModalOverlay>
       </div>,
       modalContainer) : null
}

export default Modal;
