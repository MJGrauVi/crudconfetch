import React, { useState, useEffect } from "react";
import "./ListadoDiscos.css";
import Disco from "./Disco.jsx";
import MensajeTemporal from "./MensajeTemporal.jsx";
import Cargando from "./Cargando.jsx";
import FiltroDiscos from "./FiltroDiscos.jsx";
import { useDiscos } from "../hooks/useDiscos.js";

const ListadoDiscos = () => {
  const { discos, cargando, borrarDisco } = useDiscos();

  //Estados.
  const [discosFiltrados, setDiscosFiltrados] = useState([]);
  const [textoFiltro, setTextoFiltro] = useState("");
  const [mensajeEliminado, setMensajeEliminado] = useState("");

  // Filtrado de discos.
  useEffect(() => {
    if (!textoFiltro.trim()) {
      setDiscosFiltrados(discos);
    } else {
      const texto = textoFiltro.toLowerCase().trim();
      setDiscosFiltrados(
        discos.filter(
          (d) =>
            d.nombreDisco?.toLowerCase().includes(texto) ||
            d.grupo?.toLowerCase().includes(texto) ||
            d.genero?.toLowerCase().includes(texto),
        ),
      );
    }
  }, [textoFiltro, discos]);

  //Guardamos el texto introducido en el input de filtrado, por el cual buscamos discos.
  const manejarCambioFiltro = (e) => {
    setTextoFiltro(e.target.value);
  };

  const limpiarFiltro = () => {
    setTextoFiltro("");
  };

  //Si cuando hacemos toggle se cambia de disco.
  const toggleDisco = (id) => {
    setDiscosFiltrados((prev) =>
      prev.map((d) => (d.id === id ? { ...d, expandido: !d.expandido } : d)),
    );
  };

  const handleBorrarDisco = async (id) => {
      try {
        const discoAEliminar = discos.find((d) => d.id === id);
        await borrarDisco(id);
        setMensajeEliminado(
          `Disco "${discoAEliminar?.nombreDisco}" eliminado.`,
        ); //Si discoAEliminar existe utiliza nombreDusco.
      } catch (error) {
        console.error(error);
        setMensajeEliminado("Error al eliminar el disco.");
      }
    };
  
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
            expandido={disco.expandido || false}
            onToggle={() => toggleDisco(disco.id)}
            onBorrar={() => handleBorrarDisco(disco.id)}
          />
        ))}
      </div>

      {mensajeEliminado && <MensajeTemporal texto={mensajeEliminado} />}
      {/* Muestra mensaje al clicar el Borrar. */}
    </div>
  );
};

export default ListadoDiscos;
