import React from "react";
import DiscoDetalle from "./DiscoDetalle.jsx";
import DiscoAcciones from "./DiscoAcciones.jsx";
import "./Disco.css";

const Disco = ({ disco, expandido, onToggle, onBorrar }) => {
  return (
    <div className="disco-item">
      <div className="disco-imagen">
        {disco.url_caratula ? (
          <img src={disco.url_caratula} alt={disco.nombreDisco} />)
          : (<div className="sin-imagen">Sin imagen</div>)}
      </div> <div className="disco-info" onClick={onToggle}>
        <h3>{disco.nombreDisco}</h3>
        <p>{disco.grupo} - {disco.genero}</p>
        {expandido && <DiscoDetalle disco={disco} />}
      </div>
      <div className="disco-acciones">
        <DiscoAcciones disco={disco} onBorrar={onBorrar} />
      </div>
    </div>
  );
};

export default Disco;
