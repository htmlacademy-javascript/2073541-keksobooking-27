import { sendData } from './api.js';
import {resetMap} from './map.js'
//import { showErrorMessage, showSuccessMessage } from './form-message.js';
import { pristine } from './validate.js';



//Потом перенести в месседж

const ALERT_SHOW_TIME = 5000;
const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error')
  .content
  .querySelector('.error');

const errorButton = document.querySelector('.error__button');

const getSuccessMessage= () => {
  const message = successMessage.cloneNode(true);
   document.body.append(message);
  setTimeout(() => {
    message.remove();
  }, ALERT_SHOW_TIME);
};



//// Досюда


const mapForm = document.querySelector('.map__filters');
const form = document.querySelector('.ad-form');
const advertFormElements = document.querySelectorAll('select.map__filter, fieldset');
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
};

const onSendSuccess = () => {
  getSuccessMessage();
  unblockSubmitButton();
  //setDefaultState();
};
const onSendFail = () => {
  getSuccessMessage();
  unblockSubmitButton();
  //setDefaultState();
};


form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    blockSubmitButton();
    sendData(onSendSuccess, onSendFail, new FormData(evt.target));
    console.log('отправлено');

  } else {
    console.log('не отправлено')
  }

});

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  setDefaultState();
});

export {onSendFail,onSendSuccess, unblockSubmitButton, blockSubmitButton }
