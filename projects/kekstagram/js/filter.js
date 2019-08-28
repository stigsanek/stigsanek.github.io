'use strict';

// Модуль фильтрации
(function () {
  var NEW_ELEMENT = 10;

  var filterElement = document.querySelector('.img-filters');
  var filterFormElement = filterElement.querySelector('.img-filters__form');
  var filterNewElement = filterFormElement.querySelector('#filter-new');
  var filterPopularElement = filterFormElement.querySelector('#filter-popular');
  var filterDiscussedElement = filterFormElement.querySelector('#filter-discussed');
  var filterButtonElements = filterFormElement.querySelectorAll('button');

  // Метод активации фильтра
  var enableFilter = function () {
    filterElement.classList.remove('img-filters--inactive');
  };

  // Получение метода для удаления элементов
  var removeElement = null;
  var setRemoveMethod = function (removeMethod) {
    removeElement = removeMethod;
  };

  // Метод фильтрации элементов
  var getFilterData = function (data, insertMethod, insertElement, doDebounce) {
    var initialData = data.slice();
    var filterData = null;
    var currentFilter = null;

    var onFilterForm = doDebounce(function (evt) {
      removeElement();

      switch (evt.target) {
        case filterPopularElement:
          filterData = data;
          break;
        case filterNewElement:
          filterData = data.slice(data.length - NEW_ELEMENT, data.length);
          break;
        case filterDiscussedElement:
          filterData = initialData.sort(function (firstElement, lastElement) {
            return lastElement.comments.length - firstElement.comments.length;
          });
          break;
      }

      filterButtonElements.forEach(function (item) {
        item.classList.remove('img-filters__button--active');
      });

      currentFilter = evt.target;
      currentFilter.classList.add('img-filters__button--active');
      insertMethod(filterData, insertElement);
    });

    filterFormElement.addEventListener('click', onFilterForm);
  };

  window.filter = {
    enable: enableFilter,
    employ: getFilterData,
    initiate: setRemoveMethod
  };
})();
