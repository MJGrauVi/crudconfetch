import React from 'react'
import { createContext, useState, useEffect } from "react";
import {traerDatos} from '../../biblioteca/funciones.js';

//Creamo el contexto para compartir los datos con el resto de componentes.
const ContextoDiscos = createContext();

const ProveedorDiscos = ({ children }) => {
    const [discos, setDiscos] = useState([]);


    const urlDiscos = "http://localhost:3000/discos";

  // Función para obtener el listado de discos.
  const traerDiscos = async (urlDiscos) => {
    try {
      const listaDiscos = await traerDatos(urlDiscos);
      setDiscos(listaDiscos);
    } catch (error) {
      // Se gestiona el error de forma adecuada.
      console.log(`Error al cargar Discos: ${error.message}`);
      
    }
  };

const guardarDisco = async (datos) => {
   
      const respuesta = await fetch(urlDiscos, {
        method: "POST",
        body: JSON.stringify(datos),
      });

      if (!respuesta.ok) {
        throw new Error(
          `Error en guardarDiscos: ${respuesta.status} - ${respuesta.statusText}`
        );
      }
 
  };

  /**
   * Es necesario, además de la URL, el id del discente a eliminar.
   */

  const borrarDisco = async (id) => {
    
      const respuesta = await fetch(`${urlDiscos}/${id}`, {
        method: "DELETE",
      });

      if (!respuesta.ok) {
        throw new Error(
          `Error en guardarDiscentes: ${respuesta.status} - ${respuesta.statusText}`
        );
      }
  
  };

  /**
   * El flujo para esta acción es:
   *  -> se obtienen los datos de un disco,
   *  -> se meten en un estado que controla un formulario,
   *  -> se recogen los datos del formulario (se comprueban),
   *      se actualizan en la BBDD (total o parcialmente) y
   *  -> se informa al/la usuario/a de forma correcta.
   */

  const editarDiscoCompleto = async (id, datos) => {

      const respuesta = await fetch(`${urlDiscos}/${id}`, {
        method: "PUT",
        body: JSON.stringify(datos),
      });

      if (!respuesta.ok) {
        throw new Error(
          `Error en editarDiscoCompleto: ${respuesta.status} - ${respuesta.statusText}`
        );
      }
  
  };

  const editarDiscoParcial = async (id, datos) => {
   
      const respuesta = await fetch(`${urlDiscos}/${id}`, {
        method: "PATCH",
        body: JSON.stringify(datos),
      });

      if (!respuesta.ok) {
        throw new Error(
          `Error en editarDiscosParcial: ${respuesta.status} - ${respuesta.statusText}`
        );
      }
  
  };

  /**
   * Función asíncrona para ejecutarse en el montaje del componente.
   * Se encapsula el setter del estado en una función
   * para que el contexto mantenga el control del estado.
   */
  const cargarDiscos = async () => {
    let datos = await traerDiscos(urlDiscos);
    setDiscos(datos);
  };
  useEffect(() => {
    cargarDiscos();
  }, []);

    /**
   * Pregunta de diseño.
   * Tras cada modificación, creación o elimincación de los datos
   * ¿es preferible volver a traer los datos o modificar el estado local?
   */
  const datosParaExportar = {
    discos,
    traerDiscos,
    cargarDiscos,
    guardarDisco,
    borrarDisco,
    editarDiscoCompleto,
    editarDiscoParcial,
  };

    return (
        <ContextoDiscos value={{datosParaExportar}}>
            {children}
            </ContextoDiscos>
    )
}

export {ContextoDiscos,ProveedorDiscos};