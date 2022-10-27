const offerForm = document.querySelector('.ad-form');
const offerFormItems = offerForm.querySelectorAll('fieldset');
const mapForm = document.querySelector('.map__filters');
const mapFormSelects = mapForm.querySelectorAll('select');
const mapFormFieldsets = mapForm.querySelectorAll('fieldset');

const disableElements = (container) => {
  container.forEach((item) => {
    item.disabled = true;
  });
};
const activateElements = (container) => {
  container.forEach((item) => {
    item.disabled = false;
  });
};


const disablePage = () => {
  offerForm.classList.add('ad-form--disabled');
  mapForm.classList.add('map__filters--disabled');
  disableElements(offerFormItems);
  disableElements(mapFormSelects);
  disableElements(mapFormFieldsets);

};


const activatePage = () => {
  offerForm.classList.remove('ad-form--disabled');
  mapForm.classList.remove('ad-form--disabled');
  activateElements(offerFormItems);
  activateElements(mapFormSelects);
  activateElements(mapFormFieldsets);

};

export { disablePage, activatePage };
