const getRandomInt = (min, max) => {
  if (min < 0 || max < 0) {
    return -1;
  }
  if (min > max) {
    [min, max] = [max, min];
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getStringCount = (text, maxLength) => {
  return (text.trim().length <= maxLength);
};

const getRandomElementArray = (array) => {
  return array[getRandomInt(0, array.length - 1)];
}

const scrollOff = document.querySelector('body');

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

export {getRandomInt, getStringCount, getRandomElementArray, scrollOff, isEscEvent};
