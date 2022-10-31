import {getSimilarAdverts} from './data.js';

const OFFER_TYPES = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const getOfferFeatures = (items, container) => {
  if (!items) {
    container.remove();
  } else {
    container.innerHTML = '';
    const fragment = document.createDocumentFragment();
    items.forEach((item) => {
      const element = document.createElement('li');
      element.classList.add('popup__feature');
      element.classList.add(`popup__feature--${item}`);
      fragment.appendChild(element);
    });
    container.appendChild(fragment);
  }
};
const getOfferPhotos = (items, container) => {
  if (!items) {
    container.remove();
  } else {
    container.innerHTML = '';
    const fragment = document.createDocumentFragment();
    items.forEach((item) => {
      const element = document.createElement('img');
      element.classList.add('popup__photo');
      element.src = item;
      element.width = 45;
      element.height = 40;
      element.alt = 'Фотография жилья';
      fragment.appendChild(element);
    });
    container.appendChild(fragment);
  }

};

const createCard = (item) => {
  const card = cardTemplate.cloneNode(true);
  const offerTitle = card.querySelector('.popup__title');
  offerTitle.textContent = item.offer.title;
  const offerAddress = card.querySelector('.popup__text--address');
  offerAddress.textContent = item.offer.address;
  const offerPrice = card.querySelector('.popup__text--price');
  offerPrice.textContent = `${item.offer.price} ₽/ночь`;
  const offerType = card.querySelector('.popup__type');
  offerType.textContent = OFFER_TYPES[item.offer.type];
  const offerRooms = card.querySelector('.popup__text--capacity');
  offerRooms.textContent = `${item.offer.rooms} комнаты для ${item.offer.guests} гостей`;
  const offerTime = card.querySelector('.popup__text--time');
  offerTime.textContent = `Заезд после ${item.offer.checkin}, выезд до ${item.offer.checkout}`;
  const offerFeatures = card.querySelector('.popup__features');
  getOfferFeatures(item.offer.features, offerFeatures);
  const offerDescription = card.querySelector('.popup__description');
  if (!item.offer.description) {
    offerDescription.remove();
  } else {
    offerDescription.textContent = item.offer.description;
  }
  const offerPhotos = card.querySelector('.popup__photos');
  getOfferPhotos(item.offer.photos, offerPhotos);
  const authorAvatar = card.querySelector('.popup__avatar');
  authorAvatar.src = item.author.avatar;

  return card;
};

export { createCard};
