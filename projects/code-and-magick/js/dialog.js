'use strict';

// Модуль управления окном настроек
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  // Логика открытия и закрытия окна настройки персонажа
  var userDialog = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = userDialog.querySelector('.setup-close');
  var userNameInput = userDialog.querySelector('.setup-user-name');

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE && userNameInput !== document.activeElement) {
      closePopup();
    }
  };

  var userDialogDeafaultX = 0;
  var userDialogDeafaultY = 0;

  var openPopup = function () {
    userDialog.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    // Сохраняем первоначальные координаты окна
    userDialogDeafaultX = userDialog.offsetLeft;
    userDialogDeafaultY = userDialog.offsetTop;
  };

  var closePopup = function () {
    userDialog.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    userDialog.style.top = userDialogDeafaultY + 'px';
    userDialog.style.left = userDialogDeafaultX + 'px';
  };


  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
    }
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  });

  // Перемещение окна настройки персонажа
  var dialogHandler = document.querySelector('.upload');

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var dragged = false;

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      userDialog.style.top = (userDialog.offsetTop - shift.y) + 'px';
      userDialog.style.left = (userDialog.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // Перемещение артефактов
  var shopArtifactElement = userDialog.querySelector('.setup-artifacts-shop');
  var draggedItem = null;

  shopArtifactElement.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }
  });

  var backpackArtifactsElement = userDialog.querySelector('.setup-artifacts');

  backpackArtifactsElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  backpackArtifactsElement.addEventListener('drop', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.target.appendChild(draggedItem);
  });


  backpackArtifactsElement.addEventListener('dragenter', function (evt) {
    evt.target.style.backgroundColor = 'yellow';
    evt.preventDefault();
  });

  backpackArtifactsElement.addEventListener('dragleave', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  });

  // Отправка формы
  var form = userDialog.querySelector('.setup-wizard-form');

  var submitForm = function (callback, onError) {
    form.addEventListener('submit', function (evt) {
      callback(new FormData(form), function () {
        userDialog.classList.add('hidden');
      }, onError);
      evt.preventDefault();
    });
  };

  window.dialog = {
    save: submitForm
  };
})();
