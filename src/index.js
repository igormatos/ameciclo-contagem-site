
require('normalize.css/normalize.css');
require('./styles/index.scss');

document.addEventListener("DOMContentLoaded", () => {

    /*   const pluginsTriggerElement = document.getElementById('plugins-trigger');
      const pluginsElement = document.getElementById('plugins');
  
      const pluginsVisibleClass = "splash-overview-plugins__list--visible";
  
      pluginsTriggerElement.onclick = () => {
          pluginsElement.classList.toggle(pluginsVisibleClass);
      } */

    const menu = document.querySelector('.menu');
    const menu_container = document.querySelector('.menu-fullscreen');
    const body = document.querySelector('body');

    menu.addEventListener('click', function () {
        if (menu.classList.contains('open')) {
            menu.classList.remove('open');
            menu.classList.add('close');
            menu_container.classList.add('hidden');
            body.classList.remove('overflow-y-disabled');
        } else {
            menu.classList.remove('close');
            menu.classList.add('open');
            menu_container.classList.remove('hidden');
            body.classList.add('overflow-y-disabled');
        }
    });
    
    function groupBy(xs, f) {
        return xs.reduce((r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r), {});
    }
   
    mapboxgl.accessToken = 'pk.eyJ1IjoicGxhdGFmb3JtYWFtZWNpY2xvIiwiYSI6ImNrZmhncmt0bjA1MXIydnBtY2YwaGlkaTUifQ.bR5YMTLBM-upxAzXYChYeQ';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v10',
        zoom: 11,
        center: [-34.945277, -8.0584364]
    });

    map.addControl(new mapboxgl.NavigationControl());
    getDataCouting().then(allCounts => {
        var featureCollection = {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': []
            }
        }
        
        var countsGroupedByLocation = groupBy(allCounts, (count) => count.name)
        
        Object.entries(countsGroupedByLocation).forEach(element => {
            var locationName = element[0]
            var locationCountsList = element[1]
            var feature = {
                "type": "Feature",
                "properties": {
                    "icon": "bicycle"
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": element[1][0].location.coordinates.reverse()
                }
            }
            
            feature.properties.description = `<strong>${locationName}</strong> <br> <ul>`
            locationCountsList.forEach(specificCount => {
                feature.properties.description += `<li><a href="#">Total: ${specificCount.summary.total} (${specificCount.date.split('T')[0]})</a></li>`
            });

            feature.properties.description += "</ul>"

            featureCollection.data.features.push(feature)
        });

        map.addSource('places', featureCollection)
        
        
        map.addLayer({
            'id': 'places',
            'type': 'symbol',
            'source': 'places',
            'layout': {
                'icon-image': '{icon}-15',
                'icon-allow-overlap': true
            }
        });

        map.on('click', 'places', function (e) {
            var coordinates = e.features[0].geometry.coordinates.slice();
            var description = e.features[0].properties.description;

            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(description)
                .addTo(map);
        });

        map.on('mouseenter', 'places', function () {
            map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', 'places', function () {
            map.getCanvas().style.cursor = '';
        });

    });

});
