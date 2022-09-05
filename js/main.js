const getRandomInt = (min, max) => {
  if (min < 0 || max < 0) {
    return -1;
  }

  if (min > max) {
    [min, max] = [max, min];
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

alert(getRandomInt(2, 0));

const getStringCount = (text, maxLength) => {
  return (text.trim().length <= maxLength);
};

alert(getStringCount('проверочное сообщение', 5));
