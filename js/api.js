const SERVER_URL = 'https://27.javascript.pages.academy/keksobooking';
const DATA_URL = 'https://27.javascript.pages.academy/keksobooking/data';


const getData = (onSuccess, onFail) => {
  fetch(DATA_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((offers) => {
      onSuccess(offers);
    })
    .catch(() => {
      onFail();
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    SERVER_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {

      onFail();
    });
};

export {
  getData,
  sendData
};
