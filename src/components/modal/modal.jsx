import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import styles from './modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import ModalOverlay from "../modal-overlay/modal-overlay";

const modalContainer = document.getElementById('react-modals');

const Modal = ({children, isOpen, setIsOpen, close}) => {
   return modalContainer ? ReactDOM.createPortal(
       <div className={isOpen ? styles.visible : styles.hidden}>
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

Modal.propTypes = {
    children: PropTypes.element,
    isOpen: PropTypes.bool,
    setIsOpen: PropTypes.func,
    close: PropTypes.func,
}

export default Modal;
