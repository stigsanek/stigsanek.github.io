'use strict';

// Модуль отрисовки статистики игроков
(function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var GAP = 10;
  var BAR_WIDTH = 40;
  var BAR_HEIGTH = 150;
  var BAR_GAP = 50;
  var coordinateGraph = CLOUD_X + 4 * GAP;
  var coordinateText = CLOUD_X + 2 * GAP;

  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  var getMaxElement = function (array) {
    var maxElement = array[0];
    for (var i = 0; i < array.length; i++) {
      if (array[i] > maxElement) {
        maxElement = array[i];
      }
    }
    return maxElement;
  };

  var generateSaturateColor = function () {
    var randomNumber = Math.floor(Math.random() * 128);
    var randomColor = 'rgb(' + randomNumber + ', ' + randomNumber + ', ' + (255 - randomNumber) + ')';
    return randomColor;
  };

  window.renderStatistics = function (ctx, names, times) {
    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, 'rgb(255, 255, 255)');

    ctx.fillStyle = '#000000';
    ctx.font = '16px PT Mono';
    ctx.fillText('Ура вы победили!', coordinateText, CLOUD_Y + 3 * GAP);
    ctx.fillText('Список результатов:', coordinateText, CLOUD_Y + 5 * GAP);

    var maxTime = getMaxElement(times);

    for (var i = 0; i < names.length; i++) {
      ctx.fillText(Math.floor(times[i]), coordinateGraph + (BAR_WIDTH + BAR_GAP) * i, 90 + (BAR_HEIGTH - (times[i] * BAR_HEIGTH) / maxTime));
      if (names[i] === 'Вы') {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      } else {
        ctx.fillStyle = generateSaturateColor();
      }
      ctx.fillRect(coordinateGraph + (BAR_WIDTH + BAR_GAP) * i, 100 + (BAR_HEIGTH - (times[i] * BAR_HEIGTH) / maxTime), BAR_WIDTH, (times[i] * BAR_HEIGTH) / maxTime);
      ctx.fillStyle = '#000000';
      ctx.font = '16px PT Mono';
      ctx.fillText(names[i], coordinateGraph + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT);
    }
  };
})();
