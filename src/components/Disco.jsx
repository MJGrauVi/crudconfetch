import { useState } from "react";
import DiscoDetalle from "./DiscoDetalle";
import DiscoAcciones from "./DiscoAcciones";

export default function Disco({ disco, onBorrado }) {
  const [expandido, setExpandido] = useState(false);

  return (
    <div
      className="disco-item"
      onClick={() => setExpandido(!expandido)}
    >
      <h3>{disco.nombreDisco}</h3>

      {expandido && <DiscoDetalle disco={disco} />}

      <DiscoAcciones disco={disco} onBorrado={onBorrado} />
    </div>
  );
}
