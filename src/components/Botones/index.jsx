import { useState, useEffect } from "react";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
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

const Botones = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false); // Modal para ingresos
  const [modalGastoIsOpen, setModalGastoIsOpen] = useState(false); // Modal para gastos
  const [monto, setMonto] = useState(0); // Almacena el monto
  const [motivo, setMotivo] = useState(""); // Almacena el motivo
  const [saldo, setSaldo] = useState(0); // Mantener el saldo actualizado

  // Cargar ingresos y gastos desde el localStorage
  const cargarDatos = () => {
    const ingresos = JSON.parse(localStorage.getItem("ingresos")) || [];
    const gastos = JSON.parse(localStorage.getItem("gastos")) || [];
    const totalIngresos = ingresos.reduce((acc, curr) => acc + curr.monto, 0);
    const totalGastos = gastos.reduce((acc, curr) => acc + curr.monto, 0);
    setSaldo(totalIngresos - totalGastos);
  };

  // Actualizar saldo al cargar el componente
  useEffect(() => {
    cargarDatos();
  }, []);

  // Guardar un ingreso en localStorage
  const handleIngreso = () => {
    const nuevoIngreso = {
      monto,
      motivo,
    };

    // Obtener ingresos previos de localStorage
    const ingresosPrevios = JSON.parse(localStorage.getItem("ingresos")) || [];
    const nuevosIngresos = [...ingresosPrevios, nuevoIngreso];

    // Guardar el nuevo ingreso en localStorage
    localStorage.setItem("ingresos", JSON.stringify(nuevosIngresos));

    // Resetear los campos y cerrar el modal
    setMonto(0);
    setMotivo("");
    setModalIsOpen(false);

    // Actualizar saldo
    cargarDatos();
    window.location.reload()
  };

  // Guardar un gasto en localStorage
  const handleGasto = () => {
    const nuevoGasto = {
      monto,
      motivo,
    };

    // Obtener gastos previos de localStorage
    const gastosPrevios = JSON.parse(localStorage.getItem("gastos")) || [];
    const nuevosGastos = [...gastosPrevios, nuevoGasto];

    // Guardar el nuevo gasto en localStorage
    localStorage.setItem("gastos", JSON.stringify(nuevosGastos));

    // Resetear los campos y cerrar el modal
    setMonto(0);
    setMotivo("");
    setModalGastoIsOpen(false);

    // Actualizar saldo
    cargarDatos();
    window.location.reload()
  };

  return (
    <div className="actions">
      {/* Botón para ingresos */}
      <button
        className="button income-button"
        onClick={() => setModalIsOpen(true)}
      >
        <FaPlusCircle size={25} /> Ingreso
      </button>

      {/* Modal para ingreso */}
      <Modal
        isOpen={modalIsOpen}
        onClose={() => {
          setModalIsOpen(false);
          setMonto(0);
          setMotivo("");
        }}
      >
        <h3>Agregar Ingreso</h3>
        <p>Escribe el monto del ingreso.</p>
        <input
          type="text"
          value={monto}
          onChange={(e) => {
            let value = e.target.value;
            if (!/^\d*$/.test(value)) return; // Permitir solo números
            value = value.replace(/^0+/, ""); // Eliminar ceros iniciales
            setMonto(value === "" ? 0 : Number(value));
          }}
        />
        <h3>Motivo del Ingreso</h3>
        <input
          type="text"
          placeholder="Ej. Pago freelance"
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
        />
        <button onClick={handleIngreso}>Agregar Ingreso</button>
      </Modal>

      {/* Botón para gastos */}
      <button
        className="button expense-button"
        onClick={() => setModalGastoIsOpen(true)}
      >
        <FaMinusCircle size={25} /> Gasto
      </button>

      {/* Modal para gasto */}
      <Modal
        isOpen={modalGastoIsOpen}
        onClose={() => {
          setModalGastoIsOpen(false);
          setMonto(0);
          setMotivo("");
        }}
      >
        <h3>Agregar Gasto</h3>
        <p>Escribe el monto del gasto.</p>
        <input
          type="text"
          value={monto}
          onChange={(e) => {
            let value = e.target.value;
            if (!/^\d*$/.test(value)) return; // Permitir solo números
            value = value.replace(/^0+/, ""); // Eliminar ceros iniciales
            setMonto(value === "" ? 0 : Number(value));
          }}
        />
        <h3>Motivo del Gasto</h3>
        <input
          type="text"
          placeholder="Ej. Compra de comida"
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
        />
        <button onClick={handleGasto}>Agregar Gasto</button>
      </Modal>
    </div>
  );
};

// Estilos
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

export { Botones };
