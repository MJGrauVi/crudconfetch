import React from "react";
import { useNavigate } from "react-router-dom";
import "./Disco.css";

const Disco = ({ disco }) => {
  const navigate = useNavigate();
  
  const estaExpandido = disco.expandido || false;
  const caratula = disco.url_caratula || disco.caratula;

  return (
    <div
      className={`disco-item ${estaExpandido ? "disco-expandido" : ""}`}
      data-accion="toggle"
      data-id={disco.id}
    >
      <div className="disco-resumen">
        {/* Imagen de carátula */}
        <div className="disco-imagen">
          {caratula ? (
            <img src={caratula} alt={disco.nombreDisco} />
          ) : (
            <div className="disco-sin-imagen">Sin imagen</div>
          )}
        </div>

        {/* Información básica */}
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

        {/* Botones de acción */}
        <div className="disco-acciones">
          <button
            type="button"
            className="boton-editar"
            data-accion="editar"
            data-id={disco.id}
          >
            Editar
          </button>
          <button
            type="button"
            className="boton-eliminar"
            data-accion="eliminar"
            data-id={disco.id}
          >
            Eliminar
          </button>
        </div>
      </div>

      {/* Información completa */}
      {estaExpandido && (
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
                <img src={caratula} alt={disco.nombreDisco} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Disco;