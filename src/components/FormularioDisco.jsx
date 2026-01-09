import React, { useState } from "react";
import "./FormularioDisco.css";
import Errores from "./Errores.jsx";
import {
  validarFormulario,

} from "../../biblioteca/funciones.js";

/* Formulario controlado para insertar discos */
const FormularioDisco = ({ onDiscoGuardado }) => {
  // Valores iniciales del formulario
  const valoresIniciales = {
    nombreDisco: "",
    tipoGrupo: "",
    grupo: "",
    genero: "",
    lanzamiento: "",
    localizacion: "",
    caratula: "",
    prestado: false
  };

  // Estado para los valores del formulario.
  const [disco, setDisco] = useState(valoresIniciales);

  // Estado para los errores de validación por campo
  const [errores, setErrores] = useState({});

  // Estado para mensajes de confirmación o error.
  const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });

  // Géneros musicales.
  const generosMusicales = ["Rock", "Pop", "Jazz", "Clásica"];

  /* Actualiza el estado del formulario cuando cambia un campo,evento - Evento del input*/
  const actualizarDato = (evento) => {
    const { name, value, type, checked } = evento.target;
    const nuevoValor = type === "checkbox" ? checked : value;

    setDisco({
      ...disco,
      [name]: nuevoValor,
    });
    // Limpiar mensaje al modificar el formulario.
    setMensaje({ tipo: "", texto: "" });
    // Validar el campo modificado en tiempo real.
    validarCampo(name, nuevoValor);
  };

  /* Valida un campo específico del formulario*/
  const validarCampo = (nombreCampo, valor) => {
    const discoTemporal = { ...disco, [nombreCampo]: valor };
    const erroresCompletos = validarFormulario(discoTemporal);

    // Si se modifica tipoGrupo o nombreGrupo, validar ambos campos
    if (nombreCampo === "tipoGrupo" || nombreCampo === "nombreGrupo") {
      setErrores((erroresPrevios) => ({
        ...erroresPrevios,
        grupo: erroresCompletos.grupo || [],
      }));
    } else {
      // Actualizar solo los errores del campo modificado
      setErrores((erroresPrevios) => ({
        ...erroresPrevios,
        [nombreCampo]: erroresCompletos[nombreCampo] || [],
      }));
    }
  };

  /**
   * Maneja el envío del formulario
   * @param {Event} evento - Evento del formulario
   */

  const manejarEnvio = (evento) => {
    evento.preventDefault();

    // Validar todos los campos
    const erroresCompletos = validarFormulario(disco);
    setErrores(erroresCompletos);

    // Verificar si hay errores
    const hayErrores = Object.values(erroresCompletos).some(
      (erroresCampo) => erroresCampo.length > 0
    );

    if (hayErrores) {
      setMensaje({
        tipo: "error",
        texto: "Por favor, corrija los errores en el formulario.",
      });
      return;
    }

    // Crear el objeto disco completo
    const nuevoDisco = {
      id: crypto.randomUUID,
      nombreDisco: disco.nombre.trim(),
      tipoGrupo: disco.tipoGrupo,
      grupo: disco.nombreGrupo.trim(),
      genero: disco.genero,
      lanzamiento: disco.anio.trim(),
      localizacion: disco.localizacion.toUpperCase().trim(),
      caratula: disco.caratula.trim(),
      prestado: disco.prestado,
    };

    // Cargar discos existentes y añadir el nuevo
    

    // Guardar en localStorage
   

    // Mostrar mensaje de confirmación
    setMensaje({
      tipo: "exito",
      texto: `Disco "${nuevoDisco.nombre}" añadido correctamente a la colección.`,
    });

    // Limpiar el formulario
    setDisco(valoresIniciales);
    setErrores({});

    // Notificar al componente padre si existe la función
    if (onDiscoGuardado) {
      onDiscoGuardado();
    }
  };

  /* Devuelve la cadena si array errores existe y es distinto de 0, si tiene mensaje*/
  const obtenerClaseError = (nombreCampo) => {
     return errores[nombreCampo] && errores[nombreCampo].length > 0 ? "campo-error" : "";
  };

  // Obtener todos los mensajes de error para el componente Errores.
  const todosLosErrores = Object.values(errores).flat();

  return (
    <div className="contenedor-formulario-disco">
      <h2>Insertar Disco</h2>
      <form onSubmit={manejarEnvio} className="formulario-disco">
        {/* Nombre del disco */}
        <div className="campo-formulario">
          <label htmlFor="nombre">
            Nombre del disco <span className="obligatorio">*</span>{/* <!--Marco con asterisco rojo los campos obligatorios.--> */}
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={disco.nombre}
            onChange={actualizarDato}
            className={`input-formulario ${obtenerClaseError("nombre")}`}
            placeholder="Título del disco"
          />
        </div>

        {/* Carátula del disco */}
        <div className="campo-formulario">
          <label htmlFor="caratula">Carátula del disco (URL)</label>
          <input
            type="text"
            id="caratula"
            name="caratula"
            value={disco.caratula}
            onChange={actualizarDato}
            className="input-formulario"
            placeholder="https://caralula-disco.jpg..."
          />
        </div>

        {/* Tipo: Grupo musical o Solista */}
        <div className="campo-formulario">
          <label>
            Grupo de música o solista <span className="obligatorio">*</span>
          </label>
          <div className="radio-group">
            <label className="label-radio">
              <input
                type="radio"
                name="tipoGrupo"
                value="Grupo musical"
                checked={disco.tipoGrupo === "Grupo musical"}
                onChange={actualizarDato}
              />
              Grupo musical
            </label>
            <label className="label-radio">
              <input
                type="radio"
                name="tipoGrupo"
                value="Solista"
                checked={disco.tipoGrupo === "Solista"}
                onChange={actualizarDato}
                autoComplete="off"
              />
              Solista
            </label>
          </div>
        </div>

        {/* Nombre del grupo o solista */}
        <div className="campo-formulario">
          <label htmlFor="nombreGrupo">
            Nombre <span className="obligatorio">*</span>
          </label>
          <input
            type="text"
            id="nombreGrupo"
            name="nombreGrupo"
            value={disco.nombreGrupo}
            onChange={actualizarDato}
            className={`input-formulario ${obtenerClaseError("grupo")}`}
            placeholder="Nombre del grupo o solista"
          />
        </div>

        {/* Año de publicación */}
        <div className="campo-formulario">
          <label htmlFor="anio">
            Año de publicación <span className="obligatorio">*</span>
          </label>
          <input
            type="text"
            id="anio"
            name="anio"
            value={disco.anio}
            onChange={actualizarDato}
            className={`input-formulario ${obtenerClaseError("anio")}`}
            placeholder="YYYY"
            maxLength="4"
          />
        </div>

        {/* Género musical */}
        <div className="campo-formulario">
          <label htmlFor="genero">
            Género de música <span className="obligatorio">*</span>
          </label>
          <select
            id="genero"
            name="genero"
            value={disco.genero}
            onChange={actualizarDato}
            className={`input-formulario ${obtenerClaseError("genero")}`}
          >
            <option value="">Seleccione un género</option>
            {generosMusicales.map((genero) => (
              <option key={genero} value={genero}>
                {genero}
              </option>
            ))}
          </select>
        </div>

        {/* Localización */}
        <div className="campo-formulario">
          <label htmlFor="localizacion">
            Localización <span className="obligatorio">*</span>
          </label>
          <input
            type="text"
            id="localizacion"
            name="localizacion"
            value={disco.localizacion}
            onChange={actualizarDato}
            className={`input-formulario ${obtenerClaseError("localizacion")}`}
            placeholder="ES-001AA"
            /* style={{ textTransform: "uppercase" }} */
          />
        </div>

        {/* Prestado */}
        <div className="campo-formulario">
          <label htmlFor="prestado" className="label-checkbox">
            <input
              type="checkbox"
              id="prestado"
              name="prestado"
              checked={disco.prestado}
              onChange={actualizarDato}
              className="checkbox-formulario"
            />
            Prestado
          </label>
        </div>

        {/* Botón Guardar */}
        <button type="submit" className="boton-guardar">
          Guardar
        </button>
      </form>

      {/* Plantilla con el mensaje de confirmación o error */}
      {mensaje.texto && (
        <div
          className={`mensaje-formulario ${
            mensaje.tipo === "exito" ? "mensaje-exito" : "mensaje-error"
          }`}
        >
          {mensaje.texto}
        </div>
      )}

      {/* Componente de errores */}
      {todosLosErrores.length > 0 && (
        <Errores erroresMostrar={todosLosErrores} />
      )}
    </div>
  );
};

export default FormularioDisco;
