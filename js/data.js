import { getRandomInt, getRandomElementArray } from './util.js';

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
  'Не следует, однако забывать, что сложившаяся структура организации представляет собой интересный эксперимент проверки дальнейших направлений развития'];

const TEXT_MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!'];

const DESCRIPTION_PHOTO_COUNT = 25;

const Likes = {
  MIN: 15,
  MAX: 200};

const RandomInteger = {
  MIN: 1,
  MAX: 10};

const RandomAvatar = {
  MIN: 1,
  MAX: 6};

const photos = [];

const createComments = (countComments) => {

  const comments = [];
  for (let j = 0; j < countComments; j++) {
    comments.push({
      id: getRandomInt(RandomInteger.MIN, RandomInteger.MAX),
      avatar: 'img/avatar-' + getRandomInt(RandomAvatar.MIN, RandomAvatar.MAX) + '.svg',
      message: getRandomElementArray(TEXT_MESSAGE),
      name: NAMES[getRandomElementArray(NAMES)]});
  }

  return comments;
}

const createDescriptionPhoto = () => {
  for (let i = 0; i < DESCRIPTION_PHOTO_COUNT; i++) {
    photos.push({
      id: i,
      url: 'photos/' + (i + 1) + '.jpg',
      description: getRandomElementArray(TEXT_DESCRIPTION),
      likes: getRandomInt(Likes.MIN, Likes.MAX),
      comments: createComments(getRandomInt(RandomInteger.MIN, RandomInteger.MAX))});
  }

  return photos;
};

createDescriptionPhoto();

export default photos;
