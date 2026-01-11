import React from "react";
import DiscoDetalle from "./DiscoDetalle.jsx";
import DiscoAcciones from "./DiscoAcciones.jsx";

const Disco = ({ disco, expandido, onToggle, onBorrar }) => {
  return (
    <div className="disco-item" onClick={onToggle}>
      {disco.url_caratula ? (
        <img src={disco.url_caratula} alt={disco.nombreDisco} />
      ) : null}
      <div className="disco-info">
        <h3>{disco.nombreDisco}</h3>
        <p>{disco.grupo} - {disco.genero}</p>
        {expandido && <DiscoDetalle disco={disco} />}
      </div>
      <DiscoAcciones disco={disco} onBorrar={onBorrar} />
    </div>
  );
};

export default Disco;
