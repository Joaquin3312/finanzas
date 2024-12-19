import "./App.css";
import { Titulo } from "../Título";
import { Saldo } from "../Saldo";
import { Botones } from "../Botones";
import { Historial } from "../Historial";
import { useAppLogic } from "./useAppLogic";

function App() {
  const {
    saldo,
    transacciones,
    agregarIngreso,
    agregarGasto,
    actualizarTransacciones,
  } = useAppLogic();

  return (
    <div className="container">
      <Titulo />
      <Saldo
        ingresos={transacciones.filter((t) => t.tipo === "income")}
        gastos={transacciones.filter((t) => t.tipo === "expense")}
      />
      <Botones agregarIngreso={agregarIngreso} agregarGasto={agregarGasto} />
      <Historial
        transacciones={transacciones}
        onActualizarTransacciones={actualizarTransacciones}
      />
    </div>
  );
}

export default App;
