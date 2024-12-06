import { useEffect, useState } from "react";

const Historial = () => {
  const [transacciones, setTransacciones] = useState([]);
  const [editando, setEditando] = useState(null); // Almacenar el índice de la transacción que estamos editando
  const [nuevoMonto, setNuevoMonto] = useState(0); // Almacenar el nuevo monto
  const [nuevoMotivo, setNuevoMotivo] = useState(""); // Almacenar el nuevo motivo

  // Cargar datos del localStorage al montar el componente
  useEffect(() => {
    const ingresos = JSON.parse(localStorage.getItem("ingresos")) || [];
    const gastos = JSON.parse(localStorage.getItem("gastos")) || [];

    // Unir ambos arrays (primero ingresos, luego gastos)
    const todasLasTransacciones = [
      ...ingresos.map((ingreso) => ({
        ...ingreso,
        tipo: "income", // Agregamos un identificador de tipo
      })),
      ...gastos.map((gasto) => ({
        ...gasto,
        tipo: "expense", // Gasto con identificador de tipo
      })),
    ];

    setTransacciones(todasLasTransacciones);
  }, []);

  // Función para habilitar la edición
  const habilitarEdicion = (index) => {
    setEditando(index);
    const transaccion = transacciones[index];
    setNuevoMonto(transaccion.monto);
    setNuevoMotivo(transaccion.motivo);
  };

  // Función para guardar la edición
  const guardarEdicion = (index) => {
    const nuevaTransaccion = {
      ...transacciones[index],
      monto: nuevoMonto,
      motivo: nuevoMotivo,
    };

    const nuevasTransacciones = [...transacciones];
    nuevasTransacciones[index] = nuevaTransaccion;

    setTransacciones(nuevasTransacciones);

    // Guardar los datos actualizados en localStorage
    actualizarLocalStorage(nuevasTransacciones);

    // Finalizar la edición
    setEditando(null);
    window.location.reload();
  };

  // Función para actualizar el localStorage con los datos modificados
  const actualizarLocalStorage = (nuevasTransacciones) => {
    const ingresos = nuevasTransacciones.filter(
      (transaccion) => transaccion.tipo === "income"
    );
    const gastos = nuevasTransacciones.filter(
      (transaccion) => transaccion.tipo === "expense"
    );

    localStorage.setItem("ingresos", JSON.stringify(ingresos));
    localStorage.setItem("gastos", JSON.stringify(gastos));
  };

  return (
    <section className="transactions">
      <h3>Historial</h3>
      <ul className="transaction-list">
        {transacciones.map((transaccion, index) => (
          <li
            key={index}
            className={`transaction ${transaccion.tipo}`} // Agrega clase según el tipo
          >
            {editando === index ? (
              <div className="edit-transaction">
                <input
                  type="text"
                  value={nuevoMotivo}
                  onChange={(e) => setNuevoMotivo(e.target.value)}
                  placeholder="Nuevo motivo"
                />
                <input
                  type="number"
                  value={nuevoMonto}
                  onChange={(e) => setNuevoMonto(Number(e.target.value))}
                  placeholder="Nuevo monto"
                />
                <button onClick={() => guardarEdicion(index)}>Guardar</button>
                <button onClick={() => setEditando(null)}>Cancelar</button>
              </div>
            ) : (
              <div className="transaction-info">
                <span>{transaccion.motivo}</span>
                <span>
                  {transaccion.tipo === "income"
                    ? `+Bs.${transaccion.monto}`
                    : `-Bs.${transaccion.monto}`}
                </span>
                <button onClick={() => habilitarEdicion(index)}>Editar</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export { Historial };
