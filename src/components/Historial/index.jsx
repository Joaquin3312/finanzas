import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import ModalEdicion from "./ModalEdicion";
import 'bulma/css/bulma.css';
import "./Historial.css";
import { Pagination } from "./Pagination";

const Historial = ({ transacciones, onActualizarTransacciones }) => {
  const [editando, setEditando] = useState(null);
  const [nuevoMonto, setNuevoMonto] = useState(0);
  const [nuevoMotivo, setNuevoMotivo] = useState("");

  // Paginación:
  const [transaccionesPorPagina, setTransaccionesPorPagina] = useState(4);
  const [paginaActual, setPaginaActual] = useState(1);
  const totalTransacciones = transacciones.length;

  const lastIndex = paginaActual * transaccionesPorPagina;
  const firstIndex = lastIndex - transaccionesPorPagina;
  const transaccionesPaginadas = transacciones.slice(firstIndex, lastIndex);

  const habilitarEdicion = (id) => {
    const transaccion = transacciones.find((t) => t.id === id);
    setEditando(id);
    setNuevoMonto(transaccion.monto);
    setNuevoMotivo(transaccion.motivo);
  };

  const guardarEdicion = (id) => {
    const nuevasTransacciones = transacciones.map((transaccion) =>
      transaccion.id === id
        ? { ...transaccion, monto: nuevoMonto, motivo: nuevoMotivo }
        : transaccion
    );

    onActualizarTransacciones(nuevasTransacciones);
    setEditando(null);
  };

  return (
    <>
      <section className="transactions">
        <h3>Historial</h3>
        <ul className="transaction-list">
          {transaccionesPaginadas.map((transaccion) => (
            <li key={transaccion.id} className={`transaction ${transaccion.tipo}`}>
              {editando === transaccion.id ? (
                <ModalEdicion
                  nuevoMotivo={nuevoMotivo}
                  setNuevoMotivo={setNuevoMotivo}
                  nuevoMonto={nuevoMonto}
                  setNuevoMonto={setNuevoMonto}
                  onGuardar={() => guardarEdicion(transaccion.id)}
                  onCancelar={() => setEditando(null)}
                />
              ) : (
                <div className="transaction-info">
                  <span className="motivo">{transaccion.motivo}</span>
                  <div className="right-content">
                    <div className="monto">
                      {transaccion.tipo === "income" ? `➕Bs.${transaccion.monto}` : `➖Bs.${transaccion.monto}`}
                    </div>
                    <button
                      className="icon-button edit"
                      onClick={() => habilitarEdicion(transaccion.id)}
                    >
                      <FaEdit />
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>
      <Pagination
        transaccionesPorPagina={transaccionesPorPagina}
        paginaActual={paginaActual}
        setPaginaActual={setPaginaActual}
        totalTransacciones={totalTransacciones}
      />
    </>
  );
};

export { Historial };
