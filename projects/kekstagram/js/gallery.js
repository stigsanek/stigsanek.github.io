'use strict';

// Модуль страницы
(function () {
  // Метод добавления элементов на страницу
  var photoListElement = document.querySelector('.pictures');

  var galleryListElements = [];

  var insertElement = function (data, render) {
    var newNodeElement = null;

    if (Array.isArray(data)) {
      var fragmentElement = document.createDocumentFragment();

      data.forEach(function (element) {
        newNodeElement = render(element);
        fragmentElement.appendChild(newNodeElement);
        galleryListElements.push(newNodeElement);
      });
      photoListElement.appendChild(fragmentElement);
    } else {
      render(data);
    }
  };

  // Метод удаления элементов со страницы
  var removeElement = function () {
    galleryListElements.forEach(function (item) {
      item.remove();
    });
    galleryListElements = [];
  };

  window.gallery = {
    render: insertElement,
    clear: removeElement
  };
})();
