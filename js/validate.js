
const form = document.querySelector('.ad-form');
const typeOfHouse = form.querySelector('#type');
const price = form.querySelector('#price');
const title = form.querySelector('#title');
const roomsField = document.querySelector('#room_number');
const guestsField = document.querySelector('#capacity');
const timeInField = document.querySelector('#timein');
const timeOutField = document.querySelector('#timeout');

const PRICE_MAX = 100000;
const LENGTH_MIN = 30;
const LENGTH_MAX = 100;

const minPricesMap = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};
const roomsOptionMap = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0]
};


const pristine = new Pristine(form , {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
  errorTextClass: 'text-help'
});

const validate = () => {
  pristine.addValidator(timeInField, () => {timeOutField.value = timeInField.value;
    return true;
  });
  pristine.addValidator(timeOutField, () => {timeInField.value = timeOutField.value;
    return true;
  });


  const validateTitle = (value) => value.length >= LENGTH_MIN && value.length <= LENGTH_MAX;
  const getTitleErrorMessage = (value) => `От 30 до 100 символов. Введено: ${value.length}.`;

  pristine.addValidator(title, validateTitle, getTitleErrorMessage);

  const validatePrice = (value) => value <= PRICE_MAX && value >= minPricesMap[typeOfHouse.value];
  const getPriceErrorMessage = (value) => {
    if (value > PRICE_MAX) {
      return 'Максимальная цена 100 000 руб.';
    }
    if (value < minPricesMap[typeOfHouse.value]) {
      return `Минимальная цена для этого типа жилья ${minPricesMap[typeOfHouse.value]} руб.`;
    }
  };

  pristine.addValidator(price, validatePrice, getPriceErrorMessage);

  const validateRoomCapacity = () => {
    const numberOfRooms = +roomsField.value;
    const numberOfGuests = +guestsField.value;
    return (roomsOptionMap[numberOfRooms].includes(numberOfGuests));
  };
  const getRoomsErrorMessage = () => {
    const numberOfRooms = roomsField.value;
    if (!validateRoomCapacity()) {
      if(numberOfRooms === '1') {
        return 'Для одного гостя';
      }
      if (numberOfRooms === '2') {
        return 'Для одного или двух гостей';
      }
      if (numberOfRooms === '3') {
        return 'Для одного, двух или трех гостей';
      }
      if (numberOfRooms === '100') {
        return 'Не для гостей';
      }
    }
  };
  pristine.addValidator(roomsField, validateRoomCapacity, getRoomsErrorMessage);
  pristine.addValidator(guestsField, validateRoomCapacity, 'Количество гостей не соответствует количеству комнат');

  form.addEventListener('change', (evt) => {
    if (!pristine.validate()) {
      evt.preventDefault();
    }
  });

};


export { validate, minPricesMap, typeOfHouse, price, pristine };
