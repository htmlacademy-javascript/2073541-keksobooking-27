import { sendData } from './api.js';
import { resetMap } from './map.js';
import { getErrorMessage, getSuccessMessage} from './user-message.js';
import { pristine } from './validate.js';
import { priceChangeHandler } from './price-slider.js';
import { resetPreview } from './picture-preview.js';

const mapForm = document.querySelector('.map__filters');
const form = document.querySelector('.ad-form');
const resetButton = document.querySelector('.ad-form__reset');
const submitButton = form.querySelector('.ad-form__submit');

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Сохраняю...';
};
const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const setDefaultState = () => {
  form.reset();
  mapForm.reset();
  resetMap();
  priceChangeHandler();
  pristine.reset();
  resetPreview();
};

const onSendSuccess = () => {
  getSuccessMessage();
  setDefaultState();
};
const onSendFail = () => {
  getErrorMessage();
};

const setUserFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    if (pristine.validate()) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
        },
        () => {
          onSendFail();
          unblockSubmitButton();
        }, formData);
    }
  });
};
setUserFormSubmit(onSendSuccess);

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  setDefaultState();
});

export { onSendFail, onSendSuccess, unblockSubmitButton, blockSubmitButton };
