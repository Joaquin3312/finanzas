import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import Boton from "./Boton";
import ModalFormulario from "./ModalFormulario";
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
    agregarIngreso({ monto, motivo });
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
    agregarGasto({ monto, motivo });
    setMonto(0);
    setMotivo("");
    setModalGastoIsOpen(false);
  };

  const handleCloseIngresoModal = () => {
    setMonto(0);
    setMotivo("");
    setModalIsOpen(false);
  };

  const handleCloseGastoModal = () => {
    setMonto(0);
    setMotivo("");
    setModalGastoIsOpen(false);
  };

  return (
    <div className="actions">
      <Boton
        className="income-button"
        icon={<FaPlusCircle size={25} />}
        label="Ingreso"
        onClick={() => setModalIsOpen(true)}
      />

      <Modal isOpen={modalIsOpen} onClose={handleCloseIngresoModal}>
        <ModalFormulario
          titulo="Agregar Ingreso"
          monto={monto}
          motivo={motivo}
          setMonto={setMonto}
          setMotivo={setMotivo}
          onSubmit={handleIngreso}
        />
      </Modal>

      <Boton
        className="expense-button"
        icon={<FaMinusCircle size={25} />}
        label="Gasto"
        onClick={() => setModalGastoIsOpen(true)}
      />

      <Modal isOpen={modalGastoIsOpen} onClose={handleCloseGastoModal}>
        <ModalFormulario
          titulo="Agregar Gasto"
          monto={monto}
          motivo={motivo}
          setMonto={setMonto}
          setMotivo={setMotivo}
          onSubmit={handleGasto}
        />
      </Modal>
    </div>
  );
};

export { Botones };
