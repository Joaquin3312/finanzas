import { FaSave, FaTimes } from "react-icons/fa";
import './ModalEdicion.css';

const ModalEdicion = ({
  nuevoMotivo,
  setNuevoMotivo,
  nuevoMonto,
  setNuevoMonto,
  onGuardar,
  onCancelar,
}) => {
  return (
    <div className="edit-transaction">
      <input
        type="text"
        value={nuevoMotivo}
        onChange={(e) => setNuevoMotivo(e.target.value)}
        className="input-motivo"
        placeholder="Motivo"
      />
      <input
        type="number"
        value={nuevoMonto}
        onChange={(e) => setNuevoMonto(Number(e.target.value))}
        className="input-monto"
        placeholder="Monto"
      />
      <button className="icon-button save" onClick={onGuardar}>
        <FaSave />
      </button>
      <button className="icon-button cancel" onClick={onCancelar}>
        <FaTimes />
      </button>
    </div>
  );
};

export default ModalEdicion;
