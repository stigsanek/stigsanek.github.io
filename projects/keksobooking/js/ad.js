'use strict';

//  Модуль создания метки, карточки и ошибки загрузки объявления
(function () {
  var Pin = {
    WIDTH: 50,
    HEIGHT: 70
  };

  var typeHouseMap = {
    'bungalo': 'Бунгало',
    'flat': 'Квартира',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  var featuresClassListMap = {
    'wifi': 'popup__feature--wifi',
    'dishwasher': 'popup__feature--dishwasher',
    'parking': 'popup__feature--parking',
    'washer': 'popup__feature--washer',
    'elevator': 'popup__feature--elevator',
    'conditioner': 'popup__feature--conditioner'
  };

  var currentPin = null; // текущая метка
  var currentCard = null; // текущая карточка

  // Получение методов для отрисовки карточки на карте и обработки события по ESC
  var insertCard = null;
  var pressEsc = null;
  var setCardMethod = function (insertMethod, utilMethod) {
    insertCard = insertMethod;
    pressEsc = utilMethod;
  };

  // Метод создания метки объявления
  var templatePinElement = document.querySelector('#pin').content.querySelector('.map__pin');

  var createNewPin = function (element) {
    var newPinElement = templatePinElement.cloneNode(true);
    // Если в полученных данных нет свойства offer то метка объявления не создается
    if (element['offer']) {
      newPinElement.style.left = element['location']['x'] - Pin.WIDTH / 2 + 'px';
      newPinElement.style.top = element['location']['y'] - Pin.HEIGHT + 'px';
      var pictureElement = newPinElement.querySelector('img');
      pictureElement.src = element['author']['avatar'];
      pictureElement.alt = element['offer']['title'];
    }

    newPinElement.addEventListener('click', function () {
      closeCard();
      insertCard(element, createNewCard);

      if (currentPin) {
        currentPin.classList.remove('map__pin--active');
      }
      currentPin = newPinElement;
      currentPin.classList.add('map__pin--active');

      document.addEventListener('keydown', onCardEscPress);
    });

    return newPinElement;
  };

  // Метод создания карточки объявления
  var templateCardElement = document.querySelector('#card').content.querySelector('.map__card');

  var createNewCard = function (element) {
    var newCardElement = templateCardElement.cloneNode(true);
    newCardElement.querySelector('img').src = element['author']['avatar'];
    newCardElement.querySelector('.popup__title').textContent = element['offer']['title'];
    newCardElement.querySelector('.popup__text--address').textContent = element['offer']['address'];
    newCardElement.querySelector('.popup__text--price').textContent = element['offer']['price'] + '₽/ночь';
    newCardElement.querySelector('.popup__type').textContent = typeHouseMap[element['offer']['type']];
    newCardElement.querySelector('.popup__text--capacity').textContent = element['offer']['rooms'] + ' комнаты для ' + element['offer']['guests'] + ' гостей';
    newCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + element['offer']['checkin'] + ', выезд до ' + element['offer']['checkout'];

    // Если в полученных данных есть блок с удобствами, то он добавляется
    var featuresListElement = newCardElement.querySelector('.popup__features');
    var featuresElements = newCardElement.querySelectorAll('.popup__feature');
    var featuresItemElement = newCardElement.querySelector('.popup__feature:first-child');
    featuresItemElement.className = 'popup__feature';
    if (element['offer']['features']) {
      featuresElements.forEach(function (item) {
        item.remove();
      });
      element['offer']['features'].forEach(function (item) {
        var newFeaturesElement = featuresItemElement.cloneNode('true');
        newFeaturesElement.classList.add(featuresClassListMap[item]);
        featuresListElement.appendChild(newFeaturesElement);
      });
    } else {
      featuresListElement.remove();
    }

    newCardElement.querySelector('.popup__description').textContent = element['offer']['description'];

    // Если в полученных данных есть фотографии, то они добавляются
    var pictureWrapElement = newCardElement.querySelector('.popup__photos');
    var pictureElement = pictureWrapElement.querySelector('.popup__photo');
    if (element['offer']['photos']) {
      pictureElement.remove();
      element['offer']['photos'].forEach(function (item) {
        var newPictureElement = pictureElement.cloneNode(true);
        newPictureElement.src = item;
        pictureWrapElement.appendChild(newPictureElement);
      });
    } else {
      pictureWrapElement.remove();
    }

    currentCard = newCardElement;

    currentCard.querySelector('.popup__close').addEventListener('click', function () {
      closeCard();
    });
    return newCardElement;
  };

  // Функция закрытия карточки по ESC
  var onCardEscPress = function (evt) {
    pressEsc(evt, closeCard);
  };

  // Метод закрытия карточки объявления
  var closeCard = function () {
    if (currentCard) {
      currentCard.remove();
      currentPin.classList.remove('map__pin--active');
      document.removeEventListener('keydown', onCardEscPress);
    }
    currentCard = null;
  };

  window.ad = {
    createPin: createNewPin,
    initiate: setCardMethod,
    close: closeCard
  };
})();
