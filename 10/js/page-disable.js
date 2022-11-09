const offerForm = document.querySelector('.ad-form');
const offerFormItems = offerForm.querySelectorAll('fieldset');
const mapForm = document.querySelector('.map__filters');
const mapFormSelects = mapForm.querySelectorAll('select');
const mapFormFieldsets = mapForm.querySelectorAll('fieldset');

const activateElements = (container, boolean) => {
  container.forEach((item) => {
    item.disabled = !boolean;
  });
};

const activatePage = (boolean) => {
  if (!boolean) {
    offerForm.classList.add('ad-form--disabled');
    mapForm.classList.add('map__filters--disabled');
  } else {
    offerForm.classList.remove('ad-form--disabled');
    mapForm.classList.remove('map__filters--disabled');
  }

  activateElements(offerFormItems, boolean);
  activateElements(mapFormSelects, boolean);
  activateElements(mapFormFieldsets, boolean);
};
activatePage(false);

export { activatePage };
