import {getRandomInt, getRandomFloat, getRandomElement, getRandomArrayElements} from './util.js';
const SIMILAR_ADS_COUNT = 10;
const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TITLES = [
  'Выгодное предложение',
  'Бесплатная отмена бронирования',
  'Скидка при длительном проживании',
];
const CHECKIN_HOURS = ['12:00', '13:00', '14:00'];
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const DESCRIPTIONS = [
  'Небольшие дыры в потолке',
  'До остановки транспорта пешком 10 минут',
  'Полотенца стиранные',
  'Дизайнерские решения в исполнении номеров',
  'Расположение в тихом месте',
  'Красивый вид из окна',
  'Одна кровать',
  'Номер с террасой',
];


const createAdvert = (idx) => ({
  author: {
    avatar: `img/avatars/user${idx < 9 ? '0' : ''}${idx + 1}.png`,
  },
  offer: {
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    address: `${getRandomFloat(0, 90)}, ${getRandomFloat(0, 90)}`,
    price: getRandomInt(100, 100000),
    type: getRandomElement(TYPES),
    rooms: getRandomInt(1, 3),
    guests: getRandomInt(1, 5),
    checkin: getRandomElement(CHECKIN_HOURS),
    checkout: getRandomElement(CHECKIN_HOURS),
    features: getRandomArrayElements(FEATURES),
    description: getRandomElement(DESCRIPTIONS),
    photos: getRandomArrayElements(PHOTOS),
  },
  location: {
    lat: getRandomFloat(35.65, 35.7),
    lng: getRandomFloat(139.7, 139.8),
  },
});
const getSimilarAdverts = () => Array.from({length: SIMILAR_ADS_COUNT},(_, idx) => createAdvert(idx));

export {getSimilarAdverts};

