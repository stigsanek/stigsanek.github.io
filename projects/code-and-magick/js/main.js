'use strict';

(function () {
  // Передаем метод отрисовки модулю фильтров
  window.filter.init(window.wizard.render);

  document.addEventListener('DOMContentLoaded', function () {
    // Загружает данные и активирует фильтрацию персонажей
    window.backend.load(window.filter.change, window.error.add);
    document.querySelector('.setup').querySelector('.setup-similar').classList.remove('hidden');

    // Отправляет данные на сервер
    window.dialog.save(window.backend.save, window.error.add);
  });
})();
