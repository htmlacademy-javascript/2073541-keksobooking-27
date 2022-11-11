const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileChooserAvatar = document.querySelector('#avatar');
const previewAvatar = document.querySelector('.ad-form-header__preview img');
const fileChooserPhoto = document.querySelector('#images');
const previewPhoto = document.querySelector('.ad-form__photo');
const photoContainer = document.querySelector('.ad-form__photo-container');


fileChooserAvatar.addEventListener('change', () => {
  const file = fileChooserAvatar.files[0];
  const fileName = file.name.toLowerCase();

/*   const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    previewAvatar.src = URL.createObjectURL(file);
  } */
  previewAvatar.src = URL.createObjectURL(file);

});

fileChooserPhoto.addEventListener('change', () => {
  previewPhoto.remove();
  const file = fileChooserPhoto.files[0];
  const img = document.createElement('img');
  const div = document.createElement('div');
  div.classList.add('ad-form__photo');
  img.src = URL.createObjectURL(file);
  img.width = '70';
  img.height = '70';
  div.appendChild(img);
  photoContainer.append(div);
});

