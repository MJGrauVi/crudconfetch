const FiltroDisco = ({ textoFiltro, setTextoFiltro }) => (
  //Componente de presentación
  <div className="controles-filtrado">
    <div className="campo-filtro">
      <label htmlFor="filtro-texto">Filtrar discos:</label>
      <input
        type="text"
        id="filtro-texto"
        value={textoFiltro}
        onChange={(e) => setTextoFiltro(e.target.value)}
        placeholder="Buscar por nombre, grupo o género..."
      />
    </div>
    <button type="button" onClick={() => setTextoFiltro("")} disabled={!textoFiltro}>
      Limpiar
    </button>
  </div>
);

export default FiltroDisco;
