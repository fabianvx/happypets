/**
   * Menu NavBar
   */
function openNav(){
    document.getElementById("mobile-menu").style.width = "100%";
}

function closeNav(){
    document.getElementById("mobile-menu").style.width = "0%";
}

//Obtener servicios consumiendo un JSON de la misma ruta del proyecto: Servicios.json
async function obtenerServicios() { 
  const response = await fetch("./Servicios.json");
  const json = await response.json();
 
 
let texto;

texto = "<ul>";

   var elements = json;

elements.forEach(element =>   {

texto += "<li>"+element.nombre+ "</li>";
});
texto += "</ul>";

     let datos = document.getElementById("listaServiciosJson");
datos.innerHTML = texto;  
  
} 

//Calculos: Edad
function calcularEdad(fechaNacimiento) {
  var fechaProcesada = new Date(fechaNacimiento);
  
  var fechaActual = new Date();
  var edad = document.getElementById("edad");

  var years = fechaActual.getFullYear() - fechaProcesada.getFullYear();
  var months = fechaActual.getMonth() - fechaProcesada.getMonth();
  
  if (months < 0 || (months === 0 && fechaActual.getDate() < fechaProcesada.getDate()+1)) {
    years--;
  }
  edad.value = years;
 
  if(years<=10 && years>=0){

    alert("Edad minima debe de ser de 10 años");
    return;
  }

}


//Calculos: precio caminatas
function calcularCaminata(canthoras) {  
  var precio = document.getElementById("precio");
  var res=0;  
  if (canthoras>0 && canthoras<1 ) {
    res = 1500;
  }
  if (canthoras>=1 && canthoras<2 ) {
    res = 2500;
  }
  if (canthoras>=2 && canthoras<4 ) {
    res = 4000;
  }
  if (canthoras>=4 && canthoras<6 ) {
    res = 7000;
  }
  if (canthoras>=6 && canthoras<=8 ) {
    res = 9500;
  }
   if(canthoras<=0){

    alert("Por favor digite una cantidad de horas correcta");
    res=0;
    return;
  }
  if(canthoras>8){

    alert("Por favor digite máximo 8 horas");
    res=0;
    return;
  }
  precio.innerHTML = " ₡"+res;   
}


//Calculos: precio banos
function calcularBano(cantPeso) {  
  var precio = document.getElementById("precio");
  var res=0;  
  if (cantPeso>0 && cantPeso<10 ) {
    res = 7000;
  }
  if (cantPeso>=10 && cantPeso<20 ) {
    res = 8500;
  }
  if (cantPeso>=20 && cantPeso<30 ) {
    res = 10500;
  }
  if (cantPeso>=30 && cantPeso<50 ) {
    res = 12500;
  }
  if (cantPeso>=50 && cantPeso<80 ) {
    res = 14500;
  }
  if (cantPeso>=80   ) {
    res = 20000;
  }
   if(cantPeso<=0){

    alert("Por favor digite un peso correcto");
    res=0;
    return;
  }
 
  precio.innerHTML = " ₡"+res;   
}


//Consumo de API GOOGLE MAPS

function initMap() {
        
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 7,
    center: {lat: 10.01688810481482, lng: -84.2130290973807}
 });
  const hpUbicacion = {
lat:  10.079013534733644,
lng: -84.17806226152354,
};   
  infoWindow = new google.maps.InfoWindow();
  infoWindow.setPosition(hpUbicacion);
infoWindow.setContent("Happy Pets");
infoWindow.open(map);
map.setCenter(hpUbicacion);
  const locationButton = document.createElement("button");

locationButton.textContent = "Encontrar ruta";
locationButton.classList.add("custom-map-control-button");
map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
locationButton.addEventListener("click", () => {

if (navigator.geolocation) {
navigator.geolocation.getCurrentPosition(

(position) => {
const pos = {
lat: position.coords.latitude,
lng: position.coords.longitude,
};


const hpUbicacion = {
lat:  10.079013534733644,
lng: -84.17806226152354,
};   
infoWindow.setPosition(hpUbicacion);
infoWindow.setContent("Happy Pets");
infoWindow.open(map);
map.setCenter(hpUbicacion); 
calculateAndDisplayRoute(directionsService, directionsDisplay,pos);
},
() => {
handleLocationError(true, infoWindow, map.getCenter());
},
);
} else {
// Navegador no soporta la geolocalizacion
handleLocationError(false, infoWindow, map.getCenter());
}
});
 /* -------------*/
  directionsDisplay.setMap(map);   

}     


//Manejo de Errores
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
infoWindow.setPosition(pos);
infoWindow.setContent(
browserHasGeolocation
? "Error: The Geolocation service failed."
: "Error: Your browser doesn't support geolocation.",
);
infoWindow.open(map);
}    
function calculateAndDisplayRoute(directionsService, directionsDisplay,originLoc) {     

const hpUbicacion = {
lat:  10.079013534733644,
lng: -84.17806226152354,
};   

  directionsService.route({
    origin: originLoc,
    destination: hpUbicacion,
    travelMode: 'DRIVING'
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
 

    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}


/**
 * Consumo de API REST de imagenes de Perritos
 */
var intervalId = window.setInterval(async function(){
  const response = await fetch("https://dog.ceo/api/breeds/image/random");
  const dogImage = await response.json();
  var imageContainer = document.getElementById("imagenPerro");
  imageContainer.src = dogImage?.message;
}, 3000);







/**
 * Portfolio Galeria de perritos
 */
const portfolioLightbox = GLightbox({
  selector: '.portfolio-lightbox'
});

/**
 * Portfolio details slider
 */
new Swiper('.portfolio-details-slider', {
  speed: 400,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true
  }
});

/**
 * Initiate portfolio details lightbox 
 */
const portfolioDetailsLightbox = GLightbox({
  selector: '.portfolio-details-lightbox',
  width: '90%',
  height: '90vh'
});
 