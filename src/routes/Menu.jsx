import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css";

const Menu = () => {
  return (
    <>
      <nav>
        <Link className="menu-elemento" to="/">
          Inicio
        </Link>
        <Link className="menu-elemento" to="/contenedor">
          Insertar disco
        </Link>
        <Link className="menu-elemento" to="/listadoDiscos">
          Listar disco
        </Link>
      </nav>
    </>
  );
};

export default Menu;
