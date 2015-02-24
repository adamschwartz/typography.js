(function() {
  var calculateBoundary, clearCanvas;

  clearCanvas = function(canvas, context) {
    return context.clearRect(0, 0, canvas.width, canvas.height);
  };

  calculateBoundary = function(text, canvas, context) {
    var alpha, highestY, lowestY, pixelData, r, textWidth, x, y, _i, _j, _ref;
    clearCanvas(canvas, context);
    context.fillStyle = 'red';
    textWidth = context.measureText(text).width;
    context.fillText(text, 0, 0);
    lowestY = void 0;
    highestY = void 0;
    for (x = _i = 0; 0 <= textWidth ? _i <= textWidth : _i >= textWidth; x = 0 <= textWidth ? ++_i : --_i) {
      for (y = _j = 0, _ref = canvas.height; 0 <= _ref ? _j <= _ref : _j >= _ref; y = 0 <= _ref ? ++_j : --_j) {
        pixelData = context.getImageData(x, y, x + 1, y + 1);
        r = pixelData.data[0];
        alpha = pixelData.data[3];
        if (r === 255 && alpha > 50) {
          if (!lowestY) {
            lowestY = y;
          }
          if (!highestY) {
            highestY = y;
          }
          if (y < lowestY) {
            lowestY = y;
          }
          if (y > highestY) {
            highestY = y;
          }
        }
      }
    }
    clearCanvas(canvas, context);
    return {
      lowestY: lowestY,
      highestY: highestY
    };
  };

  window.Typography = {
    evaluate: function(fontFamily, fontSize, fontWeight) {
      var ascenderHeight, baselineY, canvas, capHeight, context, descenderHeight, highestY, lowestY, xHeight, _ref, _ref1;
      canvas = document.createElement('canvas');
      context = canvas.getContext('2d');
      canvas.height = canvas.width = parseInt(fontSize, 10) * 1.4;
      Typography.normalizeContext(context);
      context.font = "" + fontWeight + " " + fontSize + "/normal '" + fontFamily + "'";
      _ref = calculateBoundary('I', canvas, context), lowestY = _ref.lowestY, highestY = _ref.highestY;
      baselineY = highestY;
      capHeight = baselineY - lowestY;
      lowestY = calculateBoundary('x', canvas, context).lowestY;
      xHeight = baselineY - lowestY;
      highestY = calculateBoundary('g', canvas, context).highestY;
      descenderHeight = highestY - baselineY;
      _ref1 = calculateBoundary('h', canvas, context), lowestY = _ref1.lowestY, highestY = _ref1.highestY;
      ascenderHeight = baselineY - lowestY;
      ascenderHeight = Math.max(ascenderHeight, capHeight);
      return {
        baselineY: baselineY,
        xHeight: xHeight,
        capHeight: capHeight,
        ascenderHeight: ascenderHeight,
        descenderHeight: descenderHeight,
        _: {
          canvas: canvas,
          context: context
        }
      };
    },
    normalizeContext: function(context) {
      context.textBaseline = 'top';
      context.textAlign = 'start';
      context.fontStretch = 1;
      return context.angle = 0;
    }
  };

}).call(this);
