import ReactDOM from "react-dom";
import "./Modal.css";

const Modal = ({ isOpen, onClose, children, showCloseButton = true }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-content">
        {children}
        {showCloseButton && (
          <button className="modal-close-button" onClick={onClose}>
            Cerrar
          </button>
        )}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
