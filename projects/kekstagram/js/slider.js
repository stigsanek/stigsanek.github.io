'use strict';

// Модуль управления слайдером
(function () {
  var Slider = {
    SIZE: 20,
    LINE: 100
  };
  var DEFAULT_POSITION = 453;

  var sliderLineElement = document.querySelector('.effect-level__line');
  var sliderElement = sliderLineElement.querySelector('.effect-level__pin');

  // Обработчик перемещения слайдера
  var onSliderElementMove = function (callback) {
    return function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
        };

        startCoords = {
          x: moveEvt.clientX,
        };

        var displacementX = sliderElement.offsetLeft - shift.x;
        if (displacementX >= sliderLineElement.offsetLeft - Slider.SIZE && displacementX <= sliderLineElement.offsetLeft + sliderLineElement.offsetWidth - Slider.SIZE) {
          sliderElement.style.left = displacementX + 'px';
          callback(Math.floor(displacementX * Slider.LINE / sliderLineElement.offsetWidth));
        }
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };
  };

  // Метод выполнения callback при перемещении слайдера
  var onSliderMouseDown = null;
  var performCallback = function (callback) {
    onSliderMouseDown = onSliderElementMove(callback);
    sliderElement.addEventListener('mousedown', onSliderMouseDown);
  };

  // Метод сброса положения слайдера
  var resetSlider = function () {
    sliderElement.style.left = DEFAULT_POSITION + 'px';
  };

  // Метод удаления обработчика слайдера
  var removeHandler = function () {
    sliderElement.removeEventListener('mousedown', onSliderMouseDown);
  };

  window.slider = {
    enable: performCallback,
    remove: removeHandler,
    reset: resetSlider
  };
})();
