import { createContext, useEffect, useState, useCallback } from "react";

const ContextoDiscos = createContext();

const API = "http://localhost:3001/discos";

const ProveedorDiscos = ({ children }) => {
  const [discos, setDiscos] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Función estable con useCallback
  const cargarDiscos = useCallback(async () => {
    try {
      setCargando(true);
      const res = await fetch(API);
      const data = await res.json();
      setDiscos(data);
    } catch (error) {
      console.error("Error al cargar discos:", error);
      setDiscos([]);
    } finally {
      setCargando(false);
    }
  }, []);

  const guardarDisco = async (disco) => {
    try {
      await fetch(API, {
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
      await fetch(`${API}/${id}`, { method: "DELETE" });
      await cargarDiscos();
    } catch (error) {
      console.error("Error al borrar disco:", error);
      throw error;
    }
  };

  const editarDiscoCompleto = async (id, datos) => {
    try {
      await fetch(`${API}/${id}`, {
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
      await fetch(`${API}/${id}`, {
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

  // Cargar discos al montar el componente
  useEffect(() => {
    cargarDiscos();
  }, [cargarDiscos]);

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