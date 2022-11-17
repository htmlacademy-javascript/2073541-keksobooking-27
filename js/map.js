import { activatePage, activateElements } from './page-disable.js';
import { createCard } from './card.js';
import { getData } from './api.js';
import { showAlert } from './user-message.js';
import { getFilteredOffers, onFiltersChange } from './map-filters.js';
import { debounce } from './util.js';

const addressField = document.querySelector('#address');
const mapForm = document.querySelector('.map__filters');
const mapFormSelects = mapForm.querySelectorAll('select');
const mapFormFieldsets = mapForm.querySelectorAll('fieldset');

const START_COORDINATES = {
  lat: 35.68948,
  lng: 139.69170,
};

const MAIN_ICON_SIZE = [52, 52];
const MAIN_ICON_ANCHOR = [26, 52];
const OFFER_ICON_SIZE = [40, 40];
const OFFER_ICON_ANCHOR = [20, 40];
const DEFAULT_ZOOM = 12;

const MAIN_PIN = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: MAIN_ICON_SIZE,
  iconAnchor: MAIN_ICON_ANCHOR
});
const PIN = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: OFFER_ICON_SIZE,
  iconAnchor: OFFER_ICON_ANCHOR
});

const setAddressValue = () => {
  addressField.value = `${START_COORDINATES.lat}, ${START_COORDINATES.lng}`;
};
setAddressValue();
const map = L.map('map-canvas');

const mainMarker = L.marker(
  START_COORDINATES,
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
    START_COORDINATES
  );
  map.setView(
    START_COORDINATES,
    DEFAULT_ZOOM);
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
  createMarkers(getFilteredOffers(data));

  activateElements(mapFormSelects, true);
  activateElements(mapFormFieldsets, true);
};

const onDataFailed = () => {
  showAlert('Не удалось загрузить объявления. Попробуйте ещё раз');

  activateElements(mapFormSelects, false);
  activateElements(mapFormFieldsets, false);
};

const setFilteredMarkers = () => {
  getData((offers) => {
    createMarkers(getFilteredOffers(offers));
    onFiltersChange(debounce(() => {
      markerGroup.clearLayers();
      createMarkers(getFilteredOffers(offers));
    }));
  }, onDataFailed);
};

const getMap = () => {
  map.setView(START_COORDINATES, DEFAULT_ZOOM);
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

export { resetMap, getMap };
