import { useEffect } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./modal.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import PropTypes from 'prop-types';

import ReactDOM from "react-dom";

const modalRoot = document.getElementById("react-modals");


export default function Modal ( { children, isOpen, onClose } ) {
   
  const closeModal = () => {
        onClose();
      };

    
    useEffect(() => {
      const closeWithEscape = (ev) => {
        if (ev.key === "Escape"){
            onClose();
        } 
    }
      if(isOpen){
        document.addEventListener("keydown", closeWithEscape);
        return () => {
          document.removeEventListener ("keydown", closeWithEscape);
      }
    }
    },[isOpen]);
        // Возвращаем ReactDOM.createPortal, 
        // который поместит дочерние элементы в modalRoot
    
    return ReactDOM.createPortal(
                <>
                   <ModalOverlay oncloseModal={onClose} />
                    <div className={`${styles.container} p-10`}>
        <div className={styles.header}>
             <button className={styles.header__button} onClick={closeModal}>
            <CloseIcon type="primary" />
          </button>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
                </>, 
            modalRoot
        );
};

Modal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
  isOpen: PropTypes.bool
};