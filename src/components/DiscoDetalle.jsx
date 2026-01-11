import React from "react";

const DiscoDetalle = ({ disco }) => {
  return (
    <div className="disco-detalle">
      <p>Año: {disco.lanzamiento}</p>
      <p>Localización: {disco.localizacion}</p>
      <p>Prestado: {disco.prestado ? "Sí" : "No"}</p>
      {/* Aquí puedes añadir más detalles si los hubiera */}
    </div>
  );
};

export default DiscoDetalle;
