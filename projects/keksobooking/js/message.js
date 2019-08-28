'use strict';

//  Модуль отображения сообщений для пользователя
(function () {
  var mainPageElement = document.querySelector('main');

  // Метод создания сообщения об ошибке
  var templateErrorElement = document.querySelector('#error').content.querySelector('.error');
  var createError = function (message) {
    var newErrorElement = templateErrorElement.cloneNode(true);
    var errorMessageElement = newErrorElement.querySelector('.error__message');
    errorMessageElement.textContent = message;
    mainPageElement.appendChild(newErrorElement);

    openBlockMessage(newErrorElement);
  };

  // Метод создания сообщения об успешной отправке формы
  var templateMessageElement = document.querySelector('#success').content.querySelector('.success');
  var createSuccess = function () {
    var newMessageElement = templateMessageElement.cloneNode(true);
    mainPageElement.appendChild(newMessageElement);

    openBlockMessage(newMessageElement);
  };

  // Получение метода обработки события по ESC
  var pressEsc = null;
  var setUtil = function (utilMethod) {
    pressEsc = utilMethod;
  };

  // Функция закрытия сообщения
  var openBlockMessage = function (element) {
    var onBlockEscPress = function (evt) {
      pressEsc(evt, closeBlockMessage);
    };

    var closeBlockMessage = function () {
      mainPageElement.removeChild(element);
      document.removeEventListener('keydown', onBlockEscPress);
    };

    document.addEventListener('keydown', onBlockEscPress);
    element.addEventListener('click', function () {
      closeBlockMessage(element);
    });
  };

  window.message = {
    getError: createError,
    getSuccess: createSuccess,
    initiate: setUtil
  };
})();
