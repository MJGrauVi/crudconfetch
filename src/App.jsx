import "./App.css";
import { Routes, Route } from "react-router-dom";
import Menu from "./routes/Menu.jsx";
import Rutas from "./routes/Rutas.jsx";
import Contenedor from "./estructura/Contenedor.jsx";
import Header from "./estructura/Header.jsx";
import Footer from "./estructura/Footer.jsx";

const App = () => {
  return (
    <div className="contenedor-app">
      <Header>
        <Menu />
      </Header>

      <Contenedor>
        <Rutas />
      </Contenedor>
      <Footer />
    </div>
  );
};

export default App;
