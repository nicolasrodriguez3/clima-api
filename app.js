const boton = document.getElementById("btn");
const botonLimpiar = document.getElementById("btn-clear");
const principal = document.getElementById("principal");
const canva = document.getElementById("icon1");
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

			//cambiamos en icono
			actualizarIcono(datos[iterator].weather.description);
			insertIcon(canva, icono);
		}
	}
}

function insertIcon(canva, icono = Skycons.PARTLY_CLOUDY_DAY) {
	const skycons = new Skycons({ color: "white" });
	skycons.set(canva, icono);
	skycons.play();
}

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

			actualizarIcono(data[ciudadRandom].weather.description);
			insertIcon(canva, icono);
		});
});

let icono;
function actualizarIcono(iconoCiudad) {
	switch (iconoCiudad) {
		case "Despejado":
			icono = Skycons.CLEAR_DAY;
			break;
		case "Parcialmente nublado":
			icono = Skycons.PARTLY_CLOUDY_DAY;
			break;
		case "Algo nublado":
			icono = Skycons.PARTLY_CLOUDY_DAY;
			break;
		case "Nublado":
			icono = Skycons.CLOUDY;
			break;
		case "Cubierto":
			icono = Skycons.CLOUDY;
			break;
		case "Cubierto con precipitación a la vista":
			icono = Skycons.CLOUDY;
			break;
		case "Nublado con llovizna":
			icono = Skycons.RAIN;
			break;
		case "Cubierto con tormenta en la hora anterior":
			icono = Skycons.RAIN;
			break;
		case "Nublado con tormenta sin precipitación":
			icono = Skycons.RAIN;
			break;
		case "Cubierto con nevada":
			icono = Skycons.SNOW;
			break;
		case "Cubierto con ventisca baja":
			icono = Skycons.WIND;
			break;
		case "Algo nublado con polvo levantado por viento":
			icono = Skycons.WIND;
			break;
		default:
			console.log(iconoCiudad);
			break;
	}
}
