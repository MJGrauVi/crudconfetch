import React, { useState, useEffect, useRef } from "react";
import "./ListadoDiscos.css";
import Disco from "./Disco.jsx";
import MensajeTemporal from "./MensajeTemporal.jsx";
import {
  cargarDiscosDesdeLocalStorage,
  guardarDiscosEnLocalStorage,
} from "../../biblioteca/funciones.js";

const ListadoDiscos = () => {
  const [discos, setDiscos] = useState([]);
  const [discosFiltrados, setDiscosFiltrados] = useState([]);
  const [textoFiltro, setTextoFiltro] = useState("");
  const [mensajeEliminado, setMensajeEliminado] = useState("");

  const yaCargado = useRef(false);

  useEffect(() => {
    if (!yaCargado.current) {
      const discosCargados = cargarDiscosDesdeLocalStorage();
      setDiscos(discosCargados);
      setDiscosFiltrados(discosCargados);
      yaCargado.current = true;
    }
  }, []);

  useEffect(() => {
    if (!textoFiltro.trim()) {
      setDiscosFiltrados(discos);
    } else {
      const textoBusqueda = textoFiltro.toLowerCase().trim();
      setDiscosFiltrados(
        discos.filter(
          (disco) =>
            disco.nombre.toLowerCase().includes(textoBusqueda) ||
            disco.grupo.toLowerCase().includes(textoBusqueda) ||
            disco.genero.toLowerCase().includes(textoBusqueda)
        )
      );
    }
  }, [textoFiltro, discos]);

  const manejarCambioFiltro = (e) => setTextoFiltro(e.target.value);
  const limpiarFiltro = () => setTextoFiltro("");

  const eliminarDisco = (idDisco) => {
    const discoEliminado = discos.find((d) => d.id === idDisco);
    const discosActualizados = discos.filter((d) => d.id !== idDisco);
    setDiscos(discosActualizados);
    guardarDiscosEnLocalStorage(discosActualizados);

    setMensajeEliminado(`Disco "${discoEliminado?.nombre || ""}" eliminado.`);
  };

  /* Delegación de eventos en el contenedor */
  const manejarClickDelegado = (e) => {
    const accion = e.target.dataset.accion;
    const id = e.target.dataset.id;

    if (accion === "eliminar") {
      eliminarDisco(id);
    } else if (accion === "toggle") {
      const index = discosFiltrados.findIndex((d) => d.id === id);
      if (index !== -1) {
        const nuevoListado = [...discosFiltrados];
        nuevoListado[index].expandido = !nuevoListado[index].expandido;
        setDiscosFiltrados(nuevoListado);
      }
    }
  };

  useEffect(() => {
    if (mensajeEliminado) {
      const timer = setTimeout(() => setMensajeEliminado(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [mensajeEliminado]);

  return (
    <div className="contenedor-listado-discos">
      <h2>Listado de Discos</h2>

      <MensajeTemporal texto={mensajeEliminado} />

      <div className="controles-filtrado">
        <div className="campo-filtro">
          <label htmlFor="filtro-texto">Filtrar discos:</label>
          <input
            type="text"
            id="filtro-texto"
            value={textoFiltro}
            onChange={manejarCambioFiltro}
            placeholder="Buscar por nombre, grupo o género..."
          />
        </div>
        <button
          type="button"
          onClick={limpiarFiltro}
          disabled={!textoFiltro.trim()}
        >
          Limpiar
        </button>
      </div>

      <div className="info-listado">
        <p>
          Mostrando {discosFiltrados.length} de {discos.length} discos
          {textoFiltro.trim() && ` (filtrados por "${textoFiltro}")`}
        </p>
      </div>

      {/* Lista de discos con delegación */}
      <div className="lista-discos" onClick={manejarClickDelegado}>
        {discosFiltrados.map((disco) => (
          <Disco key={disco.id} disco={disco} />
        ))}
      </div>
    </div>
  );
};

export default ListadoDiscos;
