'use strict';

(function () {
  var MainPin = {
    WIDTH: 65,
    HEIGHT: 84
  };

  var MapBorder = {
    TOP: 130,
    BOTTOM: 630
  };

  var mapPinListElement = document.querySelector('.map__pins');
  var mainPinElement = mapPinListElement.querySelector('.map__pin--main');

  // Функция сброса положения метки в исходное состояние
  var startPinCoordinate = mainPinElement.getBoundingClientRect();
  var startPinListElementCoordinate = mapPinListElement.getBoundingClientRect();

  var resetCoordinate = function () {
    pageAciveFlag = false;
    mainPinElement.style.left = startPinCoordinate.left - startPinListElementCoordinate.left + 'px';
    mainPinElement.style.top = startPinCoordinate.top - startPinListElementCoordinate.top + 'px';
  };

  // Метод определения координат метки относительно краев карты
  var pageAciveFlag = false;
  var getCoordinateMainPin = function () {
    var mainPinCoordinate = mainPinElement.getBoundingClientRect();
    var mapPinListElementCoordinate = mapPinListElement.getBoundingClientRect();
    var coordX = Math.floor(mainPinCoordinate.left - mapPinListElementCoordinate.left + MainPin.WIDTH / 2);
    // Если страница не активна, адресом будет середина метки
    if (!pageAciveFlag) {
      var coordY = Math.floor(mainPinCoordinate.top - mapPinListElementCoordinate.top + MainPin.WIDTH / 2);
      pageAciveFlag = true;
    } else {
      coordY = Math.floor(mainPinCoordinate.top - mapPinListElementCoordinate.top + MainPin.HEIGHT);
    }
    return coordX + ', ' + coordY;
  };

  // Метод активации страницы при перемещении метки
  var onMainPinMouseDown = null;

  var goToActive = function (callBack, callbackCoord) {
    // В неактивном состоянии в поле адреса подставляются координаты центра метки
    callbackCoord();
    onMainPinMouseDown = onMainPinDown(callBack, callbackCoord);
    var onMainPinMouseMove = onMainPinMove(callbackCoord);
    mainPinElement.addEventListener('mousedown', onMainPinMouseDown);
    mainPinElement.addEventListener('mousedown', onMainPinMouseMove);
  };

  // Обработчик, выполняющий действия по mousedown
  var onMainPinDown = function (callBack, callbackCoord) {
    return function () {
      callBack();
      callbackCoord();
      mainPinElement.removeEventListener('mousedown', onMainPinMouseDown);
    };
  };

  // Обработчик перемещения метки
  var onMainPinMove = function (callbackCoord) {
    return function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        var displacementX = mainPinElement.offsetLeft - shift.x;
        var displacementY = mainPinElement.offsetTop - shift.y;

        if ((displacementY >= mapPinListElement.offsetTop + (MapBorder.TOP - MainPin.HEIGHT)) && (displacementY <= MapBorder.BOTTOM - MainPin.HEIGHT)) {
          mainPinElement.style.top = displacementY + 'px';
        }

        if (displacementX >= mapPinListElement.offsetLeft && displacementX <= mapPinListElement.offsetLeft + mapPinListElement.offsetWidth - MainPin.WIDTH) {
          mainPinElement.style.left = displacementX + 'px';
        }
        callbackCoord();
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        callbackCoord();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };
  };

  // Метод сброса состояния метки
  var resetMainPin = function () {
    mainPinElement.addEventListener('mousedown', onMainPinMouseDown);
    resetCoordinate();
  };

  window.mainPin = {
    initiate: goToActive,
    getCoord: getCoordinateMainPin,
    reset: resetMainPin
  };
})();
