import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ContextoDiscos } from "../context/ProveedorDiscos";

export default function DiscoAcciones({ disco, onBorrado }) {
  const { borrarDisco } = useContext(ContextoDiscos);
  const navigate = useNavigate();

  const eliminar = async () => {
    await borrarDisco(disco.id);
    onBorrado(`Disco "${disco.nombreDisco}" eliminado`);
  };

  return (
    <div
      className="disco-acciones"
      onClick={e => e.stopPropagation()}
    >
      <button onClick={() => navigate(`/discos/${disco.id}/editar`)}>
        Editar
      </button>

      <button onClick={eliminar}>
        Eliminar
      </button>
    </div>
  );
}
