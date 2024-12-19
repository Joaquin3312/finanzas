const Saldo = ({ ingresos, gastos }) => {
  // Calcular el total de ingresos y gastos
  const totalIngresos = ingresos.reduce((total, item) => total + item.monto, 0);
  const totalGastos = gastos.reduce((total, item) => total + item.monto, 0);

  // Calcular el saldo
  const saldo = totalIngresos - totalGastos;

  return (
    <>
      <div className="balance-section">
        <h2>Saldo total</h2>
        <div className="balance-value">
          <span>{saldo}</span> <small>Bs.-</small>
        </div>
      </div>
      {/* Mostrar gastos e ingresos */}
      <div className="montos">
        <p className="total-ingreso">Total Ingresos: {totalIngresos}</p>
        <p className="total-gasto">Total Gastos: {totalGastos}</p>
      </div>
    </>
  );
};

export { Saldo };
