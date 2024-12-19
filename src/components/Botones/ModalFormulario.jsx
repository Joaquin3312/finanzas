
const ModalFormulario = ({ titulo, monto, motivo, setMonto, setMotivo, onSubmit }) => {
  return (
    <form
      className="modal-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <h3 className="modal-title">{titulo}</h3>
      <input
        className="modal-input"
        type="text"
        value={monto}
        onChange={(e) =>
          setMonto(Number(e.target.value.replace(/[^0-9]/g, "")) || 0)
        }
        placeholder="Monto"
      />
      <input
        className="modal-input"
        type="text"
        value={motivo}
        onChange={(e) => setMotivo(e.target.value)}
        placeholder="Motivo"
      />
      <button className="modal-submit-button" type="submit">
        Guardar
      </button>
    </form>
  );
};

export default ModalFormulario;
