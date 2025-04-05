# USGS Earthquake Visualization

## Overview

This project visualizes recent earthquake data from the United States Geological Survey (USGS) on an interactive map using the Leaflet JavaScript library. The visualization allows users to see the locations of earthquakes, understand their magnitude through the size of markers, and their depth through the color of the markers. A legend is included to provide context for the depth-based color coding.

This project represents the completion of Part 1: Create the Earthquake Visualization of the assignment. The optional Part 2: Gather and Plot More Data was not undertaken for this submission.

## Technologies Used

* **Leaflet:** An open-source JavaScript library for mobile-friendly interactive maps.
* **D3.js:** A JavaScript library for manipulating documents based on data (used here for fetching the GeoJSON data).
* **HTML:** The structure of the web page.
* **CSS:** Styling for the map and legend.
* **USGS GeoJSON Feed:** A real-time data source for earthquake information.

## Files Included

* `index.html`: The main HTML file that sets up the webpage, includes the Leaflet and D3 libraries, links to the CSS and JavaScript files, and contains the `div` element for the map.
* `style.css`: Contains the CSS rules for styling the map container and the legend.
* `static/js/logic.js` : Contains the JavaScript code that fetches earthquake data from the USGS, creates the Leaflet map, plots the earthquakes as circle markers, adds popups with earthquake information, and creates the legend.

## The Visualization
The map should load, centered on USA view, and display earthquake markers based on the data fetched from the USGS. You can zoom in and out, pan the map, and click on the markers to see more information about each earthquake. The legend in the bottom right corner explains the color coding for earthquake depth.

## Data Source

The earthquake data is fetched from the USGS GeoJSON Feed: [https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson) (or a similar feed as configured in `logic.js`).  For this assignment, I select the earthequake data in the past 7 days. 

## Customization

* **Earthquake Data Feed:** You can change the USGS data feed in the `d3.json()` call in `logic.js` to visualize different datasets (e.g., earthquakes from the past day, past 7 days, or with different magnitude thresholds).
* **Initial Map View:** Modify the `center` and `zoom` options in the `L.map()` initialization in `logic.js` to set a different initial view of the map.
* **Marker Styling:** Adjust the `getRadius` and `getColor` functions in `logic.js` to change how the size and color of the earthquake markers are determined.
* **Color Palette:** Modify the `colors` array in the legend's `onAdd` function in `logic.js` to use a different color scheme for the depth legend.
* **Legend Depth Intervals:** Change the `depths` array in the legend's `onAdd` function in `logic.js` to adjust the depth ranges displayed in the legend.
* **Base Map:** You can experiment with different tile layers for the base map by changing the URL in the `L.tileLayer()` definition in `logic.js`.

## References
* Dataset created by the United States Geological Surveym (https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)
* Acknowledgement: Code research and debugging assistance provided by Google, Leaflet open source (https://leafletjs.com/) and Latitude and Longitude Finder (https://www.latlong.net/)