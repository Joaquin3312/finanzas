import './App.css';
import { useState, useEffect } from 'react';
import { Titulo } from './components/Título';
import { Saldo } from './components/Saldo';
import { Botones } from './components/Botones';
import { Historial } from './components/Historial';

function App() {
  const [ingresos, setIngresos] = useState([]);
  const [gastos, setGastos] = useState([]);
  const [saldo, setSaldo] = useState(0);

  const cargarDatos = () => {
    const savedIngresos = JSON.parse(localStorage.getItem('ingresos')) || [];
    const savedGastos = JSON.parse(localStorage.getItem('gastos')) || [];
    setIngresos(savedIngresos);
    setGastos(savedGastos);

    const totalIngresos = savedIngresos.reduce((total, item) => total + item.monto, 0);
    const totalGastos = savedGastos.reduce((total, item) => total + item.monto, 0);
    setSaldo(totalIngresos - totalGastos);
  };

  // Cargar datos al montar el componente
  useEffect(() => {
    cargarDatos();
  }, []);

  const agregarIngreso = (nuevoIngreso) => {
    const nuevosIngresos = [...ingresos, nuevoIngreso];
    setIngresos(nuevosIngresos);
    localStorage.setItem('ingresos', JSON.stringify(nuevosIngresos));
    cargarDatos(); // Actualizar después de agregar
  };

  const agregarGasto = (nuevoGasto) => {
    const nuevosGastos = [...gastos, nuevoGasto];
    setGastos(nuevosGastos);
    localStorage.setItem('gastos', JSON.stringify(nuevosGastos));
    cargarDatos();
  };

  return (
    <div className="container">
      <Titulo />
      <Saldo ingresos={ingresos} gastos={gastos} saldo={saldo} />
      <Botones agregarIngreso={agregarIngreso} />
      <Historial ingresos={ingresos} gastos={gastos} />
    </div>
  );
}

export default App;
