const serverURL = 'https://27.javascript.pages.academy/keksobooking';
const dataURL = 'https://27.javascript.pages.academy/keksobooking/data';


const getData = (onSuccess, onFail) => {
  fetch(dataURL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((response) => {
      onSuccess(response);
    })
    .catch(() => {
      onFail();
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    serverURL,
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
