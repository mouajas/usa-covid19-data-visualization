// website for csv files
// https://github.com/CSSEGISandData/COVID-19

// variable to hold map
let myMap;
// variable to hold canvas 
let canvas;
// a new mappa instance using leaflet
let mappa = new Mappa('Leaflet');

// map options
let options = {
  lat: 40,
  lng: -96,
  zoom: 4,
  style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png" // link to visual of map
}

function setup() {
  canvas = createCanvas(640,640);
  // tile map with options
  myMap = mappa.tileMap(options);
  // overlay tilemap on canvas
  myMap.overlay(canvas);
  fill('green');
  // only redraw point when map changes, not every frame
  myMap.onChange(drawPoint);

  // load covid 19 data from given csv file
  covidCases = loadTable('usa-covid19.csv', 'csv', 'header');
}

function draw() {
  
}

function drawPoint() {
  clear(); // clears the previous canvas every frame
  
  for (var i = 0; i < covidCases.getRowCount(); i++) {
    // lat and long of every state
    var latitute = Number(covidCases.getString(i, 'Lat'));
    var longitude = Number(covidCases.getString(i, 'Long_'));

    if (myMap.map.getBounds().contains({lat: latitute, lng: longitude})) {
      var pos = myMap.latLngToPixel(latitute, longitude);

      ellipse(pos.x, pos.y, 5, 5);
    }
  }
}