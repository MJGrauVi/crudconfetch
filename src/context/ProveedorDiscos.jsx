import { createContext, useEffect, useState, useCallback } from "react";

//Creo contexto donde incluiremos los datos a proveer.
const ContextoDiscos = createContext();

const URL_API = "http://localhost:3001/discos";

const ProveedorDiscos = ({ children }) => {
  const [discos, setDiscos] = useState([]);
  const [cargando, setCargando] = useState(true);

  //El useCallBack evita que cargarDiscos que se pasa como dependencia se recree en cada render.
  const cargarDiscos = useCallback(async () => {
    try {
      setCargando(true);
      const respuesta = await fetch(URL_API);
      if(!respuesta.ok){ 
        throw new Error(
          `Error al cargar Discos: ${respuesta.status} - ${respuesta.statusText}`
        );
      }
      const datos = await respuesta.json();

    //Actualizo el estado para que llegue la información a quien consume los datos.
      setDiscos(datos);
    } catch (error) {
      console.error("Error:", error);
      setDiscos([]);
    } finally {
      setCargando(false);
    }
  }, []);

  const guardarDisco = async (disco) => {
    try {
      await fetch(URL_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(disco),
      });
      await cargarDiscos();
    } catch (error) {
      console.error("Error al guardar disco:", error);
      throw error;
    }
  };

  const borrarDisco = async (id) => {
    try {
      await fetch(`${URL_API}/${id}`, { method: "DELETE" });
      await cargarDiscos();
    } catch (error) {
      console.error("Error al borrar disco:", error);
      throw error;
    }
  };

  const editarDiscoCompleto = async (id, datos) => {
    try {
      await fetch(`${URL_API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });
      await cargarDiscos();
    } catch (error) {
      console.error("Error al editar disco:", error);
      throw error;
    }
  };

  const editarDiscoParcial = async (id, datos) => {
    try {
      await fetch(`${URL_API}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });
      await cargarDiscos();
    } catch (error) {
      console.error("Error al editar disco:", error);
      throw error;
    }
  };

  // Llama a cargarDiscos() al montar el componente por primera vez, carga inicial.
  useEffect(() => {
    cargarDiscos();
  }, [cargarDiscos]);//dependecias que vigila react y que mostrará en caso de que cambien.
 //sin ponemos [] vacio, react lanza warning.
  return (
    <ContextoDiscos.Provider
      value={{
        discos,
        cargando,
        guardarDisco,
        borrarDisco,
        editarDiscoCompleto,
        editarDiscoParcial,
        cargarDiscos,
      }}
    >
      {children}
    </ContextoDiscos.Provider>
  );
};

export default ProveedorDiscos;
export { ContextoDiscos };