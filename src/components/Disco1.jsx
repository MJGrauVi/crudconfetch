import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Disco.css";

const Disco1 = (props) => {
  const { disco } = props;
  const navigate = useNavigate();
  const [mostrarCompleto, setMostrarCompleto] = useState(false);

  const alternarInformacion = () => {
    setMostrarCompleto(!mostrarCompleto);
  };

  const manejarEliminar = (evento) => {
    evento.stopPropagation();
    evento.preventDefault();
    if (props.onEliminar) {
      props.onEliminar(disco.id);
    }
  };

  const manejarEditar = (evento) => {
    evento.stopPropagation();
    evento.preventDefault();
    navigate(`/discos/${disco.id}/editar`);
  };

  const caratula = disco.url_caratula || disco.caratula;

  return (
    <div
      className={`disco-item ${mostrarCompleto ? "disco-expandido" : ""}`}
      onClick={alternarInformacion}
    >
      <div className="disco-resumen">
        <div className="disco-imagen">
          {caratula ? (
            <img src={caratula} alt={disco.nombreDisco} />
          ) : (
            <div className="disco-sin-imagen">Sin imagen</div>
          )}
        </div>

        <div className="disco-info-basica">
          <h3 className="disco-nombre">{disco.nombreDisco}</h3>
          <p className="disco-grupo">{disco.grupo}</p>
          <p className="disco-genero">{disco.genero}</p>
          <p className="disco-estado">
            {disco.prestado ? (
              <span className="prestado">Prestado</span>
            ) : (
              <span className="disponible">Disponible</span>
            )}
          </p>
        </div>

        <div className="disco-acciones">
          <button
            type="button"
            className="boton-editar"
            onClick={manejarEditar}
            data-accion="editar"
            data-id={disco.id}
          >
            Editar
          </button>
          <button
            type="button"
            className="boton-eliminar"
            onClick={manejarEliminar}
            data-accion="eliminar"
            data-id={disco.id}
          >
            Eliminar
          </button>
        </div>
      </div>

      {mostrarCompleto && (
        <div className="disco-informacion-completa">
          <div className="disco-detalle">
            <p>
              <strong>Año de publicación:</strong> {disco.lanzamiento || disco.anio}
            </p>
            <p>
              <strong>Localización:</strong> {disco.localizacion}
            </p>
            <p>
              <strong>Estado:</strong>{" "}
              {disco.prestado ? (
                <span className="prestado">Prestado</span>
              ) : (
                <span className="disponible">Disponible</span>
              )}
            </p>
            {caratula && (
              <div className="disco-imagen-completa">
                <img src={caratula} alt={disco.nombre} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Disco1;