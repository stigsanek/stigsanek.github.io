'use strict';

// Модуль создания сообщений для пользователя
(function () {
  var mainElement = document.querySelector('main');

  // Получение метода обработки события по ESC
  var pressEsc = null;
  var setUtil = function (utilMethod) {
    pressEsc = utilMethod;
  };

  // Функция закрытия сообщения
  var openBlockMessage = function (element) {
    var onBlockEscPress = function (evt) {
      pressEsc(evt, onBlockMessageClick);
    };

    var onBlockMessageClick = function () {
      mainElement.removeChild(element);
      document.removeEventListener('keydown', onBlockEscPress);
      element.removeEventListener('click', onBlockMessageClick);
    };

    document.addEventListener('keydown', onBlockEscPress);
    element.addEventListener('click', onBlockMessageClick);
  };

  // Метод создания сообщения об успешной отправке формы
  var successTemplateElement = document.querySelector('#success').content.querySelector('.success');

  var createSuccess = function () {
    var newSuccessElement = successTemplateElement.cloneNode(true);
    mainElement.appendChild(newSuccessElement);
    openBlockMessage(newSuccessElement);
  };

  // Метод создания сообщения об ошибке отправки формы
  var errorTemplateElement = document.querySelector('#error').content.querySelector('.error');

  var createError = function (message) {
    var newErrorElement = errorTemplateElement.cloneNode(true);
    var errorTextElement = newErrorElement.querySelector('.error__title');
    errorTextElement.textContent = message;
    mainElement.appendChild(newErrorElement);
    openBlockMessage(newErrorElement);
  };

  window.message = {
    getSuccess: createSuccess,
    getError: createError,
    initiate: setUtil
  };
})();
