// Create the 'basemap' tile layer that will be the background of our map.
let basemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Create the map object with center and zoom options.
let map = L.map("map", {
  center: [37.09, -95.71], // Set the initial center of the map
  zoom: 4.5, // Set the initial zoom level
  layers: [basemap] // Add the 'basemap' tile layer to the map
});

// Then add the 'basemap' tile layer to the map. (Already done in the map initialization)

// OPTIONAL: Step 2
// Create the layer groups, base maps, and overlays for our two sets of data, earthquakes and tectonic_plates.
let earthquakes = new L.layerGroup();  // Create a layer group for earthquakes

//Define the basemap layers and overlays for the layer control. 
let baseMaps = {
  "OpenStreetMap": basemap,
};

let overlays = {
    "Earthquakes": earthquakes,  // Add the earthquakes layer group to the overlays
};

// Add a control to the map that will allow the user to change which layers are visible.
L.control.layers(baseMaps, overlays).addTo(map);

// Make a request that retrieves the earthquake geoJSON data.  Get the data from the USGS website.
// This data is for all earthquakes in the past 7 days.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function (data) {

  // This function returns the style data for each of the earthquakes we plot on
  // the map. Pass the magnitude and depth of the earthquake into two separate functions
  // to calculate the color and radius.
  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.geometry.coordinates[2]), // Depth
      color: "#000000",
      radius: getRadius(feature.properties.mag), // Magnitude
      stroke: true,
      weight: 0.5
    };
  }

  // This function determines the color of the marker based on the depth of the earthquake.
  function getColor(depth) {
    if (depth > 90) return "#bd0026"; 
    else if (depth > 70) return "#f03b20";  
    else if (depth > 50) return "#fd8d3c"; 
    else if (depth > 30) return "#f768a1"; 
    else if (depth > 10) return "#d4b9da"; 
    else return "#98ee00"; // Green
    }
  
  // This function determines the radius of the earthquake marker based on its magnitude.
  function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1; // Minimum radius
    }
    return magnitude * 4; // Radius based on magnitude
  }

  // Add a GeoJSON layer to the map once the file is loaded.
  L.geoJson(data, {
    // Turn each feature into a circleMarker on the map.
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng);
    },
    // Set the style for each circleMarker using our styleInfo function.
    style: styleInfo,
    // Create a popup for each marker to display the magnitude and location of the earthquake after the marker has been created and styled
    onEachFeature: function (feature, layer) {
      layer.bindPopup(`Magnitude: ${feature.properties.mag}<br>Location: 
        ${feature.properties.place}<br>Depth: ${feature.geometry.coordinates[2]} km`);
    }

  // Add the data to the earthquake layer instead of directly to the map.
  }).addTo(earthquakes);

  // Add the earthquake layer to our map.
  earthquakes.addTo(map);

  // Create a legend control object.
  let legend = L.control({
    position: "bottomright"
  });

  // Then add all the details for the legend
  legend.onAdd = function () {
    let div = L.DomUtil.create("div", "info legend");

    // Initialize depth intervals and colors for the legend
    let depths = [0, 10, 30, 50, 70, 90];
    let colors = ["#98ee00", "#d4b9da", "#f768a1", "#fd8d3c", "#f03b20", "#bd0026"];

    // Loop through our depth intervals to generate a label with a colored square for each interval.
    for (let i = 0; i < depths.length; i++){
      div.innerHTML +=
        "<i style='background:" + colors[i] + "'></i> " +
        depths[i] + (depths[i + 1] ? "&ndash;" + depths[i + 1] + "<br>" : "+");
    }
    return div;
  };

  // Finally, add the legend to the map.
  legend.addTo(map);
});
