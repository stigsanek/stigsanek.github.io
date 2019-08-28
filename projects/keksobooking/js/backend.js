'use strict';

// Модуль взаимодействия с сервером
(function () {
  var CODE_SUCCESS = 200;
  var ONE_SECOND = 1000;
  var TIMEOUT = 10000;
  var Url = {
    GET: 'https://js.dump.academy/keksobooking/data',
    POST: 'https://js.dump.academy/keksobooking'
  };

  // Метод получения данных
  var toRequest = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === CODE_SUCCESS) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout / ONE_SECOND + ' секунд');
    });

    xhr.timeout = TIMEOUT;

    return xhr;
  };

  window.backend = {
    download: function (onSuccess, onError) {
      var xhr = toRequest(onSuccess, onError);
      xhr.open('GET', Url.GET);
      xhr.send();
    },
    upload: function (data, onSuccess, onError) {
      var xhr = toRequest(onSuccess, onError);
      xhr.open('POST', Url.POST);
      xhr.send(data);
    }
  };
})();
