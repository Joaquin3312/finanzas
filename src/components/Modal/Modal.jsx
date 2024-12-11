import ReactDOM from "react-dom";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div style={overlayStyle}>
      <div style={modalStyle}>
        {children}
        <button style={closeButtonStyle} onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

// Estilos del Modal
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
  position: "relative",
  textAlign: "center",
  width: "300px",
};

const closeButtonStyle = {
  marginTop: "10px",
  padding: "10px 15px",
  backgroundColor: "#f44336",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default Modal;
