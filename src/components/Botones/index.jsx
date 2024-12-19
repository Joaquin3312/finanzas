import { useState } from "react";
import Modal from "../Modal/Modal";
import "./Botones.css";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

const Botones = ({ agregarIngreso, agregarGasto }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false); // Modal para ingresos
  const [modalGastoIsOpen, setModalGastoIsOpen] = useState(false); // Modal para gastos
  const [monto, setMonto] = useState(0); // Almacena el monto
  const [motivo, setMotivo] = useState(""); // Almacena el motivo

  const handleIngreso = () => {
    if (!monto || monto <= 0) {
      alert("Por favor, ingrese un monto válido.");
      return;
    }
    if (!motivo.trim()) {
      alert("Por favor, ingrese un motivo.");
      return;
    }

    // Crear el nuevo ingreso y pasarlo al padre
    agregarIngreso({ monto, motivo });

    // Resetear campos
    setMonto(0);
    setMotivo("");
    setModalIsOpen(false);
  };

  const handleGasto = () => {
    if (!monto || monto <= 0) {
      alert("Por favor, ingrese un monto válido.");
      return;
    }
    if (!motivo.trim()) {
      alert("Por favor, ingrese un motivo.");
      return;
    }

    // Crear el nuevo gasto y pasarlo al padre
    agregarGasto({ monto, motivo });

    // Resetear campos
    setMonto(0);
    setMotivo("");
    setModalGastoIsOpen(false);
  };

  return (
    <div className="actions">
      <button
        className="buttons income-button"
        onClick={() => setModalIsOpen(true)}
      >
        <FaPlusCircle size={25} /> Ingreso
      </button>

      <Modal
        isOpen={modalIsOpen}
        onClose={() => {
          setModalIsOpen(false);
          setMonto(0);
          setMotivo("");
        }}
      >
        <form
          className="modal-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleIngreso();
          }}
        >
          <h3 className="modal-title">Agregar Ingreso</h3>
          <input
            className="modal-input"
            type="text"
            value={monto}
            onChange={(e) =>
              setMonto(Number(e.target.value.replace(/[^0-9]/g, "")) || 0)
            }
            placeholder="Monto"
          />
          <input
            className="modal-input"
            type="text"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            placeholder="Motivo"
          />
          <button className="modal-submit-button" type="submit">
            Guardar
          </button>
        </form>
      </Modal>

      <button
        className="buttons expense-button"
        onClick={() => setModalGastoIsOpen(true)}
      >
        <FaMinusCircle size={25} /> Gasto
      </button>

      <Modal
        isOpen={modalGastoIsOpen}
        onClose={() => {
          setModalGastoIsOpen(false);
          setMonto(0);
          setMotivo("");
        }}
      >
        <form
          className="modal-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleGasto();
          }}
        >
          <h3 className="modal-title">Agregar Gasto</h3>
          <input
            className="modal-input"
            type="text"
            value={monto}
            onChange={(e) =>
              setMonto(Number(e.target.value.replace(/[^0-9]/g, "")) || 0)
            }
            placeholder="Monto"
          />
          <input
            className="modal-input"
            type="text"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            placeholder="Motivo"
          />
          <button className="modal-submit-button" type="submit">
            Guardar
          </button>
        </form>
      </Modal>
    </div>
  );
};

export { Botones };
