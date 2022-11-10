const offerForm = document.querySelector('.ad-form');
const offerFormItems = offerForm.querySelectorAll('fieldset');
const filterForm = document.querySelector('.map__filters');
const filterFormSelects = filterForm.querySelectorAll('select');
const filterFormFieldsets = filterForm.querySelectorAll('fieldset');

const activateElements = (container, boolean) => {
  container.forEach((item) => {
    item.disabled = !boolean;
  });
};

const activatePage = (boolean) => {
  if (!boolean) {
    offerForm.classList.add('ad-form--disabled');
    filterForm.classList.add('map__filters--disabled');
  } else {
    offerForm.classList.remove('ad-form--disabled');
    filterForm.classList.remove('map__filters--disabled');
  }

  activateElements(offerFormItems, boolean);
  activateElements(filterFormSelects, boolean);
  activateElements(filterFormFieldsets, boolean);
};
activatePage(false);

export { activatePage, activateElements};
