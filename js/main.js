import {renderPhotos} from './preview.js';
import { request } from './api.js';
import './validator.js';
import './editor-picture.js';

renderPhotos();

const onSuccess = (data) => {
  renderPhotos(data.slice())
}

const onError = () => {
  // eslint-disable-next-line no-undef
  showError('Ошибка загрузки, попробуйте еще раз', 'Закрыть')
}

request(onSuccess, onError, 'GET')
