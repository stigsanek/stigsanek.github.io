'use strict';

// Модуль управления картой
(function () {
  var mapElement = document.querySelector('.map');
  var mapPinListElement = mapElement.querySelector('.map__pins');

  // Метод перевода карты в неактивное состояние
  var disablePage = function () {
    mapElement.classList.add('map--faded');
  };

  // Метод перевода карты в активное состояние
  var enablePage = function () {
    mapElement.classList.remove('map--faded');
  };

  // Метод добавления элементов на карту
  // Массив добавляемых элементов записывается в пустой массив для простоты удаления элементов с карты
  var mapListElemnts = [];
  // Если добавляется один элемент, то он записывается в переменную
  var mapItemElement = null;

  var insertElement = function (data, render) {
    var nodeElement = null;

    if (Array.isArray(data)) {
      var fragmentElement = document.createDocumentFragment();
      data.forEach(function (item) {
        nodeElement = render(item);
        fragmentElement.appendChild(nodeElement);
        mapListElemnts.push(nodeElement);
      });
      mapPinListElement.appendChild(fragmentElement);
    } else {
      nodeElement = render(data);
      mapItemElement = nodeElement;
      mapPinListElement.insertAdjacentElement('afterend', nodeElement);
    }
  };

  //  Метод удаления элементов с карты
  var removeElement = function (callBackRemove) {
    mapListElemnts.forEach(function (item) {
      item.remove();
    });
    mapListElemnts = [];

    if (mapItemElement) {
      mapItemElement.remove();
      mapItemElement = null;
    }
    if (callBackRemove) {
      callBackRemove();
    }
  };

  window.map = {
    disable: disablePage,
    enable: enablePage,
    clear: removeElement,
    insert: insertElement,
  };
})();
