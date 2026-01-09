import "./Inicio.css";

/* -----------Presentación de la aplicación de gestión de discos -------------------*/
const Inicio = () => {
  return (
    <div className="contenedor-inicio">
      <h1>Mi Colección de Discos</h1>
      <div className="presentacion">
        <p className="descripcion">
          Bienvenido a tu aplicación de gestión de colección de discos. Aquí
          podrás gestionar toda tu colección musical de forma sencilla y
          organizada.
        </p>

        <div className="caracteristicas">
          <h2>Características principales:</h2>
          <ul>
            <li>
              <strong>Insertar discos:</strong> Añade discos a tu
              colección con toda su información (nombre, grupo, año, género,
              localización, etc.)
            </li>
            <li>
              <strong>Listar discos:</strong> Visualiza todos tus discos de
              forma organizada. Haz clic en cualquier disco para ver su
              información completa.
            </li>
            <li>
              <strong>Filtrar:</strong> Busca discos por nombre, grupo o género
              para encontrar rápidamente lo que buscas.
            </li>
            <li>
              <strong>Eliminar:</strong> Gestiona tu colección eliminando
              discos que ya no necesites.
            </li>
            <li>
              <strong>Persistencia:</strong> Todos tus datos se guardan
              automáticamente en tu navegador, por lo que no perderás tu
              colección al cerrar la aplicación.
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Inicio;
