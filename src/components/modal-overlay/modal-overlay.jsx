import styles from './modal-overlay.module.css';

import PropTypes from 'prop-types';

const ModalOverlay = (props) => {
    return (
        <div className={styles.overlay}>
            <div onClick={props.close} className={styles.background}/>
            {props.children}
        </div>
    )
}

ModalOverlay.propTypes = {
    children: PropTypes.element,
}

export default ModalOverlay;
