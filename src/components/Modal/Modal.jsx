import { useEffect } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./modal.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import PropTypes from "prop-types";

import ReactDOM from "react-dom";

const modalRoot = document.getElementById("react-modals");

export default function Modal({ children, isOpen, onClose }) {
  const closeWithEscape = (ev) => {
    if (ev.key === "Escape") {
      onClose();
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", closeWithEscape);
    return () => {
      document.removeEventListener("keydown", closeWithEscape);
    };
  }, [onClose]);
  // Возвращаем ReactDOM.createPortal,
  // который поместит дочерние элементы в modalRoot

  return ReactDOM.createPortal(
    <>
      <div className={`${styles.container} p-10`}>
        <button className={styles.header__button} onClick={onClose}>
          <CloseIcon type="primary" />
        </button>
        <div className={styles.content}>{children}</div>
      </div>
      <ModalOverlay onCloseModal={onClose} />
    </>,
    modalRoot,
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
};
