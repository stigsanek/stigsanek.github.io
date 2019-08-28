'use strict';

// Модуль загрузки аватара
(function () {
  var FILE_TYPE = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChoserElement = document.querySelector('.upload input[type=file]');
  var previewElement = document.querySelector('.setup-user-pic');

  fileChoserElement.addEventListener('change', function () {
    var file = fileChoserElement.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPE.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        previewElement.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();
