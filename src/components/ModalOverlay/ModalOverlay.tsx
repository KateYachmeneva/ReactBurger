import styles from "./modal-overlay.module.css";
import { FC } from "react";
import React from "react";

type ModalOverlayPropsType = {
  onCloseModal: () => void;
};
const ModalOverlay: FC<ModalOverlayPropsType> = ({ onCloseModal }) => {
  return (
    <div
      className={styles.overlay}
      onClick={(e) => e.currentTarget === e.target && onCloseModal()}
    />
  );
};
export default ModalOverlay;
