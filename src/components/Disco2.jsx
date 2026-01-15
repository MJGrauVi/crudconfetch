import React from 'react';
import DiscoDetalle from "./DiscoDetalle.jsx";
import DiscoAcciones from './DiscoAcciones.jsx';
import {useDiscos} from "../hooks/useDiscos.js";

const Disco2 = ({disco}) => {

  //Leer del contexto.
  const{ borrarDisco, discoExpandido, toggleDisco}= useDiscos();
  return (
     <div className="disco-item">
      <div className="disco-imagen">
        {disco.url_caratula ? (
          <img src={disco.url_caratula} alt={disco.nombreDisco} />)
          : (<div className="sin-imagen">Sin imagen</div>)}
      </div> <div className="disco-info" onClick={()=>toggleDisco(disco.id)}>
        <h3>{disco.nombreDisco}</h3>
        <p>{disco.grupo} - {disco.genero}</p>
        {discoExpandido === disco.id && <DiscoDetalle disco={disco} />}
      </div>
      <div className="disco-acciones">
        <DiscoAcciones disco={disco} onBorrar={()=>borrarDisco(disco.id)} />
      </div>
    </div>
  );
};

export default Disco2;