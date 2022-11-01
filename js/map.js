import { activatePage } from './page-disable.js';
import { getSimilarAdverts } from './data.js';
import { createCard } from './card.js';

const addressField = document.querySelector('#address');

const MAIN_PIN = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});
const PIN = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});
const coordinates = {
  lat: 35.68948,
  lng: 139.69170,
};
addressField.value = `${coordinates.lat}, ${coordinates.lng}`;

const map = L.map('map-canvas')
  .setView(coordinates, 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

map.on('load', activatePage(true));


const mainMarker = L.marker(
  coordinates,
  {
    draggable: true,
    icon: MAIN_PIN
  }
).addTo(map);


mainMarker.on('moveend', (evt) => {
  const address = evt.target.getLatLng();
  const latitude = address.lat.toFixed(5);
  const longitude = address.lng.toFixed(5);
  addressField.value = `${latitude}, ${longitude}`;
});
const markerGroup = L.layerGroup().addTo(map);
const createMarker = (advert) => {
  const marker = L.marker(
    {
      lat: advert.location.lat,
      lng: advert.location.lng,
    },
    {
      draggable: false,
      icon: PIN
    }
  );
  marker.addTo(markerGroup);
  marker.bindPopup(createCard(advert));
};

const adverts = getSimilarAdverts();
for (const advert of adverts) {
  createMarker(advert);
}


