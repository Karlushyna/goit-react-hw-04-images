import { useEffect } from "react";
import { createPortal } from 'react-dom';

import styles from './modal.module.css';

const modalRoot = document.querySelector('#modal--root');

function Modal ({handleModalClose, children}) {

  const handleKeydown = (e) => {

    handleModalClose(e);
  
  };

  const handleClick = (e) => {
    handleModalClose(e);
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);

    return (() => window.removeEventListener('keydown', handleKeydown))

  })

    return createPortal(
      <div className={styles.Overlay} onClick={handleClick}>
        <div className={styles.Modal}>
          {children}
        </div>
      </div>,
      
      modalRoot
    );
  }


export default Modal;
