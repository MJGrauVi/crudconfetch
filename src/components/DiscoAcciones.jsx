import React from "react";
import { useNavigate } from "react-router-dom";

const DiscoAcciones = ({ disco, onBorrar }) => {
  const navigate = useNavigate();

  return (
    <div className="disco-acciones">
      <button onClick={e => { e.stopPropagation(); navigate(`/discos/editar/${disco.id}`); }}>
        Editar
      </button>
      <button onClick={e => { e.stopPropagation(); onBorrar(); }}>
        Borrar
      </button>
    </div>
  );
};

export default DiscoAcciones;
