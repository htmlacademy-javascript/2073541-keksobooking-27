
const filterForm = document.querySelector('.map__filters');
const typeFilter = filterForm.querySelector('#housing-type');
const priceFilter = filterForm.querySelector('#housing-price');
const roomsFilter = filterForm.querySelector('#housing-rooms');
const guestsFilter = filterForm.querySelector('#housing-guests');
const featuresFilter = filterForm.querySelector('#housing-features');


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

const checkTypeFilter = (data) => typeFilter.value === data.offer.type || typeFilter.value === 'any';
const checkPriceFilter = (data) => (priceFilter.value === 'any') || (data.offer.price > priceFilterRange[priceFilter.value].MIN && data.offer.price < priceFilterRange[priceFilter.value].MAX);
const checkRoomsFilter = (data) => (roomsFilter.value === 'any') || (+roomsFilter.value === data.offer.rooms);
const checkGuestsFilter = (data) => (guestsFilter.value === 'any') || (+guestsFilter.value === data.offer.guests);

const checkFeaturesFilter = (data) => {
  const checkedFeatures = Array.from(featuresFilter.querySelectorAll('input[type="checkbox"]:checked'));
  const dataFeatures = data.offer.features;
  if (dataFeatures) {
    return checkedFeatures.every((feature) => dataFeatures.includes(feature.value));
  }
};

const getOffersRank = (first, second) => {
  const firtsRank = first.offer.features.length || 0;
  const secondRank = second.offer.features.length || 0;
  return firtsRank - secondRank;
};

const filterOffers = (offers) => {
  const filteredOffers = offers.filter((value) => checkTypeFilter(value) && checkPriceFilter(value) && checkRoomsFilter(value) && checkGuestsFilter(value) && checkFeaturesFilter(value));

  return filteredOffers.slice().sort(getOffersRank);
};


const onFiltersChange = (cb) => {
  filterForm.addEventListener('change', () => {
    cb();
  });
};


export {filterOffers, onFiltersChange};
