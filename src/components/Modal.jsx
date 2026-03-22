import styles from "./Modal.module.css";

const Modal = ({ show, onClose, title, message, actionLabel, onAction, icon }) => {
  if (!show) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {icon && <div className={styles.icon}>{icon}</div>}
        <div className={styles.body}>
          <h2>{title}</h2>
          <p>{message}</p>
        </div>
        {actionLabel && (
          <button className={styles.actionBtn} onClick={onAction || onClose}>
            {actionLabel}
          </button>
        )}
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
          &times;
        </button>
      </div>
    </div>
  );
};

export default Modal;
