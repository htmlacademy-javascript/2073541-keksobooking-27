import { minPricesMap, typeOfHouse, price, pristine } from './validate.js';

const form = document.querySelector('.ad-form');
const sliderElement = form.querySelector('.ad-form__slider');

const PRICE_MIN = 0;
const PRICE_MAX = 100000;
const setPricePlaceholder = () => {
  price.placeholder = minPricesMap[typeOfHouse.value];
};
setPricePlaceholder();

typeOfHouse.addEventListener('change', () => {
  setPricePlaceholder();
});

noUiSlider.create(sliderElement, {
  range: {
    min: PRICE_MIN,
    max: PRICE_MAX,
  },
  start: [price.placeholder],
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => value.toFixed(),
    from: (value) => +value
  }
});
const priceChangeHandler = () => {
  sliderElement.noUiSlider.set(price.value);
};


sliderElement.noUiSlider.on('slide', () => {
  price.value = sliderElement.noUiSlider.get();
  pristine.validate(price);
});

price.addEventListener('input', priceChangeHandler);

export { priceChangeHandler };
