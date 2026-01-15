import React from 'react';
import "./Disco.css";
import DiscoAcciones from './DiscoAcciones.jsx';
import {useDiscos} from "../hooks/useDiscos.js";
import DiscoInfo from './DiscoInfo.jsx';

const Disco = ({disco}) => {

  //Leer del contexto.
  const{ borrarDisco}= useDiscos();
  return (
     <div className="disco-item">
      <div className="disco-imagen">
        {disco.url_caratula ? (
          <img src={disco.url_caratula} alt={disco.nombreDisco} />)
          : (<div className="sin-imagen">Sin imagen</div>)}
      </div> 
      <DiscoInfo disco={disco}/>
      <div className="disco-acciones">
      <DiscoAcciones disco={disco} onBorrar={()=>borrarDisco(disco.id)} />
      </div>
    </div>
  );
};

export default Disco;