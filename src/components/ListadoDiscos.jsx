import { useContext, useMemo, useState } from "react";
import { ContextoDiscos } from "../context/ProveedorDiscos";
import Disco from "./Disco";
import Cargando from "./Cargando";
import MensajeTemporal from "./MensajeTemporal";

const ListadoDiscos = () =>{
  const { discos, cargando } = useContext(ContextoDiscos);
  const [filtro, setFiltro] = useState("");
  const [mensaje, setMensaje] = useState("");

  const discosFiltrados = useMemo(() => {
    const texto = filtro.toLowerCase().trim();
    if (!texto) return discos;

    return discos.filter(d =>
      d.nombreDisco.toLowerCase().includes(texto) ||
      d.grupo.toLowerCase().includes(texto) ||
      d.genero.toLowerCase().includes(texto)
    );
  }, [filtro, discos]);

  if (cargando) return <Cargando />;

  return (
    <div className="contenedor-listado-discos">
      <h2>Listado de Discos</h2>

      <MensajeTemporal texto={mensaje} />

      <input
        value={filtro}
        onChange={e => setFiltro(e.target.value)}
        placeholder="Buscar por nombre, grupo o género"
      />

      <p>
        Mostrando {discosFiltrados.length} de {discos.length}
      </p>

      <div className="lista-discos">
        {discosFiltrados.map(disco => (
          <Disco
            key={disco.id}
            disco={disco}
            onBorrado={setMensaje}
          />
        ))}
      </div>
    </div>
  );
}
export default ListadoDiscos;
