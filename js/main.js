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

console.log(getStringCount('проверочное сообщение', 5));

const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

const TEXT_DESCRIPTION = [
  'Повседневная практика показывает, что реализация намеченных плановых заданий играет важную роль в формировании систем массового участия',
  'Товарищи! сложившаяся структура организации в значительной степени обуславливает создание новых предложений',
  'Идейные соображения высшего порядка, а также реализация намеченных плановых заданий играет важную роль в формировании существенных финансовых и административных условий',
  'Начало повседневной работы по формированию позиции играет важную роль в формировании направлений прогрессивного развития',
  'Идейные соображения высшего порядка, а также укрепление и развитие структуры представляет собой интересный эксперимент проверки системы обучения кадров, соответствует насущным потребностям',
  'Не следует, однако забывать, что сложившаяся структура организации представляет собой интересный эксперимент проверки дальнейших направлений развития'
];

const TEXT_MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTION_PHOTO_COUNT = 25;

const SIMILAR_COMMENT_COUNT = 6;

const Likes = {
  MIN: 15,
  MAX: 200
};

const RandomId = {
  MIN: 1,
  MAX: 1000
};

const RandomAvatar = {
  MIN: 1,
  MAX: 6
};

const createDescriptionPhoto = () => {
  const descriptionPhoto = [];

  for (let i = 0; i < DESCRIPTION_PHOTO_COUNT; i++) {
    descriptionPhoto.push({
      id: i,
      url: 'photos/' + (i + 1) + '.jpg',
      description: TEXT_DESCRIPTION[getRandomInt(0, TEXT_DESCRIPTION.length-1)],
      likes: getRandomInt(Likes.MIN, Likes.MAX),
      comments: createComments()
    });
  }

  return descriptionPhoto;
};

const createComments = () => {
  const comments = [];
  for (let j = 0; j < SIMILAR_COMMENT_COUNT; j++) {
    comments.push({
      id: getRandomInt(RandomId.MIN, RandomId.MAX),
      avatar: 'img/avatar-' + getRandomInt(RandomAvatar.MIN, RandomAvatar.MAX) + '.svg',
      message: TEXT_MESSAGE[getRandomInt(0, TEXT_MESSAGE.length-1)],
      name: NAMES[getRandomInt(0, NAMES.length-1)]
    });
  };

  return comments;
}

console.log(createDescriptionPhoto());
