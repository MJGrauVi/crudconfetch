import "./Inicio.css";

/* ----------- Presentación de la aplicación de gestión de discos ------------------- */
const Inicio = () => {
  return (
    <div className="contenedor-inicio">
      <h1>Mi Colección de Discos</h1>

      <div className="presentacion">
        <p className="descripcion">
          Bienvenido a tu aplicación de gestión de discos. Aquí podrás organizar,
          consultar y mantener al día toda tu colección musical de forma sencilla
          e intuitiva.
        </p>

        <div className="caracteristicas">
          <h2>Características principales:</h2>
          <ul>
            <li>
              <strong>Listar discos:</strong> Visualiza toda tu colección de manera
              clara y ordenada. Puedes desplegar cada disco para ver su información
              detallada.
            </li>

            <li>
              <strong>Insertar discos:</strong> Añade nuevos discos indicando su
              nombre, grupo, género, año de lanzamiento, localización y más.
            </li>

            <li>
              <strong>Editar discos:</strong> Modifica fácilmente cualquier dato
              de un disco ya registrado si necesitas corregir o actualizar
              información.
            </li>

            <li>
              <strong>Filtrar:</strong> Encuentra rápidamente un disco buscando por
              nombre, grupo o género mediante el filtro integrado.
            </li>

            <li>
              <strong>Eliminar:</strong> Retira de tu colección aquellos discos que
              ya no quieras conservar.
            </li>

            <li>
              <strong>Persistencia automática:</strong> Todas las operaciones
              (añadir, editar o eliminar) se guardan automáticamente en la base de
              datos, manteniendo tu colección siempre actualizada.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
