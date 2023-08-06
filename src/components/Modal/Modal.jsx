import { useEffect } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./modal.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

const modalRoot = document.getElementById("react-modals");


export default function Modal ( { children, header, boxStyles, onClose } ) {
    const closeModal = () => {
        onClose();
      };
    const closeWithEscape = (ev) => {
        if (ev.key === "Escape"){
            closeModal();
        } 
    }
    
    useEffect(() => {
        document.addEventListener("keydown", closeWithEscape);
        return () => document.removeEventListener ("keydown", closeWithEscape);
    });
        // Возвращаем ReactDOM.createPortal, 
        // который поместит дочерние элементы в modalRoot
        return ReactDOM.createPortal(
            (
                <>
                   <ModalOverlay oncloseModal={closeModal} />
                    <div className={`${styles.container} ${boxStyles}`}>
        <div className={styles.header}>
          <h3 className="text text_type_main-large"> {header} </h3>
          <button className={styles.header__button} onClick={closeModal}>
            <CloseIcon type="primary" />
          </button>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
                </>
            ), 
            modalRoot
        );
}

Modal.propTypes = {
    children: PropTypes.element.isRequired,
    header: PropTypes.string.isRequired,
    boxStyles: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };