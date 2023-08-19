/**
   * Menu NavBar
   */
function openNav(){
    document.getElementById("mobile-menu").style.width = "100%";
}

function closeNav(){
    document.getElementById("mobile-menu").style.width = "0%";
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

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 10.01688810481482, lng: -84.2130290973807 },  
    zoom: 9,
  });
  
  infoWindow = new google.maps.InfoWindow();

  const locationButton = document.createElement("button");

  locationButton.textContent = "Ver mi ubicacion";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("Ubicacion encontrada");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        },
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
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

window.initMap = initMap;


function calcularDistancia() {
  // Obtener las coordenadas de los dos puntos
  var punto1 = new google.maps.LatLng(9.936266379263435, -84.09252243680388); // San jose
  var punto2 = new google.maps.LatLng(10.016841998823672, -84.21333899160999); // Alajuela
  // Calcular la distancia entre los dos puntos en metros
  var distancia = google.maps.geometry.spherical.computeDistanceBetween(punto1, punto2);

  // Mostrar la distancia en la página
  var distanciaKM = (distancia/1000).toFixed(2);
  var resultado = document.getElementById("resultado");
  resultado.innerHTML = "La distancia entre San Jose y Alajuela es de " + distanciaKM + " km.";
}

/**
   * Porfolio isotope and filter
   */
window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
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

