import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

export default function ModalOverlay({ onCloseModal }) {
  return (
    <div
      className={styles.overlay}
      onClick={(e) => e.currentTarget === e.target && onCloseModal()}
    />
  );
}
ModalOverlay.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
};
