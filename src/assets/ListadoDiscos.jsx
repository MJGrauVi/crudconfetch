import React, { useState, useEffect, useContext } from "react";
import "./ListadoDiscos.css";
import Disco from "./Disco.jsx";
import MensajeTemporal from "../components/MensajeTemporal.jsx";
import Cargando from "../components/Cargando.jsx";
import { ContextoDiscos } from "../context/ContextoDiscos.jsx";
import { useNavigate } from "react-router-dom";

const ListadoDiscos = () => {
  const { discos, cargando, borrarDisco } = useContext(ContextoDiscos);
  const navigate = useNavigate();
  const [discosFiltrados, setDiscosFiltrados] = useState([]);
  const [textoFiltro, setTextoFiltro] = useState("");
  const [mensajeEliminado, setMensajeEliminado] = useState("");

  useEffect(() => {
    if (!textoFiltro.trim()) {
      setDiscosFiltrados(discos);
    } else {
      const textoBusqueda = textoFiltro.toLowerCase().trim();
      setDiscosFiltrados(
        discos.filter(
          (disco) =>
            disco.nombre?.toLowerCase().includes(textoBusqueda) ||
            disco.grupo?.toLowerCase().includes(textoBusqueda) ||
            disco.genero?.toLowerCase().includes(textoBusqueda)
        )
      );
    }
  }, [textoFiltro, discos]);

  const manejarCambioFiltro = (e) => setTextoFiltro(e.target.value);
  const limpiarFiltro = () => setTextoFiltro("");

  const eliminarDiscoHandler = async (idDisco) => {
    try {
      const discoEliminado = discos.find((d) => d.id === idDisco);
      await borrarDisco(idDisco);
      setMensajeEliminado(`Disco "${discoEliminado?.nombre || ""}" eliminado.`);
    } catch (error) {
      setMensajeEliminado("Error al eliminar el disco.");
    }
  };

  // Función auxiliar para encontrar el disco-item padre navegando manualmente
  const encontrarDiscoItem = (elemento) => {
    let actual = elemento;
    while (actual && actual !== document.body) {
      if (actual.classList && actual.classList.contains('disco-item')) {
        return actual;
      }
      actual = actual.parentElement;
    }
    return null;
  };

  // Función auxiliar para verificar si un elemento está dentro de disco-acciones
  const estaEnDiscoAcciones = (elemento) => {
    let actual = elemento;
    while (actual && actual !== document.body) {
      if (actual.classList && actual.classList.contains('disco-acciones')) {
        return true;
      }
      actual = actual.parentElement;
    }
    return false;
  };

  /* Delegación de eventos sin closest y sin stopPropagation */
  const manejarClickDelegado = (e) => {
    const elemento = e.target;

    // Verificar si el elemento clickeado tiene data-accion directamente
    if (elemento.dataset && elemento.dataset.accion) {
      const accion = elemento.dataset.accion;
      const id = elemento.dataset.id;

      if (accion === "eliminar" && id) {
        eliminarDiscoHandler(id);
        return;
      }

      if (accion === "editar" && id) {
        navigate(`/discos/${id}/editar`);
        return;
      }

      if (accion === "toggle" && id) {
        // Si se hizo clic directamente en el disco-item
        const index = discosFiltrados.findIndex((d) => d.id === id);
        if (index !== -1) {
          const nuevoListado = [...discosFiltrados];
          nuevoListado[index].expandido = !nuevoListado[index].expandido;
          setDiscosFiltrados(nuevoListado);
        }
        return;
      }
    }

    // Si es un botón, no hacer toggle
    if (elemento.tagName === 'BUTTON') {
      return;
    }

    // Si el elemento está dentro de disco-acciones, no hacer toggle
    if (estaEnDiscoAcciones(elemento)) {
      return;
    }

    // Buscar el disco-item padre navegando manualmente
    const discoItem = encontrarDiscoItem(elemento);
    if (discoItem && discoItem.dataset && discoItem.dataset.accion === "toggle") {
      const id = discoItem.dataset.id;
      if (id) {
        const index = discosFiltrados.findIndex((d) => d.id === id);
        if (index !== -1) {
          const nuevoListado = [...discosFiltrados];
          nuevoListado[index].expandido = !nuevoListado[index].expandido;
          setDiscosFiltrados(nuevoListado);
        }
      }
    }
  };

  useEffect(() => {
    if (mensajeEliminado) {
      const timer = setTimeout(() => setMensajeEliminado(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [mensajeEliminado]);

  if (cargando) {
    return <Cargando />;
  }

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

      <div className="lista-discos" onClick={manejarClickDelegado}>
        {discosFiltrados.map((disco) => (
          <Disco key={disco.id} disco={disco} />
        ))}
      </div>
    </div>
  );
};

export default ListadoDiscos;