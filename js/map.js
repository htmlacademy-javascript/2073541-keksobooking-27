import { activatePage, activateElements } from './page-disable.js';
import { createCard } from './card.js';
import {getData} from './api.js';
import { showAlert } from './user-message.js';
import {filterOffers, onFiltersChange} from './map-filters.js';
import { debounce } from './util.js';

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
const setAddressValue = () => {
  addressField.value = `${coordinates.lat}, ${coordinates.lng}`;
};
setAddressValue();
const map = L.map('map-canvas');

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
const setMainMarker = () => {

  mainMarker.setLatLng(
    coordinates
  );
  map.setView(
    coordinates,
    12);
};

const markerGroup = L.layerGroup().addTo(map);

const createMarkers = (adverts) => {
  adverts.forEach((advert) => {
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
  });};

const onDataLoad = (data) => {
  const filteredOffers = filterOffers(data);
  createMarkers(filteredOffers.slice(0, 10));
};

const onDataFailed = () => {
  const mapForm = document.querySelector('.map__filters');
  const mapFormSelects = mapForm.querySelectorAll('select');
  const mapFormFieldsets = mapForm.querySelectorAll('fieldset');
  mapForm.classList.add('map__filters--disabled');
  showAlert('Не удалось загрузить объявления. Попробуйте ещё раз');
  activateElements(mapFormSelects, false);
  activateElements(mapFormFieldsets, false);
};


const setFilteredMarkers = () => {
  getData((offers) => {
    onDataLoad(offers);
    onFiltersChange(debounce(() => {
      markerGroup.clearLayers();
      onDataLoad(offers);
    }));
  }, onDataFailed);
};

const getMap = () => {
  map.setView(coordinates, 12);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
  map.on('load', activatePage(true));
  setFilteredMarkers();
};


const resetMap = () => {
  setMainMarker();
  setAddressValue();
  map.closePopup();
  markerGroup.clearLayers();
  getData(onDataLoad, onDataFailed);
};

export {resetMap, getMap};
