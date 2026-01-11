import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./FormularioDisco.css";
import Errores from "./Errores.jsx";
import { validarDiscoCompleto } from "../../biblioteca/funciones.js";
import { ContextoDiscos } from "../context/ProveedorDiscos.jsx";

const FormularioDisco = () => {
  const { discos, guardarDisco, editarDiscoCompleto } =
    useContext(ContextoDiscos); //Para consumir los datos del contexto.
  const { id } = useParams(); //Obtenemos el id del elemento que queremos editar.
  const navigate = useNavigate(); //Para redirigir despues de actualizar un disco.
  const esEdicion = !!id;

  // Valores iniciales del formulario
  const valoresIniciales = {
    nombreDisco: "",
    url_caratula: "",
    tipoGrupo: "",
    grupo: "",
    genero: "",
    lanzamiento: "",
    localizacion: "",
    prestado: false,
  };

  const [disco, setDisco] = useState(valoresIniciales);
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });

  const generosMusicales = ["Rock", "Pop", "Jazz", "Clásica"];

  // Cargar datos del disco si estamos editando
  useEffect(() => {
    if (esEdicion && discos.length > 0) {
      const discoEncontrado = discos.find((d) => d.id === id);
      if (discoEncontrado) {
        setDisco({
          nombreDisco: discoEncontrado.nombreDisco || "",
          url_caratula: discoEncontrado.url_caratula || "",
          tipoGrupo: discoEncontrado.tipoGrupo || "",
          grupo: discoEncontrado.grupo || "",
          genero: discoEncontrado.genero || "",
          lanzamiento: discoEncontrado.lanzamiento || "",
          localizacion: discoEncontrado.localizacion || "",
          prestado: discoEncontrado.prestado || false,
        });
      }
    }
  }, [id, discos, esEdicion]);

  /* Actualiza el estado del formulario cuando cambia un campo */
/*   const actualizarDato = (e) => {
    const { name, value, type, checked } = e.target;
    const nuevoValor = type === "checkbox" ? checked : value;

    const discoActualizado = {
      ...disco,
      [name]: nuevoValor,
    };

    setDisco(discoActualizado);
    setMensaje({ tipo: "", texto: "" });

    validarCampo(discoActualizado, name);
  }; */
    const actualizarDato = (evento) => {
    const { name, value, type, checked } = evento.target;
    const nuevoValor = type === "checkbox" ? checked : value;

    // Usar función de actualización para asegurar que se actualiza correctamente
    setDisco((prevDisco) => ({
      ...prevDisco, [name]: nuevoValor,
    }));
    
    setMensaje({ tipo: "", texto: "" });
    validarCampo(name, nuevoValor);
  };

  /* Valida un campo específico del formulario */
  const validarCampo = (nombreCampo, valor) => {
    setDisco((prevDisco) => {
      const discoTemporal = { ...prevDisco, [nombreCampo]: valor };
      const erroresCompletos = validarDiscoCompleto(discoTemporal);

      // Si se modifica tipoGrupo o nombreGrupo, validar ambos campos
      if (nombreCampo === "tipoGrupo" || nombreCampo === "nombreGrupo") {
        setErrores((erroresPrevios) => ({
          ...erroresPrevios,
          grupo: erroresCompletos.grupo || [],
        }));
      } else {
        setErrores((erroresPrevios) => ({
          ...erroresPrevios,
          [nombreCampo]: erroresCompletos[nombreCampo] || [],
        }));
      }

      return discoTemporal;
    });
  };
