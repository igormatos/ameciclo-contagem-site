function groupBy(xs, f) {
    return xs.reduce((r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r), {});
}

function addCountsOnTable(counts) {
    var tableBody = document.getElementById("table-body")
    
    counts.forEach(count => {
        var item = document.createElement("tr")

        //date column
        var dateNode = document.createTextNode(count.date.split("T")[0])
        var dateTd = document.createElement("td")

        dateTd.setAttribute("scope", "row")
        dateTd.classList.add("text-center")
        dateTd.appendChild(dateNode)
        item.appendChild(dateTd)        

         //place column
         var placeNode = document.createTextNode(count.name)
         var placeTd = document.createElement("td")

         placeTd.classList.add("text-left")
         placeTd.appendChild(placeNode)
         item.appendChild(placeTd)           

         //totalCount column
         var totalCountNode = document.createTextNode(count.summary.total)
         var totalCountTd = document.createElement("td")

         totalCountTd.classList.add("text-center")
         totalCountTd.appendChild(totalCountNode)   
         item.appendChild(totalCountTd)           

         //download data column
         var downloadNode = document.createTextNode("CSV / JSON")
         var downloadTd = document.createElement("td")

         downloadTd.classList.add("text-right")
         downloadTd.appendChild(downloadNode) 
         item.appendChild(downloadTd)           

        tableBody.appendChild(item)
    })
    console.log(document.getElementsByClassName("tbody"))
}

window.onload = function () {
    mapboxgl.accessToken = 'pk.eyJ1IjoicGxhdGFmb3JtYWFtZWNpY2xvIiwiYSI6ImNrZmhncmt0bjA1MXIydnBtY2YwaGlkaTUifQ.bR5YMTLBM-upxAzXYChYeQ';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v10',
        zoom: 11,
        center: [-34.945277, -8.0584364]
    });

    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.FullscreenControl());


    getDataCouting().then(allCounts => {
        var featureCollection = {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': []
            }
        }

        addCountsOnTable(allCounts)

        var countsGroupedByLocation = groupBy(allCounts, (count) => count.name)
        var countsGroupedArray = Object.entries(countsGroupedByLocation)

        var locationsCountNode = document.createTextNode(countsGroupedArray.length)
        document.getElementById("locations-count").appendChild(locationsCountNode)

        countsGroupedArray.forEach(element => {
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

        map.scrollZoom.disable();


    });

    getCountsSummary().then(globalSummary => {
        var totalAmountNode = document.createTextNode(globalSummary[0].totalAmount)
        document.getElementById("total-amount").appendChild(totalAmountNode)

        var numberOfCountsNode = document.createTextNode(globalSummary[0].numberOfCounts)
        document.getElementById("counts-number").appendChild(numberOfCountsNode)

        var maximumValueNode = document.createTextNode(globalSummary[0].MaximumValue)
        document.getElementById("maximum-value").appendChild(maximumValueNode)
    
    })

}