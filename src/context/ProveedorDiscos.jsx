import { createContext, useEffect, useState } from "react";
import { useAPI } from "../hooks/useAPI.js";

//Creo el contexto
const ContextoDiscos = createContext();

const URL_API = "http://localhost:3001/discos";

const ProveedorDiscos = ({ children }) => {
 // const { cargando, error, solicitud } = useAPI();
  const [discos, setDiscos] = useState([]);

  //
const {cargarndo, error}= useAPI();

  const cargarDiscos = async () => {
    try{
    const datos = await solicitud(URL_API);
    setDiscos(datos);
    }catch(error){
      throw error;
    }
  };



  const guardarDisco = async (disco) => {
    await solicitud(URL_API, {
      method: "POST",
      body: JSON.stringify(disco),
    });
    cargarDiscos();
  };

  const borrarDisco = async (id) => {
    await solicitud(`${URL_API}/${id}`, { method: "DELETE" });
    cargarDiscos();
  };

  const editarDiscoCompleto = async (id, datos) => {
    await solicitud(`${URL_API}/${id}`, {
      method: "PUT",
      body: JSON.stringify(datos),
    });
    cargarDiscos();
  };

  const editarDiscoParcial = async (id, datos) => {
    await solicitud(`${URL_API}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(datos),
    });
    cargarDiscos();
  };

  useEffect(() => {
    cargarDiscos();
  }, []);

  return (
    <ContextoDiscos.Provider
      value={{
        discos,
        cargando,
        error,
        cargarDiscos,
        guardarDisco,
        borrarDisco,
        editarDiscoCompleto,
        editarDiscoParcial,
      }}
    >
      {children}
    </ContextoDiscos.Provider>
  );
};
export default ProveedorDiscos;
export {ContextoDiscos};
