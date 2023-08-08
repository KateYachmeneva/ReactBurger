import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

export default function ModalOverlay({oncloseModal}) {
  return <div className={styles.overlay} onClick={oncloseModal}></div>;
}

ModalOverlay.propTypes = {
    oncloseModal: PropTypes.func.isRequired,
  };

