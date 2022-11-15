const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const DEFAULT_AVATAR = './img/muffin-grey.svg';

const fileChooserAvatar = document.querySelector('#avatar');
const previewAvatar = document.querySelector('.ad-form-header__preview img');
const fileChooserPhoto = document.querySelector('#images');
const previewPhoto = document.querySelector('.ad-form__photo');

const isTypeValid = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));

};

fileChooserAvatar.addEventListener('change', () => {
  const file = fileChooserAvatar.files[0];

  if (isTypeValid) {
    previewAvatar.src = URL.createObjectURL(file);
  }
});

fileChooserPhoto.addEventListener('change', () => {
  const file = fileChooserPhoto.files[0];
  if (isTypeValid) {
    previewPhoto.innerHTML = '';
    const img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    img.style.width = '100%';
    img.style.height = 'auto';
    previewPhoto.appendChild(img);
  }
});

const resetPreview = () => {
  previewAvatar.src = DEFAULT_AVATAR;
  previewPhoto.innerHTML = '';
};
export { resetPreview };
