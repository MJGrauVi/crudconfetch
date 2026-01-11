const DiscoDetalle =({ disco }) => {
  return (
    <div className="disco-detalle">
      <p><strong>Grupo:</strong> {disco.grupo}</p>
      <p><strong>Género:</strong> {disco.genero}</p>
      <p><strong>Año:</strong> {disco.lanzamiento}</p>
      <p><strong>Ubicación:</strong> {disco.localizacion}</p>
    </div>
  );
}
export default DiscoDetalle;