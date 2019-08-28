'use strict';

// Модуль валидации формы подачи объявления
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var PICTURE_SIZE = 70;
  var DEAFAULT_AVA_SRC = 'img/muffin-grey.svg';

  var typeHousePriceMap = {
    'bungalo': '0',
    'flat': '1000',
    'house': '5000',
    'palace': '10000'
  };

  var roomCapacityMap = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var mainFormElement = document.querySelector('.ad-form');
  var formFieldsElements = mainFormElement.querySelectorAll('fieldset');

  // Метод перевода формы в неактивное состояние
  var disableForm = function () {
    mainFormElement.classList.add('ad-form--disabled');
    formFieldsElements.forEach(function (item) {
      item.disabled = true;
    });
    // Сброс значений всех полей
    resetForm();
  };

  // Метод перевода формы в активное состояние
  var enableForm = function () {
    mainFormElement.classList.remove('ad-form--disabled');
    formFieldsElements.forEach(function (item) {
      item.disabled = false;
    });

    typeSelectElement.addEventListener('change', onTypeSelectChange);
    timeInSelectElement.addEventListener('change', onTimeInChange);
    timeOutSelectElement.addEventListener('change', onTimeOutChange);
    roomSelectElement.addEventListener('change', onRoomSelectChange);
    avatarChoserElement.addEventListener('change', onAvatarPictureChange);
    pictureChoserElement.addEventListener('change', onHousePictureChange);
  };

  // Метод заполнения поле адреса
  var userAddressInputElement = mainFormElement.querySelector('#address');
  var insertValueAddress = function (coordinate) {
    userAddressInputElement.value = coordinate();
  };

  // Определение минимальной стоимости в зависимости от типа выбранного жилья
  var priceInputElement = mainFormElement.querySelector('#price');
  var typeSelectElement = mainFormElement.querySelector('#type');

  var onTypeSelectChange = function () {
    priceInputElement.min = typeHousePriceMap[typeSelectElement.value];
    priceInputElement.placeholder = typeHousePriceMap[typeSelectElement.value];
  };

  // Синхронизация полей заезда/выезда
  var timeInSelectElement = mainFormElement.querySelector('#timein');
  var timeOutSelectElement = mainFormElement.querySelector('#timeout');

  var onTimeInChange = function () {
    timeOutSelectElement.value = timeInSelectElement.value;
  };
  var onTimeOutChange = function () {
    timeInSelectElement.value = timeOutSelectElement.value;
  };

  // Синхронизация количества гостей от колиества комнат
  var roomSelectElement = mainFormElement.querySelector('#room_number');
  var capacityOptionElements = mainFormElement.querySelector('#capacity').querySelectorAll('option');

  var onRoomSelectChange = function () {
    capacityOptionElements.forEach(function (option) {
      option.disabled = true;
      option.selected = false;

      if (roomCapacityMap[roomSelectElement.value].indexOf(option.value) > -1) {
        option.disabled = false;
        option.selected = true;
      }
    });
  };

  // Функция загрузки изображений в форму
  var insertPictures = [];

  var addPicture = function (choser, image, container) {
    var newFiles = Array.from(choser.files);
    newFiles.forEach(function (element) {
      var fileName = element.name.toLowerCase();
      var fileMatchEnd = function (item) {
        return fileName.endsWith(item);
      };

      var matches = FILE_TYPES.some(fileMatchEnd);

      if (matches) {
        var readerPicture = new FileReader();
        if (container) {
          image.remove();
          var onPictureLoad = function () {
            var newBlockElement = image.cloneNode(true);
            var newPictureElement = document.createElement('img');
            newPictureElement.width = PICTURE_SIZE;
            newPictureElement.height = PICTURE_SIZE;
            newPictureElement.src = readerPicture.result;
            newBlockElement.appendChild(newPictureElement);
            insertPictures.push(newBlockElement);
            container.appendChild(newBlockElement);
          };
          readerPicture.addEventListener('load', onPictureLoad);
        } else {
          var onAvatarLoad = function () {
            image.src = readerPicture.result;
          };
          readerPicture.addEventListener('load', onAvatarLoad);
        }
        readerPicture.readAsDataURL(element);
      }
    });
  };

  // Загрузка аватара
  var avatarChoserElement = mainFormElement.querySelector('#avatar');
  var avatarImageElement = mainFormElement.querySelector('.ad-form-header__preview').querySelector('img');

  var onAvatarPictureChange = function () {
    addPicture(avatarChoserElement, avatarImageElement);
  };

  // Загрузка фотографий жилья
  var pictureChoserElement = mainFormElement.querySelector('#images');
  var picturesContainerElement = mainFormElement.querySelector('.ad-form__photo-container');
  var pictureBlockElement = mainFormElement.querySelector('.ad-form__photo');

  var onHousePictureChange = function () {
    addPicture(pictureChoserElement, pictureBlockElement, picturesContainerElement);
  };

  // Функция удаления изображений
  var removePicture = function () {
    insertPictures.forEach(function (item) {
      item.remove();
    });
    picturesContainerElement.appendChild(pictureBlockElement);
    avatarImageElement.src = DEAFAULT_AVA_SRC;
  };

  // Функция сброса значений всех полей формы
  var resetForm = function () {
    mainFormElement.reset();
    typeSelectElement.removeEventListener('change', onTypeSelectChange);
    timeInSelectElement.removeEventListener('change', onTimeInChange);
    timeOutSelectElement.removeEventListener('change', onTimeOutChange);
    roomSelectElement.removeEventListener('change', onRoomSelectChange);
    avatarChoserElement.removeEventListener('change', onAvatarPictureChange);
    pictureChoserElement.removeEventListener('change', onHousePictureChange);
    onTypeSelectChange();
    onRoomSelectChange();
    removePicture();
  };

  // Метод отправки данных формы
  var resetBtnElement = mainFormElement.querySelector('.ad-form__reset');

  var saveData = function (requestMethod, onSuccsess, onError, callbackReset) {
    // Обработчик отправки формы
    var onFormSubmit = function (evt) {
      evt.preventDefault();
      requestMethod(new FormData(mainFormElement), onSuccsess, onError);
      callbackReset();
      mainFormElement.removeEventListener('submit', onFormSubmit);
      resetBtnElement.removeEventListener('click', onFormReset);
    };
    mainFormElement.addEventListener('submit', onFormSubmit);

    // Обработчик сброса формы
    var onFormReset = function (evt) {
      evt.preventDefault();
      callbackReset();
      mainFormElement.removeEventListener('submit', onFormSubmit);
      resetBtnElement.removeEventListener('click', onFormReset);
    };
    resetBtnElement.addEventListener('click', onFormReset);
  };

  window.form = {
    disable: disableForm,
    enable: enableForm,
    insertAddress: insertValueAddress,
    send: saveData
  };
})();
