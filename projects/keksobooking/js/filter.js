'use strict';

// Модуль управления фильтром
(function () {
  var MAX_DATA = 5;
  var ANY_TYPE = 'any';

  var Price = {
    LOW: 10000,
    HIGH: 50000
  };

  var formFilterElement = document.querySelector('.map__filters');
  var selectFilterElements = formFilterElement.querySelectorAll('select');
  var housingTypeElement = formFilterElement.querySelector('#housing-type');
  var housingRoomsElement = formFilterElement.querySelector('#housing-rooms');
  var housingGuestsElement = formFilterElement.querySelector('#housing-guests');
  var housingPriceElement = formFilterElement.querySelector('#housing-price');

  // Метод перевода фильтра в неактивное состояние
  var disableFilter = function () {
    selectFilterElements.forEach(function (item) {
      item.disabled = true;
    });
    // Сброс значений фильтров
    resetFilter();
  };

  // Метод перевода фильтра в активное состояние
  var enableFilter = function () {
    selectFilterElements.forEach(function (item) {
      item.disabled = false;
    });
  };

  // Получение метода для удаления элементов
  var removeElement = null;
  var setRemoveMethod = function (removeMethod) {
    removeElement = removeMethod;
  };

  // Метод фильтрации элементов
  var dataFlag = false;
  var onFormFilterChange = null;

  var getFilterData = function (data, insertMethod, insertElement, doDebounce) {
    var initialData = data.slice();
    var filterData = initialData;

    if (!dataFlag) {
      insertMethod(initialData.slice(0, MAX_DATA), insertElement);
      dataFlag = true;
    }

    onFormFilterChange = doDebounce(function () {
      filterData = initialData.filter(function (item) {
        return doFiltereType(item) && doFilterPrice(item) && doFilterRooms(item) && doFilterGuests(item) && doFilterFeatures(item);
      });
      removeElement();
      insertMethod(filterData.slice(0, MAX_DATA), insertElement);
    });

    formFilterElement.addEventListener('change', onFormFilterChange);
  };

  // Функция фильтрации по типу жилья
  var doFiltereType = function (element) {
    return housingTypeElement.value === ANY_TYPE || element['offer']['type'] === housingTypeElement.value;
  };

  // Функция фильтрации по цене
  var doFilterPrice = function (element) {
    if (housingPriceElement.value !== ANY_TYPE) {
      switch (housingPriceElement.value) {
        case 'low':
          return element['offer']['price'] < Price.LOW;
        case 'high':
          return element['offer']['price'] > Price.HIGH;
        case 'middle':
          return element['offer']['price'] >= Price.LOW && element['offer']['price'] <= Price.HIGH;
      }
    }
    return true;
  };

  // Функция фильтрации по количеству комнат
  var doFilterRooms = function (element) {
    return housingRoomsElement.value === ANY_TYPE || element['offer']['rooms'] === parseInt(housingRoomsElement.value, 10);
  };

  // Функция фильтрации по количеству гостей
  var doFilterGuests = function (element) {
    return housingGuestsElement.value === ANY_TYPE || element['offer']['guests'] === parseInt(housingGuestsElement.value, 10);
  };

  // Функция фильтрации по удобствам
  var doFilterFeatures = function (element) {
    var featuresElements = formFilterElement.querySelectorAll('.map__checkbox:checked');
    var checkedFeatures = [];

    featuresElements.forEach(function (item) {
      checkedFeatures.push(item.value);
    });

    if (checkedFeatures.length > 0) {
      return checkedFeatures.every(function (item) {
        return element['offer']['features'].includes(item);
      });
    }
    return true;
  };

  // Функция сброса всех значений формы фильтров
  var resetFilter = function () {
    formFilterElement.reset();
    dataFlag = false;
    formFilterElement.removeEventListener('change', onFormFilterChange);
  };

  window.filter = {
    disable: disableFilter,
    enable: enableFilter,
    initiate: setRemoveMethod,
    employ: getFilterData
  };
})();
