import { createContext, useEffect, useState } from "react";
import useAPI from "../hooks/useAPI.js";

//Creo el contexto
const ContextoDiscos = createContext();

const URL_API = "http://localhost:3001/discos";

const ProveedorDiscos = ({ children }) => {

  const [discos, setDiscos] = useState([]);

  const { cargando, error, cargarDatos, guardarDatos, editarDatosCompleto, editarParteDatos, borrarDatos } = useAPI();


  const cargarDiscos = async () => {
    try {
      const datos = await cargarDatos(URL_API);
      setDiscos(datos);
    } catch (error) {
      console.error(error);
    }
  };

  const guardarDisco = async (disco) => {
    await guardarDatos(URL_API, disco);
    await cargarDiscos();
  };

  const borrarDisco = async (id) => {
    await borrarDatos(`${URL_API}/${id}`);
    await cargarDiscos();
  };

  const editarDiscoCompleto = async (id, datos) => {
    await editarDatosCompleto(`${URL_API}/${id}`, datos);
    await cargarDiscos();
  };

  const editarDiscoParcial = async (id, datos) => {
    await editarParteDatos(`${URL_API}/${id}`, datos);
    await cargarDiscos();
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
export { ContextoDiscos };
