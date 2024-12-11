import { useState, useEffect } from "react";
import Modal from "../Modal/Modal";
import styles from "./Botones.module.css";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

const Botones = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false); // Modal para ingresos
  const [modalGastoIsOpen, setModalGastoIsOpen] = useState(false); // Modal para gastos
  const [monto, setMonto] = useState(0); // Almacena el monto
  const [motivo, setMotivo] = useState(""); // Almacena el motivo
  const [saldo, setSaldo] = useState(0); // Mantener el saldo actualizado

  const cargarDatos = () => {
    const ingresos = JSON.parse(localStorage.getItem("ingresos")) || [];
    const gastos = JSON.parse(localStorage.getItem("gastos")) || [];
    const totalIngresos = ingresos.reduce((acc, curr) => acc + curr.monto, 0);
    const totalGastos = gastos.reduce((acc, curr) => acc + curr.monto, 0);
    setSaldo(totalIngresos - totalGastos);
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleIngreso = () => {
    if (!monto || monto <= 0) {
      alert("Por favor, ingrese un monto válido.");
      return;
    }
    if (!motivo.trim()) {
      alert("Por favor, ingrese un motivo.");
      return;
    }

    const nuevoIngreso = { monto, motivo };
    const ingresosPrevios = JSON.parse(localStorage.getItem("ingresos")) || [];
    const nuevosIngresos = [...ingresosPrevios, nuevoIngreso];

    localStorage.setItem("ingresos", JSON.stringify(nuevosIngresos));
    setMonto(0);
    setMotivo("");
    setModalIsOpen(false);
    cargarDatos();
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

    const nuevoGasto = { monto, motivo };
    const gastosPrevios = JSON.parse(localStorage.getItem("gastos")) || [];
    const nuevosGastos = [...gastosPrevios, nuevoGasto];

    localStorage.setItem("gastos", JSON.stringify(nuevosGastos));
    setMonto(0);
    setMotivo("");
    setModalGastoIsOpen(false);
    cargarDatos();
  };

  return (
    <div className={styles.actions}>
      <button
        className={`${styles.button} ${styles["income-button"]}`}
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
          onSubmit={(e) => {
            e.preventDefault();
            handleIngreso();
          }}
        >
          <h3>Agregar Ingreso</h3>
          <input
            type="text"
            value={monto}
            onChange={(e) =>
              setMonto(Number(e.target.value.replace(/[^0-9]/g, "")) || 0)
            }
          />
          <input
            type="text"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            placeholder="Motivo"
          />
          <button type="submit">Guardar</button>
        </form>
      </Modal>

      <button
        className={`${styles.button} ${styles["expense-button"]}`}
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
          onSubmit={(e) => {
            e.preventDefault();
            handleGasto();
          }}
        >
          <h3>Agregar Gasto</h3>
          <input
            type="text"
            value={monto}
            onChange={(e) =>
              setMonto(Number(e.target.value.replace(/[^0-9]/g, "")) || 0)
            }
          />
          <input
            type="text"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            placeholder="Motivo"
          />
          <button type="submit">Guardar</button>
        </form>
      </Modal>
    </div>
  );
};

export { Botones };
