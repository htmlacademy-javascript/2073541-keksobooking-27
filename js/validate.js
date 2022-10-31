const form = document.querySelector('.ad-form');
const typeOfHouse = form.querySelector('#type');
const price = form.querySelector('#price');
const title = form.querySelector('#title');
const roomsField = document.querySelector('#room_number');
const guestsField = document.querySelector('#capacity');
const timeInField = document.querySelector('#timein');
const timeOutField = document.querySelector('#timeout');

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

typeOfHouse.addEventListener('change', () => {
  price.placeholder = minPricesMap[typeOfHouse.value];
});


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


  const validateTitle = (value) => value.length >= 30 && value.length <= 100;
  const getTitleErrorMessage = (value) => `От 30 до 100 символов. Введено: ${value.length}.`;

  pristine.addValidator(title, validateTitle, getTitleErrorMessage);

  const validatePrice = (value) => value <= 100000 && value >= minPricesMap[typeOfHouse.value];
  const getPriceErrorMessage = (value) => {
    if (value > 100000) {
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
    if (roomsOptionMap[numberOfRooms].includes(numberOfGuests)) {
      return true;
    }
    return false;
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


form.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});

export { validate, minPricesMap, typeOfHouse, price, pristine };