/*   const validarCampo = (discoActualizado, campo) => {
    const erroresCompletos = validarDiscoCompleto(discoActualizado);

    setErrores((prev) => ({
      ...prev,
      [campo]: erroresCompletos[campo] || [],
    }));
  }; */
  const manejarEnvio = async (evento) => {
    evento.preventDefault();

    // Validar todos los campos
    const erroresCompletos = validarDiscoCompleto(disco);
    setErrores(erroresCompletos);

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

    try {
      // Crear el objeto disco completo según la estructura de la API
      const discoCompleto = {
        id: esEdicion ? id : crypto.randomUUID(),
        nombreDisco: disco.nombreDisco.trim(),
        url_caratula: disco.url_caratula.trim(),
        tipoGrupo: disco.tipoGrupo,
        grupo: disco.grupo.trim(),
        genero: disco.genero,
        lanzamiento: disco.lanzamiento.trim(),
        localizacion: disco.localizacion.toUpperCase().trim(),
        prestado: disco.prestado,
        listado_canciones: [],
      };

      if (esEdicion) {
        await editarDiscoCompleto(id, discoCompleto);
        setMensaje({
          tipo: "exito",
          texto: `Disco "${discoCompleto.nombreDisco}" actualizado correctamente.`,
        });
        setTimeout(() => {
          navigate("/listadoDiscos");
        }, 1500);
      } else {
        await guardarDisco(discoCompleto);
        setMensaje({
          tipo: "exito",
          texto: `Disco "${discoCompleto.nombreDisco}" añadido correctamente a la colección.`,
        });
      }

      setDisco(valoresIniciales);
      setErrores({});
    } catch (error) {
      setMensaje({
        tipo: "error",
        texto: "Error al guardar el disco. Por favor, inténtelo de nuevo.",
      });
    }
  };

  const obtenerClaseError = (nombreCampo) => {
    return errores[nombreCampo] && errores[nombreCampo].length > 0
      ? "campo-error"
      : "";
  };

  const todosLosErrores = Object.values(errores).flat();

  return (
    <div className="contenedor-formulario-disco">
      <h2>{esEdicion ? "Editar Disco" : "Insertar Disco"}</h2>
      <form onSubmit={manejarEnvio} className="formulario-disco">
        {/* Nombre del disco */}
        <div className="campo-formulario">
          <label htmlFor="nombreDisco">
            Nombre del disco <span className="obligatorio">*</span>
          </label>
          <input
            type="text"
            id="nombreDisco"
            name="nombreDisco"
            value={disco.nombreDisco}
            onChange={actualizarDato}
            className={`input-formulario ${obtenerClaseError("nombreDisco")}`}
            placeholder="Título del disco"
          />
        </div>

        {/* Carátula del disco */}
        <div className="campo-formulario">
          <label htmlFor="url_caratula">Carátula del disco (URL)</label>
          <input
            type="text"
            id="url_caratula"
            name="url_caratula"
            value={disco.url_caratula}
            onChange={actualizarDato}
            className="input-formulario"
            placeholder="https://caratula-disco.jpg..."
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
              />
              Solista
            </label>
          </div>
        </div>

        {/* Nombre del grupo o solista */}
        <div className="campo-formulario">
          <label htmlFor="grupo">
            Nombre <span className="obligatorio">*</span>
          </label>
          <input
            type="text"
            id="grupo"
            name="grupo"
            value={disco.grupo}
            onChange={actualizarDato}
            className={`input-formulario ${obtenerClaseError("grupo")}`}
            placeholder="Nombre del grupo o solista"
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

        {/* Año de publicación */}
        <div className="campo-formulario">
          <label htmlFor="lanzamiento">
            Año de publicación <span className="obligatorio">*</span>
          </label>
          <input
            type="text"
            id="lanzamiento"
            name="lanzamiento"
            value={disco.lanzamiento}
            onChange={actualizarDato}
            className={`input-formulario ${obtenerClaseError("anio")}`}
            placeholder="YYYY"
            maxLength="4"
          />
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

        <button type="submit" className="boton-guardar">
          {esEdicion ? "Actualizar Datos" : "Guardar"}
        </button>
      </form>

      {mensaje.texto && (
        <div
          className={`mensaje-formulario ${mensaje.tipo === "exito" ? "mensaje-exito" : "mensaje-error"
            }`}
        >
          {mensaje.texto}
        </div>
      )}

      {todosLosErrores.length > 0 && (
        <Errores erroresMostrar={todosLosErrores} />
      )}
    </div>
  );
};

export default FormularioDisco;
