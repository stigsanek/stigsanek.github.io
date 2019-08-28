'use strict';

// Модуль создания похожих персонажей
(function () {
  var WIZARD_LENGTH = 4;

  // Функция создания персонажа
  var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var createWizard = function (element) {
    var newWizard = wizardTemplate.cloneNode(true);
    newWizard.querySelector('.setup-similar-label').innerText = element.name;
    newWizard.querySelector('.wizard-coat').style.fill = element.colorCoat;
    newWizard.querySelector('.wizard-eyes').style.fill = element.colorEyes;

    return newWizard;
  };

  // Метод добавления персонажей в разметку
  var wizardList = document.querySelector('.setup-similar-list');

  var addWizard = function (data) {
    if (data.length > WIZARD_LENGTH) {
      data.length = WIZARD_LENGTH;
      wizardList.innerHTML = '';
      for (var i = 0; i < WIZARD_LENGTH; i++) {
        wizardList.appendChild(createWizard(data[i]));
      }
    }
  };

  window.wizard = {
    render: addWizard
  };
})();
