
const ALERT_SHOW_TIME = 5000;
const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');


const onErrorButtonClick = () => {
  hideMessage();
};
const onMessageEcsKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideMessage();
  }
};
const onOverLayClick = () => {
  hideMessage();
};

const getSuccessMessage = () => {
  const message = successMessage.cloneNode(true);
  document.body.append(message);
  document.addEventListener('keydown', onMessageEcsKeydown);
  document.addEventListener('click', onOverLayClick);
};

function hideMessage() {
  const message = document.querySelector('.success') || document.querySelector('.error');
  message.remove();
  document.removeEventListener('keydown', onMessageEcsKeydown);
  document.removeEventListener('click', onOverLayClick);
}

const getErrorMessage = () => {
  const message = errorMessage.cloneNode(true);
  document.body.append(message);
  document.addEventListener('keydown', onMessageEcsKeydown);
  const errorButton = document.querySelector('.error__button');
  errorButton.addEventListener('click', onErrorButtonClick);
};


const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};


export {showAlert, getSuccessMessage, getErrorMessage};
