//Map initialisation (coordinates, zoom level)
//L.map("map", {lat, long}) and zoom + tileLayer; <--initial map center
const map = L.map("map").setView([50, 40], 3);

//layers --> https://leaflet-extras.github.io/leaflet-providers/preview/
//can add layers later for design
let openStreetMap = L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: "abcd",
    maxZoom: 20,
  }
);

//create map
openStreetMap.addTo(map);

//open popup when clicked + coordinates
function markerClick(e) {
  const marker = e.target;
  const { lat, lng } = map.mouseEventToLatLng(e.originalEvent);
  console.log(lat + lng);

  //popup content
  const popupContent = `
<b>Hello traveler</b>
<br>
<a href="/create-post?lat=${lat}&lng=${lng}">
<button>Tell us more</button>
</a>`;

  //create popup - bind popup to marker
  const popup = L.popup().setContent(popupContent);
  marker.bindPopup(popup).togglePopup();
}

//double click to drop marker
map.on("dblclick", function (e) {
  //latlng - property name used in leaflet library for coordinates; (6, to fix coordinates decimal places)
  const latitude = e.latlng.lat.toFixed(8);
  const longitude = e.latlng.lng.toFixed(8);

  const marker = L.marker([latitude, longitude]).addTo(map);

  //attach fucntion to open popup on click
  marker.on("click", markerClick);
});