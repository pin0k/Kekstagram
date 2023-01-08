import {scrollOff, isEscEvent} from './util.js';

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

const closeModal = () => {
  editForm.classList.add('hidden');
  scrollOff.classList.remove('modal-open');
  editFormClose.removeEventListener('click', closeModal);
  uploadFileInput.innerHTML = '';
};

uploadFileInput.addEventListener('change', () => {
  resetSettings();
  editForm.classList.remove('hidden');
  scrollOff.classList.add('modal-open');
})


document.addEventListener('keydown', () => {
  if (isEscEvent) {
    closeModal();
  }
});

const resetSettings = () => {
  uploadImage.style = 'transform: scale(1.00)';
  uploadImage.style.filter = '';
  uploadImage.removeAttribute('class');

  scaleControlValue.value = '100%';
};

valueElement.value = 100;
// eslint-disable-next-line no-undef
noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

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

const uploadPictureForm = uploadFileInput.addEventListener('change', () => {
  scrollOff.classList.add('modal-open');
  editFormClose.addEventListener('click', closeModal);
  let selectEffect = editForm.querySelector('#effect-none');
  effectLevel.classList.add('hidden');

  getScaleValue();
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
          });
          break;
        default:
          effectLevel.classList.add('hidden');
          uploadImage.removeAttribute('class');
          uploadImage.style.filter = 'none';
      }
    });
  });
  editForm.classList.remove('hidden');
});

export { uploadPictureForm };
