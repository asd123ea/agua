// Posição padrão (São José dos Campos, SP)
var defaultPosition = new google.maps.LatLng(-23.1895062,-45.8630128);

// Definições para uso do Google Maps
var optionsGmaps = {
    center: defaultPosition,
    navigationControlOptions: {
        style: google.maps.NavigationControlStyle.SMALL
    },
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoom: 16
};

var geocoder = new google.maps.Geocoder();
var infowindow = new google.maps.InfoWindow();

var map;
var mapHolderElement = document.getElementById('mapHolder');

function getLocation() {
    if (navigator.geolocation) {
        // Inicializar objeto do Google Maps e exibir o mapa
        map = new google.maps.Map(mapHolderElement, optionsGmaps);
        navigator.geolocation.getCurrentPosition(showPosition, showError);
        mapHolderElement.style.display = "block";
    } else {
        console.log("Geolocation API not supported by your browser");
        document.getElementById('mapholder').innerHTML = '<p>Não foi possível obter a localização.</p>';
    }
}

function showPosition(position) {
    // Instanciar objeto 'LatLng' para uso do Google Maps
    var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    // Criar marcação para o objeto 'LatLng'
    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        title: "Você está aqui"
    });

    // Centralizar o mapa de acordo com a marcação
    map.panTo(latlng);
    
    geocoder.geocode({
        'latLng': latlng
    }, reverseGeocoderSuccess);
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            console.log("ERROR: User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("ERROR: Location information is unavailable.");
            break;
        case error.TIMEOUT:
            console.log("ERROR: The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred.");
            break;
        default:
            console.log("ERROR!");
    }
}

function reverseGeocoderSuccess(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
        infowindow.setContent(results[1].formatted_address);
        // Display address as text in the page
        longName = results[0].address_components[3].long_name || results[0].address_components[4].long_name;
        if (longName != undefined) {
            document.getElementById('cityName').value = longName;
        }
    } else {
        console.log("ERROR: No surface address found!");
    }
}