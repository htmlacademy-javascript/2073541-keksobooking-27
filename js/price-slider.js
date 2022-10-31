import {minPricesMap, typeOfHouse, price, pristine} from './validate.js';
const form = document.querySelector('.ad-form');
const sliderElement = form.querySelector('.ad-form__slider');
const setPricePlaceholder = () => {
  price.placeholder = minPricesMap[typeOfHouse.value];
};

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: +minPricesMap[typeOfHouse.value],
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => value.toFixed(),
    from: (value) => +value
  }
});


sliderElement.noUiSlider.on('slide', () => {
  price.value = sliderElement.noUiSlider.get();
  pristine.validate(price);
});

price.addEventListener('change', () => {
  sliderElement.noUiSlider.set(price.value);
});

typeOfHouse.addEventListener('change', () => {
  setPricePlaceholder();
});
