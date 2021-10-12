var boton = document.getElementById("btn");
var botonLimpiar = document.getElementById("btn-clear");
var principal = document.getElementById("principal");

var datos;
boton.addEventListener("click", function () {
	fetch("https://ws.smn.gob.ar/map_items/weather")
		.then((data) => data.json())
		.then((data) => {
			datos = data;
			mostrarDatos(datos);
		});
});

function mostrarDatos(datos) {
	console.log(datos);
	var ciudadUsuario = document.getElementById("ciudad").value;
	console.log(ciudadUsuario);

	//crear los elementos html
	var section = document.createElement("section");
	var temp = document.createElement("span");
	var city = document.createElement("h1");
	var description = document.createElement("p");

	//modificar atributos
	section.className = "tarjetas";
	section.style = 'background: "#FFF"';
	temp.className = "temp";
	city.className = "city";
	description.className = "description";

	var indexCity = -1;
	for (const iterator in datos) {
		console.log(datos[iterator].name);
		if (datos[iterator].name == ciudadUsuario) {
			indexCity = iterator;
			console.log(indexCity);
			break;
		} else {
			indexCity = null;
		}
	}
	if (!indexCity) {
		section.innerHTML = "<p>" + ciudadUsuario + " no existe</p>";
	} else {
		console.log(indexCity);

		//añadir contenido
		temp.textContent = datos[indexCity].weather.tempDesc;
		city.textContent = datos[indexCity].name;
		description.textContent = datos[indexCity].weather.description;

		//crear la tarjeta con los elementos
		section.appendChild(temp);
		section.appendChild(city);
		section.appendChild(description);
	}
	//insertar la tarjeta
	principal.appendChild(section);
}

//corregir
botonLimpiar.addEventListener("click", function () {
	section = document.getElementsByClassName("tarjetas");
	console.log(section);
	var nroTarjetas = section.length;
	for (let i = 0; i < nroTarjetas; i++) {
		//principal.removeChild(section[i]);
		section[i].remove();
	}
});
