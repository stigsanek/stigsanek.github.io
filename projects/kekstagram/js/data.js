'use strict';

// Модуль управления данными
(function () {
  var data = null;

  var setData = function (newData) {
    data = newData;
  };

  var getData = function () {
    return data;
  };

  window.data = {
    set: setData,
    get: getData
  };
})();
