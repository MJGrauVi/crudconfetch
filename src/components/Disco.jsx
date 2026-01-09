import React, { useState } from "react";
import "./Disco.css";

const Disco = (props) => {
  const { disco, onEliminar } = props; //desestructuro props.
  const [mostrarCompleto, setMostrarCompleto] = useState(false);

  /* Alterna la visualización de información completa ------------ */
  const alternarInformacion = () => {
    setMostrarCompleto(!mostrarCompleto);
  };

  /* Maneja la eliminación del disco por el id, evita la propagación al hacer clic en el input y elimina el disco. ---*/
  const manejarEliminar = (evento) => {
    evento.stopPropagation(); // Evitar que se propague el evento con el click .
    evento.preventDefault(); // Evitar la recarga de la página.
    onEliminar(disco.id); //LLamada a la función eliminarDisco.
  };

  return (
    <div
      className={`disco-item ${mostrarCompleto ? "disco-expandido" : ""}`}
      onClick={alternarInformacion}
    >
      <div className="disco-resumen">
        {/* Imagen de carátula */}
        <div className="disco-imagen">
          {disco.caratula ? (
            <img src={disco.caratula} alt={disco.nombre} />
          ) : (
            <div className="disco-sin-imagen">Sin imagen</div>
          )}
        </div>

        {/* Información básica */}
        <div className="disco-info-basica">
          <h3 className="disco-nombre">{disco.nombre}</h3>
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

        {/* Botón eliminar */}
        <input
          type="button"
          className="boton-eliminar"
          onClick={manejarEliminar}
          value="Eliminar"
        />
      </div>

      {/* Información completa (se muestra al hacer clic) */}
      {mostrarCompleto && (
        <div className="disco-informacion-completa">
          <div className="disco-detalle">
            <p>
              <strong>Año de publicación:</strong> {disco.anio}
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
            {disco.caratula && (
              <div className="disco-imagen-completa">
                <img src={disco.caratula} alt={disco.nombre} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Disco;
