import styles from './modal-overlay.module.css';


export default function ModalOverlay({oncloseModal}) {
  return <div className={styles.overlay} onClick={oncloseModal}></div>;
}

ModalOverlay.propTypes = {
    oncloseModal: PropTypes.func.isRequired,
  };

