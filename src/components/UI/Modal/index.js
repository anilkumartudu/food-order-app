import { createPortal } from "react-dom";
import styles from "./index.module.css";

const portalElement = document.getElementById("overlays");

const Backdrop = ({ onHideCart }) => {
  return <div className={styles.backdrop} onClick={onHideCart} />;
};

const ModalOverlay = ({ children }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

const Modal = ({ children, onClose }) => {
  return (
    <>
      {createPortal(<Backdrop onHideCart={onClose} />, portalElement)}
      {createPortal(<ModalOverlay>{children}</ModalOverlay>, portalElement)}
    </>
  );
};

export default Modal;
