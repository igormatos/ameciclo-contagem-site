
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
    
    menu.addEventListener('click', function() {
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

    /* var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

    mapboxgl.accessToken =
        'pk.eyJ1IjoicGF0b21hcnF1ZXMiLCJhIjoiY2tldnliYjh5MGZkaDJybnh1OWJpODYzbSJ9.njmQ_Vp0NEtJb004VkIouw'; */
   /*  var map = new mapboxgl.Map({
        container: 'map-ciclists-count',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-122.486052, 37.830348],
        zoom: 15
    });


    map.on('load', function () {
        map.addSource('route', {
            'type': 'geojson',
            'data': {
                'type': 'Feature',
                'properties': {},
                'geometry': {
                    'type': 'LineString',
                    'coordinates': [
                        [-122.48369693756104, 37.83381888486939],
                        [-122.48348236083984, 37.83317489144141],
                        [-122.48339653015138, 37.83270036637107],
                        [-122.48356819152832, 37.832056363179625],
                        [-122.48404026031496, 37.83114119107971],
                        [-122.48404026031496, 37.83049717427869],
                        [-122.48348236083984, 37.829920943955045],
                        [-122.48356819152832, 37.82954808664175],
                        [-122.48507022857666, 37.82944639795659],
                        [-122.48610019683838, 37.82880236636284],
                        [-122.48695850372314, 37.82931081282506],
                        [-122.48700141906738, 37.83080223556934],
                        [-122.48751640319824, 37.83168351665737],
                        [-122.48803138732912, 37.832158048267786],
                        [-122.48888969421387, 37.83297152392784],
                        [-122.48987674713133, 37.83263257682617],
                        [-122.49043464660643, 37.832937629287755],
                        [-122.49125003814696, 37.832429207817725],
                        [-122.49163627624512, 37.832564787218985],
                        [-122.49223709106445, 37.83337825839438],
                        [-122.49378204345702, 37.83368330777276]
                    ]
                }
            }
        });
        map.addLayer({
            'id': 'route',
            'type': 'line',
            'source': 'route',
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                'line-color': '#888',
                'line-width': 8
            }
        });
    }); */

});
