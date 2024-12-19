import { useState, useEffect } from "react";

export const useAppLogic = () => {
  const [ingresos, setIngresos] = useState([]);
  const [gastos, setGastos] = useState([]);
  const [saldo, setSaldo] = useState(0);
  const [transacciones, setTransacciones] = useState([]);

  const cargarDatos = () => {
    const savedIngresos = JSON.parse(localStorage.getItem("ingresos")) || [];
    const savedGastos = JSON.parse(localStorage.getItem("gastos")) || [];
    setIngresos(savedIngresos);
    setGastos(savedGastos);

    const totalIngresos = savedIngresos.reduce((total, item) => total + item.monto, 0);
    const totalGastos = savedGastos.reduce((total, item) => total + item.monto, 0);
    setSaldo(totalIngresos - totalGastos);

    const todasLasTransacciones = [
      ...savedIngresos.map((ingreso) => ({ ...ingreso, tipo: "income" })),
      ...savedGastos.map((gasto) => ({ ...gasto, tipo: "expense" })),
    ];

    todasLasTransacciones.sort((a, b) => b.timestamp - a.timestamp);

    setTransacciones(todasLasTransacciones);
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const agregarIngreso = (nuevoIngreso) => {
    const ingresoConId = { ...nuevoIngreso, id: Date.now(), timestamp: Date.now(), tipo: "income" };
    const nuevosIngresos = [...ingresos, ingresoConId];
    setIngresos(nuevosIngresos);
    setTransacciones((prev) => [ingresoConId, ...prev]);
    localStorage.setItem("ingresos", JSON.stringify(nuevosIngresos));
  };

  const agregarGasto = (nuevoGasto) => {
    const gastoConId = { ...nuevoGasto, id: Date.now(), timestamp: Date.now(), tipo: "expense" };
    const nuevosGastos = [...gastos, gastoConId];
    setGastos(nuevosGastos);
    localStorage.setItem("gastos", JSON.stringify(nuevosGastos));
    cargarDatos();
  };

  const actualizarTransacciones = (nuevasTransacciones) => {
    setTransacciones(nuevasTransacciones);

    const nuevosIngresos = nuevasTransacciones.filter((t) => t.tipo === "income");
    const nuevosGastos = nuevasTransacciones.filter((t) => t.tipo === "expense");

    localStorage.setItem("ingresos", JSON.stringify(nuevosIngresos));
    localStorage.setItem("gastos", JSON.stringify(nuevosGastos));

    setIngresos(nuevosIngresos);
    setGastos(nuevosGastos);

    const totalIngresos = nuevosIngresos.reduce((total, item) => total + item.monto, 0);
    const totalGastos = nuevosGastos.reduce((total, item) => total + item.monto, 0);
    setSaldo(totalIngresos - totalGastos);
  };

  return {
    ingresos,
    gastos,
    saldo,
    transacciones,
    agregarIngreso,
    agregarGasto,
    actualizarTransacciones,
  };
};
