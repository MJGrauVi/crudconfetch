import React, { useState, useEffect, useContext, useCallback } from "react";
import "./ListadoDiscos.css";
import Disco from "./Disco.jsx";
import MensajeTemporal from "./MensajeTemporal.jsx";
import Cargando from "./Cargando.jsx";
import { ContextoDiscos } from "../context/ProveedorDiscos.jsx";

const ListadoDiscos = () => {
  const {discos, cargando, borrarDisco } = useContext(ContextoDiscos);
  const [discosFiltrados, setDiscosFiltrados] = useState([]);
  const [textoFiltro, setTextoFiltro] = useState("");
  const [mensajeEliminado, setMensajeEliminado] = useState("");

  // Filtrado de discos
   useEffect(() => {
    if (!textoFiltro.trim()) {
      setDiscosFiltrados(discos);
    } else {
      const texto = textoFiltro.toLowerCase().trim();
      setDiscosFiltrados(
        discos.filter(
          d =>
            d.nombreDisco?.toLowerCase().includes(texto) ||
            d.grupo?.toLowerCase().includes(texto) ||
            d.genero?.toLowerCase().includes(texto)
        )
      );
    }
  }, [textoFiltro, discos]); 

  const manejarCambioFiltro = useCallback(e => setTextoFiltro(e.target.value), []);
  const limpiarFiltro = useCallback(() => setTextoFiltro(""), []);

  const toggleDisco = useCallback(id => {
    setDiscosFiltrados(prev =>
      prev.map(d => (d.id === id ? { ...d, expandido: !d.expandido } : d))
    );
  }, []);

  const handleBorrarDisco = useCallback(async id => {
    try {
      const discoEliminado = discos.find(d => d.id === id);
      await borrarDisco(id);
      setMensajeEliminado(`Disco "${discoEliminado?.nombreDisco}" eliminado.`);
    } catch (error) {
      console.error(error);
      setMensajeEliminado("Error al eliminar el disco.");
    }
  }, [discos, borrarDisco]);

  useEffect(() => {
    if (mensajeEliminado) {
      const timer = setTimeout(() => setMensajeEliminado(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [mensajeEliminado]);

  if (cargando) return <Cargando />;

  return (
    <div className="contenedor-listado-discos">
      <h2>Listado de Discos</h2>

      <MensajeTemporal texto={mensajeEliminado} />

{/* Sección de filtrado. */}
      <div className="controles-filtrado">
        <input
          type="text"
          value={textoFiltro}
          onChange={manejarCambioFiltro}
          placeholder="Buscar por nombre, grupo o género..."
        />
        <button type="button" onClick={limpiarFiltro} disabled={!textoFiltro.trim()}>
          Limpiar
        </button>
      </div>
{/* Mensaje del filtrado */}
      <p>
        Mostrando {discosFiltrados.length} de {discos.length} discos
        {textoFiltro.trim() && ` (filtrados por "${textoFiltro}")`}
      </p>

      <div className="lista-discos">
        {discosFiltrados.map(disco => (
          <Disco
            key={disco.id}
            disco={disco}
            expandido={disco.expandido || false}
            onToggle={() => toggleDisco(disco.id)}
            onBorrar={() => handleBorrarDisco(disco.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ListadoDiscos;
