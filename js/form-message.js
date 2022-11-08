
const ALERT_SHOW_TIME = 5000;
const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error')
  .content
  .querySelector('.error');

const errorButton = document.querySelector('.error__button');

const getSuccessMessage = () => {
  const message = successMessage.cloneNode(true);
  document.body.append(message);
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      message.remove();
    }
  });
  document.addEventListener('click', () => {
    message.remove();
  });

};

const getErrorMessage = () => {
  const message = errorMessage.cloneNode(true);
  document.body.append(message);

  /*   errorButton.addEventListener('click', () => {
    message.remove();
  }); */

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      message.remove();
    }
  });
  document.addEventListener('click', () => {
    message.remove();
  });

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
