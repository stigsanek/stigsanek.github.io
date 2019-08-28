'use strict';

// Модуль обработки ошибок
(function () {
  var createError = function (message) {
    var errorElement = document.createElement('div');
    errorElement.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    errorElement.style.position = 'absolute';
    errorElement.style.left = 0;
    errorElement.style.right = 0;
    errorElement.style.fontSize = '30px';

    errorElement.textContent = message;
    document.body.appendChild(errorElement);
  };

  window.error = {
    add: createError
  };
})();
