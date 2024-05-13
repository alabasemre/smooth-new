import { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import styles from './Modal.module.css';

function Modal({ isOpen, setIsOpen, children }) {
    const modalRef = useRef();

    useEffect(() => {
        modalRef.current.showModal();
    }, []);

    const onClose = () => {
        setIsOpen();
        modalRef.current.close();
    };

    const onClick = useCallback(({ target }) => {
        const { current: el } = modalRef;

        if (target === el) {
            // modal dışında tıklanınca kapatmak için
            onClose();
        }
    }, []);

    return createPortal(
        <dialog
            ref={modalRef}
            onCancel={onClose}
            onClose={onClose}
            onClick={onClick}
            className={styles['modal-container']}
        >
            {isOpen && children}
        </dialog>,
        document.getElementById('modal')
    );
}

export default Modal;
