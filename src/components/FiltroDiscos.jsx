const FiltroDiscos = ({ valor, onChange, onClear }) => {
  return (
    <div className="controles-filtrado">
      <input
        type="text"
        value={valor}
        onChange={e => onChange(e.target.value)}
        placeholder="Buscar por nombre, grupo o género"
      />

      <button
        onClick={onClear}
        disabled={!valor.trim()}
      >
        Limpiar
      </button>
    </div>
  );
}
export default FiltroDiscos;

