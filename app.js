const boton = document.getElementById("btn");
const botonLimpiar = document.getElementById("btn-clear");
const principal = document.getElementById("principal");
const icon = document.getElementById("icon1");
const listaCiudades = document.getElementById("lista-ciudades");

let datos;

boton.addEventListener("click", function () {
	fetch("https://ws.smn.gob.ar/map_items/weather")
		.then((data) => data.json())
		.then((data) => {
			mostrarDatos(datos);
		});
});

// obtener los elementos html
const ciudadNombre = document.querySelector(".ciudad-nombre");
const temp = document.querySelector(".temperatura-grados");
const descripcion = document.querySelector(".temperatura-descripcion");

function mostrarDatos(datos) {
	// obtenemos la ciudad del usuario
	const ciudadUsuario = document.getElementById("miCiudad").value;
	// iteramos la API buscando la ciudad del usuario
	for (const iterator in datos) {
		if (datos[iterator].name == ciudadUsuario) {
			//modificamos los elementos HTML
			ciudadNombre.textContent = datos[iterator].name;
			temp.textContent = datos[iterator].weather.temp + "°";
			descripcion.textContent = datos[iterator].weather.description;
		}
	}
}

function insertIcon(canva) {
	const skycons = new Skycons({ color: "white" });
	skycons.add(canva, Skycons.PARTLY_CLOUDY_DAY);
	skycons.play();
}

insertIcon(icon);

//cargar las opciones en la lista de ciudades
window.addEventListener("load", function () {
	fetch("https://ws.smn.gob.ar/map_items/weather")
		.then((data) => data.json())
		.then((data) => {
			datos = data;
			data.forEach((ciudad) => {
				//crear opciones
				let opcion = document.createElement("option");
				opcion.value = ciudad.name;
				//insertar la ciudad en la lista
				listaCiudades.appendChild(opcion);
			});
			let ciudadRandom = Math.floor(Math.random() * data.length);
			ciudadNombre.textContent = data[ciudadRandom].name;
			temp.textContent = data[ciudadRandom].weather.temp;
			descripcion.textContent = data[ciudadRandom].weather.description;
		});
});

switch (datos[1].weather.temp) {
}
