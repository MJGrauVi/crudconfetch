// FormularioDiscoCampos.jsx
import React from "react";

const FormularioCampos = ({
  disco,
  errores,
  actualizarDato,
  generosMusicales,
  esEdicion
}) => {
  return (
    <>
      {/* Título del formulario */}
      <h2>{esEdicion ? "Editar disco" : "Añadir nuevo disco"}</h2>

      <div className="campo">
        <label>Nombre del disco</label>
        <input
          type="text"
          name="nombreDisco"
          value={disco.nombreDisco}
          onChange={actualizarDato}
        />
        {errores.nombreDisco && <p className="error">{errores.nombreDisco}</p>}
      </div>

      <div className="campo">
        <label>URL carátula</label>
        <input
          type="text"
          name="url_caratula"
          value={disco.url_caratula}
          onChange={actualizarDato}
        />
        {errores.url_caratula && <p className="error">{errores.url_caratula}</p>}
      </div>

      <div className="campo">
        <label>Tipo de grupo</label>
        <input
          type="text"
          name="tipoGrupo"
          value={disco.tipoGrupo}
          onChange={actualizarDato}
        />
      </div>

      <div className="campo">
        <label>Grupo</label>
        <input
          type="text"
          name="grupo"
          value={disco.grupo}
          onChange={actualizarDato}
        />
      </div>

      <div className="campo">
        <label>Género musical</label>
        <select
          name="genero"
          value={disco.genero}
          onChange={actualizarDato}
        >
          <option value="">Seleccione...</option>
          {generosMusicales.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        {errores.genero && <p className="error">{errores.genero}</p>}
      </div>

      <div className="campo">
        <label>Lanzamiento</label>
        <input
          type="text"
          name="lanzamiento"
          value={disco.lanzamiento}
          onChange={actualizarDato}
        />
      </div>

      <div className="campo">
        <label>Localización</label>
        <input
          type="text"
          name="localizacion"
          value={disco.localizacion}
          onChange={actualizarDato}
        />
      </div>

      <div className="campo">
        <label>
          <input
            type="checkbox"
            name="prestado"
            checked={disco.prestado}
            onChange={actualizarDato}
          />
          Prestado
        </label>
      </div>

      <button type="submit">
        {esEdicion ? "Actualizar disco" : "Añadir disco"}
      </button>
    </>
  );
};

export default FormularioCampos;
