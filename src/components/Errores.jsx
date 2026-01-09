import React, { Fragment } from "react";
import "./Errores.css";

const Errores = ({ erroresMostrar }) => {
  // La desestructuración de arriba es equivalente a la siguiente línea:
  //const { erroresMostrar } = props;
  // Que a su vez equivale al método tradicional:
  //const erroresMostrar = props.erroresMostrar;
 
  return (
    <>
      <h2>Control de errores.</h2>
      <div className={erroresMostrar.length ? "errores" : "sinErrores"}>
        {erroresMostrar.length
          ? erroresMostrar.map((valor, indice) => {
              return <h4 key={indice}>{valor}</h4>;
            })
          : "No se han encontrado errores en el formulario."}
      </div>
    </>
  );
};

export default Errores;
