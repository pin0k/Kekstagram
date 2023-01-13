import { scrollOff, checkEsc } from './util.js';

const COMMENTS_LOAD_STEP = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = document.querySelector('.big-picture__cancel');

// пока скрываем лишнее
const commentCount = bigPicture.querySelector('.social__comment-count');
const commentLoader = bigPicture.querySelector('.comments-loader');

let commentsLoaded = [];

let commentsCount = COMMENTS_LOAD_STEP;

const onBigPictureCloseClick = () => {
  bigPicture.classList.add('hidden');
  scrollOff.classList.remove('modal-open');
  bigPictureClose.removeEventListener('click', onBigPictureCloseClick);
  commentList.innerHTML = '';
  document.removeEventListener('keydown', onBigPictureEscKeyDown)
  commentsCount = COMMENTS_LOAD_STEP;
  commentsLoaded = [];
};

// функция вывода комментариев
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const commentList = document.querySelector('.social__comments')

const renderComment = (comment) => {
  const commentSimilar = commentTemplate.cloneNode(true);

  commentSimilar.querySelector('.social__picture').src = comment.avatar;
  commentSimilar.querySelector('.social__picture').alt = comment.name;
  commentSimilar.querySelector('.social__text').textContent = comment.message;

  return commentSimilar;
};

const renderComments = (comments) => {
  const onCommentsLoaderClick = () => {
    renderComments(comments);
  }

  commentsCount = (comments.length < COMMENTS_LOAD_STEP) ? comments.length : commentsCount;
  commentsLoaded = comments.slice(0, commentsCount);

  commentList.innerHTML = '';

  commentCount.textContent = `${commentsLoaded.length} из ${comments.length} комментариев`;

  let commentsListFragment = document.createDocumentFragment();

  commentsLoaded.forEach(comment => {
    commentsListFragment.appendChild(renderComment(comment));
  });

  commentList.appendChild(commentsListFragment);

  if (comments.length > COMMENTS_LOAD_STEP && commentsLoaded.length < comments.length) {
    commentLoader.classList.remove('hidden');
    commentLoader.addEventListener('click', onCommentsLoaderClick, { once: true })
  } else {
    commentLoader.classList.add('hidden');
  }

  commentsCount += COMMENTS_LOAD_STEP;
}

const onBigPictureEscKeyDown = (evt) => {
  if (checkEsc(evt)) {
    onBigPictureCloseClick()
  }
}

// функция вывода большой картинки/поста
const show = (picture) => {
  scrollOff.classList.add('modal-open');
  bigPicture.querySelector('.big-picture__img > img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
  bigPicture.querySelector('.social__caption').textContent = picture.description;

  bigPictureClose.addEventListener('click', onBigPictureCloseClick);
  bigPicture.classList.remove('hidden');

  renderComments(picture.comments)
};

export { show };
