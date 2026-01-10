import React from "react";
import { useNavigate } from "react-router-dom";
import "./Disco.css";

const Disco2 = ({ disco }) => {
  const navigate = useNavigate();
  
  // Usar el atributo expandido del disco en lugar de estado local
  const estaExpandido = disco.expandido || false;
  
  // Función para navegar a editar (sin stopPropagation)
  const manejarNavegacionEditar = (e) => {
    e.preventDefault();
    navigate(`/discos/${disco.id}/editar`);
  };

  const caratula = disco.url_caratula || disco.caratula;
  const nombreDisco = disco.nombreDisco || disco.nombre;

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
            <img src={caratula} alt={nombreDisco} />
          ) : (
            <div className="disco-sin-imagen">Sin imagen</div>
          )}
        </div>

        {/* Información básica */}
        <div className="disco-info-basica">
          <h3 className="disco-nombre">{nombreDisco}</h3>
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
            onClick={manejarNavegacionEditar}
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
                <img src={caratula} alt={nombreDisco} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Disco2;