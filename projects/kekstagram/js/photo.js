'use strict';
var COMMENT_COUNT = 5;

// Модуль создания фотографии
(function () {
  // Получение метода для отрисовки большого фото на странице и закрытия фото по Esc
  var insertBigPhoto = null;
  var pressEsc = null;
  var setPhotoMethod = function (insertMethod, utilMethod) {
    insertBigPhoto = insertMethod;
    pressEsc = utilMethod;
  };

  // Метод создания фотографии
  var templatePicureElement = document.querySelector('#picture').content.querySelector('.picture');
  var bodyElement = document.querySelector('body');

  var createPhoto = function (data) {
    var newPhoto = templatePicureElement.cloneNode(true);
    var newPhotoImgElement = newPhoto.querySelector('.picture__img');
    newPhotoImgElement.src = data.url;
    newPhoto.querySelector('.picture__likes').textContent = data.likes;
    newPhoto.querySelector('.picture__comments').textContent = data.comments.length;
    if (data.effect) {
      newPhotoImgElement.classList.add('effects__preview--' + data.effect);
    }
    if (data.effectValue) {
      newPhotoImgElement.style = data.effectValue;
    }

    // Обработчик клика
    var onPhotoClick = function () {
      pictureElement.classList.remove('hidden');
      bodyElement.classList.add('modal-open');
      insertBigPhoto(data, createBigPhoto);
    };

    newPhoto.addEventListener('click', onPhotoClick);

    return newPhoto;
  };

  // Функция создания полноэкранной фотографии
  var pictureElement = document.querySelector('.big-picture');
  var photoElement = pictureElement.querySelector('.big-picture__img').querySelector('img');
  var textElement = pictureElement.querySelector('.social__caption');
  var likeElement = pictureElement.querySelector('.likes-count');
  var commentListElement = pictureElement.querySelector('.social__comments');
  var commentItemElement = pictureElement.querySelector('.social__comment');
  var commentCountElement = pictureElement.querySelector('.comments-count');
  var commentContainerElement = pictureElement.querySelector('.social__comment-count');
  var closeElement = pictureElement.querySelector('.big-picture__cancel');
  var commentLoaderElement = pictureElement.querySelector('.social__comments-loader');

  var createBigPhoto = function (data) {
    photoElement.src = data.url;
    textElement.textContent = data.description;
    likeElement.textContent = data.likes;
    commentCountElement.textContent = data.comments.length;
    if (data.effect) {
      photoElement.classList.add('effects__preview--' + data.effect);
    }
    if (data.effectValue) {
      photoElement.style = data.effectValue;
    }

    createComment(data);

    document.addEventListener('keydown', onBigPhotoEscPress);
    closeElement.addEventListener('click', onCloseElementClick);
  };

  // Функция создания комментариев
  var createComment = function (data) {
    pictureElement.querySelectorAll('.social__comment').forEach(function (element) {
      element.remove();
    });

    // Массив комментариев
    var listComments = [];
    // Счетчик количества комментариев
    var count = 0;
    var fragmentElement = document.createDocumentFragment();

    data.comments.forEach(function (element) {
      var newCommentElement = commentItemElement.cloneNode(true);
      newCommentElement.querySelector('.social__picture').src = element.avatar;
      newCommentElement.querySelector('.social__picture').alt = element.name;
      newCommentElement.querySelector('.social__text').textContent = element.message;
      listComments.push(newCommentElement);
    });

    // Функция рендеринга комментариев
    var renderComment = function () {
      if (listComments.length <= COMMENT_COUNT) {
        listComments.forEach(function (element) {
          fragmentElement.appendChild(element);
        });
        commentListElement.appendChild(fragmentElement);
        commentContainerElement.innerHTML = data.comments.length + ' из <span class="comments-count">' + data.comments.length + '</span> комментариев';
        listComments = [];
        commentLoaderElement.classList.add('hidden');
        commentLoaderElement.removeEventListener('click', onCommentLoaderClick);
      } else {
        for (var i = 0; i < COMMENT_COUNT; i++) {
          fragmentElement.appendChild(listComments[i]);
        }
        // Проверка количества показанных комментариев и корректировка счетчика
        if (data.comments.length - count > COMMENT_COUNT) {
          commentContainerElement.innerHTML = count + COMMENT_COUNT + ' из <span class="comments-count">' + data.comments.length + '</span> комментариев';
          count += COMMENT_COUNT;
        } else {
          count += data.comments.length - count;
          commentContainerElement.innerHTML = count + ' из <span class="comments-count">' + data.comments.length + '</span> комментариев';
        }
        commentListElement.appendChild(fragmentElement);
        // Удаление из массива отрисованных комментариев
        for (i = 0; i < COMMENT_COUNT; i++) {
          listComments.shift();
        }
        commentLoaderElement.classList.remove('hidden');
      }
    };

    // Обработчик загрузки комментариев по нажатию кнопки
    var onCommentLoaderClick = function () {
      renderComment();
    };

    renderComment();
    commentLoaderElement.addEventListener('click', onCommentLoaderClick);
  };

  // Обработчики закрытия полноэкранной фотографии
  var onCloseElementClick = function () {
    pictureElement.classList.add('hidden');
    bodyElement.classList.remove('modal-open');
    closeElement.removeEventListener('click', onCloseElementClick);
    document.removeEventListener('keydown', onBigPhotoEscPress);
  };

  var onBigPhotoEscPress = function (evt) {
    pressEsc(evt, onCloseElementClick);
  };

  window.photo = {
    create: createPhoto,
    initiate: setPhotoMethod
  };
})();
