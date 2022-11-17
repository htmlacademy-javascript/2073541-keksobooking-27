
const filterForm = document.querySelector('.map__filters');
const typeFilter = filterForm.querySelector('#housing-type');
const priceFilter = filterForm.querySelector('#housing-price');
const roomsFilter = filterForm.querySelector('#housing-rooms');
const guestsFilter = filterForm.querySelector('#housing-guests');
const featuresFilter = filterForm.querySelector('#housing-features');

const OFFERS_COUNT = 10;

const priceFilterRange = {
  'low': {
    MIN: 0,
    MAX: 10000,
  },
  'middle': {
    MIN: 10000,
    MAX: 50000,
  },
  'high': {
    MIN: 50000,
    MAX: 1000000
  },
};

const ANY = 'any';

const checkTypeFilter = (data) => typeFilter.value === ANY || typeFilter.value === data.offer.type;


const checkPriceFilter = (data) => (priceFilter.value === ANY)
   || (data.offer.price > priceFilterRange[priceFilter.value].MIN
   && data.offer.price < priceFilterRange[priceFilter.value].MAX);
const checkRoomsFilter = (data) => (roomsFilter.value === ANY)
   || (+roomsFilter.value === data.offer.rooms);
const checkGuestsFilter = (data) => (guestsFilter.value === ANY)
   || (+guestsFilter.value === data.offer.guests);

const checkFeaturesFilter = (data) => {
  const checkedFeatures = Array.from(featuresFilter.querySelectorAll('input[type="checkbox"]:checked'));
  const dataFeatures = data.offer.features;
  if (dataFeatures) {
    return checkedFeatures.every((feature) => dataFeatures.includes(feature.value));
  }
};


const getFilteredOffers = (offers) => {
  const filteredOffers = [];
  for (const offer of offers) {
    if (filteredOffers.length > OFFERS_COUNT) {
      break;
    }
    if (checkTypeFilter(offer) && checkPriceFilter(offer)
    && checkRoomsFilter(offer) && checkGuestsFilter(offer)
    && checkFeaturesFilter(offer)) {
      filteredOffers.push(offer);
    }
  }
  return filteredOffers;
};


const onFiltersChange = (cb) => {
  filterForm.addEventListener('change', () => {
    cb();
  });
};


export { getFilteredOffers, onFiltersChange };
