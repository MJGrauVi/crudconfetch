const MensajeTemporal = ({ texto }) => {
  if (!texto) return null;

  return (
    <div className="mensaje-eliminado">
      <p>{texto}</p>
    </div>
  );
};

export default MensajeTemporal;

