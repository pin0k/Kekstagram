import {scrollOff, isEscEvent} from './util.js';

const Keys = {
  ESC: 'Esc',
  ESCAPE: 'Escape',
};

const Scale = {
  MAX: 100,
  MIN: 25,
  STEP: 25,
};

const uploadFileInput = document.querySelector('#upload-file');
const editForm = document.querySelector('.img-upload__overlay');
const editFormClose = document.querySelector('#upload-cancel');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const hiddenScaleValue = editForm.querySelector('[name="scale-value"]');
const imgUploadPreview = document.querySelector('.img-upload__preview');
const uploadImage = imgUploadPreview.querySelector('img');
const effectLevel = editForm.querySelector('.effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const effectsItems = editForm.querySelectorAll('.effects__radio');
const hashtags = document.querySelector('.text__hashtags');

// Закрытие окна редактирования
const closeModal = () => {
  editForm.classList.add('hidden');
  scrollOff.classList.remove('modal-open');
  editFormClose.removeEventListener('click', closeModal);
  uploadFileInput.innerHTML = '';
};

// Добавление слайдера
valueElement.value = 100;
noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});


document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    closeModal();
  }
});

hashtags.addEventListener('focusin', (evt) => {
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      console.log('Keydown ESC');
      return false;
    }
  });
});

// функция вывода окна редактирования
const uploadPictureForm = uploadFileInput.addEventListener('change', () => {
  scrollOff.classList.add('modal-open');
  editFormClose.addEventListener('click', closeModal);

  // Масштаб нового изображения
  const getScaleValue = () => {
    let scaleValue = Scale.MAX;
    scaleControlValue.value = scaleValue + '%';

    scaleControlBigger.addEventListener('click', () => {
      if (scaleValue >= Scale.MAX) {
        scaleValue = Scale.MAX;
        scaleControlValue.value = scaleValue + '%';
        uploadImage.style.transform = 'scale(' + (scaleValue * 0.01) + ')';
        hiddenScaleValue.value = scaleValue + '%';
      } else if ( scaleValue >= Scale.MIN) {
        scaleValue += Scale.STEP;
        scaleControlValue.value = scaleValue + '%';
        uploadImage.style.transform = 'scale(' + (scaleValue * 0.01) + ')';
        hiddenScaleValue.value = scaleValue + '%';
      }
    });

    scaleControlSmaller.addEventListener('click', () => {
      if (scaleValue <= Scale.MIN) {
        scaleValue = Scale.MIN;
        scaleControlValue.value = scaleValue + '%';
        uploadImage.style.transform = 'scale(' + (scaleValue * 0.01) + ')';
        hiddenScaleValue.value = scaleValue + '%';
      } else if ( scaleValue > Scale.MIN) {
        scaleValue -= Scale.STEP;
        scaleControlValue.value = scaleValue + '%';
        uploadImage.style.transform = 'scale(' + (scaleValue * 0.01) + ')';
        hiddenScaleValue.value = scaleValue + '%';
      }
    });
  };

  getScaleValue();



  // Наложение эффекта на изображение
  let selectEffect = editForm.querySelector('#effect-none');
  effectsItems.forEach(effectsItem => {
    effectsItem.addEventListener('change', () => {
      selectEffect = effectsItem.value;
      switch(selectEffect) {
        case 'chrome':
          effectLevel.classList.remove('hidden');
          uploadImage.removeAttribute('class');
          uploadImage.classList.add(`effects__preview--${selectEffect}`);
          sliderElement.noUiSlider.updateOptions({
            range: {
              min: 0,
              max: 1,
            },
            start: 1,
            step: 0.1,
          });
          sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
            uploadImage.style.filter = `grayscale(${unencoded[handle]})`;
            console.log(unencoded[handle]);
          });
          break;
        case 'sepia':
          effectLevel.classList.remove('hidden');
          uploadImage.removeAttribute('class');
          uploadImage.classList.add(`effects__preview--${selectEffect}`);
          sliderElement.noUiSlider.updateOptions({
            range: {
              min: 0,
              max: 1,
            },
            start: 1,
            step: 0.1,
          });
          sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
            uploadImage.style.filter = `sepia(${unencoded[handle]})`;
            console.log(unencoded[handle]);
          });
          break;
        case 'heat':
          effectLevel.classList.remove('hidden');
          uploadImage.removeAttribute('class');
          uploadImage.classList.add(`effects__preview--${selectEffect}`);
          sliderElement.noUiSlider.updateOptions({
            range: {
              min: 1,
              max: 3,
            },
            start: 3,
            step: 0.1,
          });
          sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
            uploadImage.style.filter = `brightness(${unencoded[handle]})`;
            console.log(unencoded[handle]);
          });
          break;
        case 'phobos':
          effectLevel.classList.remove('hidden');
          uploadImage.removeAttribute('class');
          uploadImage.classList.add(`effects__preview--${selectEffect}`);
          sliderElement.noUiSlider.updateOptions({
            range: {
              min: 0,
              max: 3,
            },
            start: 3,
            step: 0.1,
          });
          sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
            uploadImage.style.filter = `blur(${unencoded[handle]}px)`;
            console.log(unencoded[handle]);
          });
          break;
        case 'marvin':
          effectLevel.classList.remove('hidden');
          uploadImage.removeAttribute('class');
          uploadImage.classList.add(`effects__preview--${selectEffect}`);
          sliderElement.noUiSlider.updateOptions({
            range: {
              min: 0,
              max: 100,
            },
            start: 100,
            step: 1,
          });
          sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
            uploadImage.style.filter = `invert(${unencoded[handle]}%)`;
            console.log(unencoded[handle]);
          });
          break;
        default:
          effectLevel.classList.add('hidden');
          uploadImage.removeAttribute('class');
          uploadImage.style.filter = `none`;
      }
    });
  });
  editForm.classList.remove('hidden');
});

export { uploadPictureForm };
