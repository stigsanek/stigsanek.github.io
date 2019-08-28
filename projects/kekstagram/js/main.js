'use strict';

// Гланый моудль
(function () {
  // Функция перехода страницы в активносе состояние
  var enablePage = function (responce) {
    window.data.set(responce);
    window.gallery.render(window.data.get(), window.photo.create);
    window.filter.employ(window.data.get(), window.gallery.render, window.photo.create, window.util.makeDebounce);
    window.filter.enable();
  };

  // Передаем модулую фотографий метод отрисовки и метод закрытия по Esc
  window.photo.initiate(window.gallery.render, window.util.pressEsc);
  // Передаем модулую формы метод закрытия по Esc, метод удаления обработчика слайдера и метод сброса положения слайдера
  window.form.initiate(window.util.pressEsc, window.slider.remove, window.slider.reset);
  // Передаем модулю фильтров метод удаления элементов со страницы
  window.filter.initiate(window.gallery.clear);
  // Передаем модулую сообщений метод закрытия по Esc
  window.message.initiate(window.util.pressEsc);

  document.addEventListener('DOMContentLoaded', function () {
    window.backend.download(enablePage);

    // Активируем форму
    window.form.activate(function () {
      window.form.enable();
      // Активируем слайдер
      window.slider.enable(window.form.applyEffect);
      // Активируем отправку формы и добавление загруженного изображения в галлерею
      window.form.send(window.backend.upload, window.message.getSuccess, window.message.getError, window.gallery.render, window.photo.create);
    });
  });
})();
