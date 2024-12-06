import { useState, useEffect } from "react";

const Saldo = () => {
  const [saldo, setSaldo] = useState(0);
  const [ingreso, setIngreso] = useState(0);
  const [gasto, setGasto] = useState(0);

  // Función para cargar ingresos y gastos de localStorage
  const cargarDatos = () => {
    const savedIngreso = JSON.parse(localStorage.getItem("ingresos")) || [];
    const savedGasto = JSON.parse(localStorage.getItem("gastos")) || [];

    // Sumar todos los ingresos
    const totalIngreso = savedIngreso.reduce((total, item) => total + item.monto, 0);
    // Sumar todos los gastos
    const totalGasto = savedGasto.reduce((total, item) => total + item.monto, 0);

    setIngreso(totalIngreso);
    setGasto(totalGasto);
  };

  // Cargar los valores de ingreso y gasto desde localStorage cuando el componente se monta
  useEffect(() => {
    cargarDatos(); // Cargar datos desde el principio
  }, []);

  // Calcular saldo y actualizarlo cada vez que se actualicen ingreso o gasto
  useEffect(() => {
    const newSaldo = ingreso - gasto;
    setSaldo(newSaldo);

    // Guardar el saldo en localStorage
    localStorage.setItem("saldo", JSON.stringify(newSaldo));
  }, [ingreso, gasto]);

  return (
    <>
      <div className="balance-section">
        <h2>Saldo total</h2>
        <div className="balance-value">
          <span>{saldo}</span> <small>Bs.-</small>
        </div>
      </div>
      {/* Gastos/ingresos */}
      <div className="montos">
        <p className="total-ingreso">Total Ingresos: {ingreso}</p>
        <p className="total-gasto">Total Gastos: {gasto}</p>
      </div>
    </>
  );
};

export { Saldo };
