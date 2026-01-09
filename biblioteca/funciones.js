"use strict";

const traerDatos = async (url) => {
    try{ 
    const respuesta = await fetch(url);

    if (!respuesta.ok) {
        throw new Error(`Error ${respuesta.status} - ${respuesta.statusText}`);
    }
    const datos = await respuesta.json();
    console.log("Los datos llegan:", datos);
    return datos;
    }catch(error){
        // Mostramos error si los hay.
      console.log(`Error en traerDatos: ${error.message}`);
      
    }
}

const traerDatosConPromiseAll = async (urls = []) => {
    return await Promise.all(
        urls.map(url => fetch(url).then(res => res.json()))
    );
};

 const validarFormulario = ({ nombreDisco, tipoGrupo, grupo, genero, lanzamiento, localizacion }) => {
    let errores = [];
    const regExp = /^[A-Za-z\s]{4,}$/;
    const localizaRegExp = /^ES-\d{3}[A-Z]{2}$/;
    const anioRegExp = /^\d{4}$/;
    
    if (!nombreDisco || !regExp.test(nombreDisco)) {
        errores.push("El nombre es obligatorio y debe tener al menos 4 caracteres.");
    }
    if (!tipoGrupo || tipoGrupo.length < 4) {
        errores.push("El tipo de Grupo es obligatorio y debe tener al menos 4 caracteres.");
    }
    if (!grupo || grupo.length < 4) {
        errores.push("El nombre del Grupo o solista es obligatorio y debe tener al menos 4 caracteres.");
    }
    if (!genero) {
        errores.push("El género es obligatorio.");
    }
    if (!lanzamiento || !anioRegExp.test(lanzamiento)) {
        errores.push("El año de lanzamiento es obligatorio.");
    }
    if (!localizacion || !localizaRegExp.test(localizacion.toUpperCase())) {
        errores.push("La localización es obligatoria y debe cumplir el patron (ES-111AA).");
    }
    return errores;

} 

//Añadimos elementos a la interfaz - ok.
const mostrarDatos = (seccion, videojuegos) => {
    seccion.innerHTML = "";
    videojuegos.forEach((v) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `<td>${v.nombre}</td>
        <td>${v.tipoGrupo}</td>
        <td>${v.genero}</td>
        <td><button class="eliminar" data-id="${v.id}">Eliminar</button></td>
        <td><button class="ver" data-id="${v.id}">Ver</button></td>`;
        seccion.appendChild(fila);
    });

}
//Muestra en la seccion indicada el mensaje durante el tiempo indicado.

const mostrarMensaje = (seccion, mensaje, tiempo = 5000) => {
  seccion.innerHTML = "";
  seccion.classList.remove("oculto");

  if (Array.isArray(mensaje)) {
    const ul = document.createElement("ul");

    mensaje.forEach(texto => {
      const li = document.createElement("li");
      li.textContent = texto;
      ul.appendChild(li);
    });

    seccion.appendChild(ul);
  } else {
    seccion.textContent = mensaje;
  }

  setTimeout(() => {
    seccion.classList.add("oculto");
    seccion.innerHTML = "";
  }, tiempo);
};
const filtrarPorGenero = (lista, genero) => {
    const nuevaLista = lista.filter((v) => 
        v.genero === genero
    );
    return !genero ? lista : nuevaLista;
}

const pintarDetalle = async (seccion, juego) => {

    const personajes = await traerDatosConPromiseAll(juego.listado_personajes);
    seccion.innerHTML = `
        <h3>${juego.nombre}</h3>
        <p><strong>Plataforma: </strong>${juego.plataforma_principal ?? "No especificada"}</p>
        <h4>Personajes:</h4>
        <ul>
            ${personajes.map(p => `<li>${p.nombre}</li>`).join("")}
        </ul>
    `;

};


export { traerDatos, validarFormulario, mostrarDatos, mostrarMensaje, filtrarPorGenero, pintarDetalle};