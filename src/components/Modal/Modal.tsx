import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./modal.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { FC, PropsWithChildren, useEffect } from "react";
import ReactDOM from "react-dom";
import React from "react";
const modalRoot = document.getElementById("react-modals") as
  | Element
  | DocumentFragment;

type ModalPropsType = {
  onClose: () => void;
  isOpen?: boolean;
};
const Modal: FC<PropsWithChildren<ModalPropsType>> = ({
  children,
  onClose,
  isOpen,
}) => {
  const closeWithEscape = (ev: KeyboardEvent) => {
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
      <div className={`${styles.container} p-10`} data-testid="modal">
        <button
          className={styles.header__button}
          onClick={onClose}
          data-testid="close_button"
        >
          <CloseIcon type="primary" />
        </button>
        <div className={styles.content}>{children}</div>
      </div>
      <ModalOverlay onCloseModal={onClose} />
    </>,
    modalRoot,
  );
};

export default Modal;
