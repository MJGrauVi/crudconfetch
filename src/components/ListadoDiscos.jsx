import React, { useState, useEffect } from "react";
import "./ListadoDiscos.css";
import Disco from "./Disco.jsx";
import MensajeTemporal from "./MensajeTemporal.jsx";
import Cargando from "./Cargando.jsx";
import FiltroDiscos from "./FiltroDiscos.jsx";
import useDiscos from "../hooks/useDiscos.js";

const ListadoDiscos = () => {
  const { discos, cargando, borrarDisco, discoExpandido, toggleDisco } =
    useDiscos();

  //Estados.

  const [textoFiltro, setTextoFiltro] = useState("");
  const [mensajeEliminado, setMensajeEliminado] = useState("");

  // Filtrado de discos.
  const discosFiltrados = discos.filter((d) => {
    if (!textoFiltro.trim()) return true;
    const texto = textoFiltro.toLowerCase();
    return (
      d.nombreDisco?.toLowerCase().includes(texto) ||
      d.grupo?.toLowerCase().includes(texto) ||
      d.genero?.toLowerCase().includes(texto)
    );
  });

  //Guardamos el texto introducido en el input de filtrado, por el cual buscamos discos.
  const manejarCambioFiltro = (e) => {
    setTextoFiltro(e.target.value);
  };

  const limpiarFiltro = () => {
    setTextoFiltro("");
  };

  //Si cuando hacemos toggle se cambia de disco.
  /*   const toggleDisco = (id) => {
    setDiscosFiltrados((prev) =>
      prev.map((d) => (d.id === id ? { ...d, expandido: !d.expandido } : d)),
    );
  }; */

const handleBorrarDisco = async (id) => {
  const discoAEliminar = discos.find(d => String(d.id) === id);
  try {
    await borrarDisco(id);
    console.log("Seteando mensajeEliminado:", discoAEliminar?.nombreDisco); // <-- debug
    setMensajeEliminado(`Disco "${discoAEliminar?.nombreDisco}" eliminado.`);
  } catch {
    console.log("Error al borrar disco");
    setMensajeEliminado("Error al eliminar el disco.");
  }
};

  useEffect(() => {
    if (mensajeEliminado) {
      const timer = setTimeout(() => setMensajeEliminado(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [mensajeEliminado]);

  if (cargando) return <Cargando />;

  return (
    <div className="contenedor-listado-discos">
      <h2>Listado de Discos</h2>

      {/* Sección de filtrado. */}

      <FiltroDiscos
        textoFiltro={textoFiltro}
        onChange={manejarCambioFiltro}
        onLimpiar={limpiarFiltro}
      />
      {/* Mensaje del filtrado */}
      <p>
        Mostrando {discosFiltrados.length} de {discos.length} discos
        {textoFiltro.trim() && ` (filtrados por "${textoFiltro}")`}
      </p>

      <div className="lista-discos">
        {discosFiltrados.map((disco) => (
          <Disco
            key={disco.id}
            disco={disco}
            expandido={discoExpandido === disco.id}
            onToggle={() => toggleDisco(disco.id)}
            onBorrar={() => handleBorrarDisco(disco.id)}
          />
        ))}
      </div>
      {console.log("Render mensajeEliminado:", mensajeEliminado)}
      {mensajeEliminado && (<div className={`mensaje-eliminado ${!mensajeEliminado ? 'oculto' : ''}`}>{mensajeEliminado}</div>)}
      {/* Muestra mensaje al clicar en Borrar. */}
    </div>
  );
};

export default ListadoDiscos;
