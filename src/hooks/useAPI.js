import { useState } from "react";

export const useAPI = () => {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const solicitud = async (url, options = {}) => {
    setCargando(true);
    setError(null);

    try {
      const respuesta = await fetch(url, {
        headers: { "Content-Type": "application/json" },
        ...options,
      });

      if (!respuesta.ok) {
        throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
      }

      return await respuesta.json();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setCargando(false);
    }
  };
  
/******************************************************************************** */
  //Incluir el ID  del disco un la url para eliminarlo. Ver forma de parametrizar.
  /******************************************************************************* */

  const borrarDisco = (url)=>{
    solicitud(url, {
      method: "DELETE",
    })
  }

  return { cargando, error};
};
