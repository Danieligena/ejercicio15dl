	/* No entiendo por qué no funciona con $(document).ready :C */
	var url = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/';
	var key = '4bf8f98a6c50da72ce8c5e41da3e870a/';
	var resumen = $('.resumen')
	var imagen = $('.img-responsive');
	var queryParams = ['exclude=[minutely,hourly,daily,alerts,flags]','lang=es','units=auto'];
	var coords = {
		ari: {
			lat: -18.4782534,
			lng: -70.31259879999999
		},
		iqq: {
			lat: -20.2307033,
			lng: -70.1356692
		},
		antof: {
			lat: -23.6509279,
			lng: -70.39750219999996
		},
		copia: {
			lat: -27.3665763,
			lng: -70.33215869999998
		},
		lase: {
			lat: -29.9026691,
			lng: -71.25193739999997
		},
		valpo: {
			lat: -33.047238,
			lng: -71.61268849999999
		},
		scl: {
			lat: -33.4488897,
			lng: -70.6692655
		},
		rcg: {
			lat: -34.17013240000001,
			lng: -70.7406259
		},
		tlc: {
			lat: -35.4232444,
			lng: -71.64848039999998
		},
		ccp: {
			lat: -36.8201352,
			lng: -73.0443904
		},
		tmc: {
			lat: -38.7359018,
			lng: -72.59037390000003
		},
		vldv: {
			lat: -39.8195857,
			lng: -73.2452103
		},
		montt: {
			lat: -41.468917,
			lng: -72.9411364
		},
		coyha: {
			lat: -45.5712254,
			lng: -72.068265
		},
		ptaar: {
			lat: -53.1638329,
			lng: -70.91706829999998
		},
	}
	var img = {
		'clear-day': 'img/clearday.png',
		'clear-night': 'img/clearnight.png',
		'rain': 'img/rain.png',
		'snow': 'img/snow.png',
		'sleet': 'img/wind.png',
		'wind':'img/wind.png',
		'fog': 'img/fog.png',
		'cloudy': 'img/cloudy.png',
		'partly-cloudy-day': 'img/partlycloudyday.png',
		'partly-cloudy-night': 'img/partlycloudynight.png'
	}

	//Google Maps
	var map;
	var marker;
	var chile = {lat: -35.675147, lng: -71.54296899999997};
    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
        	center: chile,
        	zoom: 4
        });
        marker = new google.maps.Marker({
			position: chile,
			map: map
			});
    }

    //Dark Sky + Google Maps
	$('.select').on('change', function (){
		var coordenadas = coords[$(this).val()]
		//centra el nuevo mapa en --> nuevo mapa + coordenadas
		map.setCenter(new google.maps.LatLng(coordenadas));
		//entrega nuevo zoom al mapa nuevo
		map.setZoom(13);
		//elimina el marcador anterior
		marker.setMap();
		//entrega un nuevo marcador con las coordenadas nuevas
		marker = new google.maps.Marker({
			position: coordenadas,
			map: map
			});
		$.ajax({
			url: url + key + coords[$(this).val()].lat + ',' + coords[$(this).val()].lng + '?' + queryParams[0] + '&' + queryParams[1] + '&' + queryParams[2],
			method: 'GET',
			}).then(function (data) {
				resumen.text(parseInt((data.currently.temperature)) + '° ' + (data.currently.summary));
				imagen.attr('src', img[data.currently.icon]);
			})
	})