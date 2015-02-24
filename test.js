(function() {
  window.test = function(fontFamily, fontSize, fontWeight, drawSmartUnderlines) {
    var ascenderHeight, baselineY, canvasWrapDiv, canvasWrapOuterDiv, capHeight, descenderHeight, descenderY, domTextDiv, fontSizeInt, lineHeightInt, resultsParagraph, smartUnderlinePosition, smartUnderlinePositionPercent, smartUnderlineResult, testDiv, testId, testString, testTitle, textHeight, textWidth, xHeight, _, _ref;
    _ref = Typography.evaluate(fontFamily, fontSize, fontWeight), baselineY = _ref.baselineY, xHeight = _ref.xHeight, capHeight = _ref.capHeight, ascenderHeight = _ref.ascenderHeight, descenderHeight = _ref.descenderHeight, _ = _ref._;
    testId = "" + fontFamily + " " + fontSize + " " + fontWeight;
    testString = "" + fontFamily + " Ixgh";
    fontSizeInt = parseInt(fontSize, 10);
    lineHeightInt = fontSizeInt * 1.4;
    testDiv = document.createElement('div');
    testDiv.className = 'test';
    testDiv.setAttribute('data-test-id', testId);
    domTextDiv = document.createElement('div');
    domTextDiv.className = 'dom-text';
    domTextDiv.textContent = testString;
    domTextDiv.style.fontSize = fontSize;
    domTextDiv.style.fontWeight = fontWeight;
    domTextDiv.style.fontFamily = fontFamily;
    canvasWrapDiv = document.createElement('div');
    canvasWrapDiv.className = 'canvas-wrap';
    canvasWrapDiv.appendChild(_.canvas);
    canvasWrapDiv.appendChild(domTextDiv);
    canvasWrapOuterDiv = document.createElement('div');
    canvasWrapOuterDiv.className = 'canvas-wrap-outer';
    canvasWrapOuterDiv.style.minHeight = "" + lineHeightInt + "px";
    canvasWrapOuterDiv.appendChild(canvasWrapDiv);
    testTitle = document.createElement('h2');
    testTitle.textContent = "" + fontSize + " " + fontWeight;
    resultsParagraph = document.createElement('p');
    resultsParagraph.textContent = "baselineY      " + baselineY + "\nxHeight        " + xHeight + "\ncapHeight      " + capHeight + "\nascenderHght   " + ascenderHeight + "\ndescenderHght  " + descenderHeight;
    textWidth = _.context.measureText(testString).width;
    _.canvas.width = textWidth;
    Typography.normalizeContext(_.context);
    _.context.font = "" + fontWeight + " " + fontSize + "/normal '" + fontFamily + "'";
    _.context.fillStyle = '#a0a0a0';
    _.context.fillRect(0, 0, _.canvas.width, 1);
    _.context.fillStyle = 'red';
    _.context.fillRect(0, baselineY, _.canvas.width, 1);
    _.context.fillStyle = 'orange';
    _.context.fillRect(0, baselineY - xHeight, _.canvas.width, 1);
    _.context.fillStyle = 'yellow';
    _.context.fillRect(0, baselineY - capHeight, _.canvas.width, 1);
    _.context.fillStyle = 'green';
    _.context.fillRect(0, baselineY - ascenderHeight, _.canvas.width, 1);
    _.context.fillStyle = 'blue';
    _.context.fillRect(0, baselineY + descenderHeight, _.canvas.width, 1);
    _.context.fillStyle = 'red';
    _.context.fillText(testString, 0, 0);
    testDiv.appendChild(canvasWrapOuterDiv);
    testDiv.appendChild(testTitle);
    testDiv.appendChild(resultsParagraph);
    if (ascenderHeight < capHeight || capHeight < xHeight) {
      testDiv.classList.add('fail');
    }
    if (baselineY <= 0 || xHeight <= 0 || capHeight <= 0 || ascenderHeight <= 0 || descenderHeight <= 0) {
      testDiv.classList.add('fail');
    }
    if (baselineY > lineHeightInt || xHeight > lineHeightInt || capHeight > lineHeightInt || ascenderHeight > lineHeightInt || descenderHeight > lineHeightInt) {
      testDiv.classList.add('fail');
    }
    results.appendChild(testDiv);
    if (drawSmartUnderlines) {
      testDiv.classList.add('with-smart-underline');
      textHeight = domTextDiv.getClientRects()[0].height - 1;
      descenderY = baselineY + descenderHeight;
      smartUnderlinePosition = Math.max(((descenderY - baselineY) / 2) + 1, 3) + baselineY;
      if (descenderHeight === 3) {
        smartUnderlinePosition = baselineY + descenderHeight;
      }
      smartUnderlinePositionPercent = Math.round(100 * smartUnderlinePosition / textHeight);
      if (descenderHeight > 2 && fontSizeInt > 10 && smartUnderlinePositionPercent <= 100) {
        domTextDiv.style.textShadow = '0.03em 0 #fff, -0.03em 0 #fff, 0 0.03em #fff, 0 -0.03em #fff, 0.06em 0 #fff, -0.06em 0 #fff, 0.09em 0 #fff, -0.09em 0 #fff, 0.12em 0 #fff, -0.12em 0 #fff, 0.15em 0 #fff, -0.15em 0 #fff';
        domTextDiv.style.backgroundImage = '-webkit-linear-gradient(#fff, #fff), -webkit-linear-gradient(#fff, #fff), -webkit-linear-gradient(#000, #000)';
        domTextDiv.style.backgroundImage = 'linear-gradient(#fff, #fff), -webkit-linear-gradient(#fff, #fff), -webkit-linear-gradient(#000, #000)';
        domTextDiv.style.backgroundSize = '0.05em 1px, 0.05em 1px, 1px 1px';
        domTextDiv.style.backgroundRepeat = 'no-repeat, no-repeat, repeat-x';
        domTextDiv.style.backgroundPosition = "0% " + smartUnderlinePositionPercent + "%, 100% " + smartUnderlinePositionPercent + "%, 0% " + smartUnderlinePositionPercent + "%";
        smartUnderlineResult = document.createElement('p');
        smartUnderlineResult.innerHTML = "underlinePosY  " + smartUnderlinePositionPercent + "%";
        return testDiv.appendChild(smartUnderlineResult);
      } else {
        return domTextDiv.style.textDecoration = 'underline';
      }
    }
  };

  window.testSuite = function() {
    var fontFamilies, fontFamily, size, sizes, _i, _len, _results;
    fontFamilies = ['Arial', 'Futura', 'Georgia', 'Gill Sans', 'Helvetica', 'Helvetica Neue', 'monospace', 'sans-serif', 'serif', 'Times', 'Times New Roman'];
    sizes = ['36px', '24px', '16px', '16px', '8px'];
    _results = [];
    for (_i = 0, _len = sizes.length; _i < _len; _i++) {
      size = sizes[_i];
      _results.push((function() {
        var _j, _len1, _results1;
        _results1 = [];
        for (_j = 0, _len1 = fontFamilies.length; _j < _len1; _j++) {
          fontFamily = fontFamilies[_j];
          test(fontFamily, size, 'normal');
          if (size === '16px') {
            _results1.push(test(fontFamily, size, 'bold'));
          } else {
            _results1.push(void 0);
          }
        }
        return _results1;
      })());
    }
    return _results;
  };

  window.testFontsInSizeRange = function(fontFamilies, smallestSize, largestSize) {
    var drawSmartUnderlines, fontFamily, size, _i, _results;
    if (smallestSize == null) {
      smallestSize = 8;
    }
    if (largestSize == null) {
      largestSize = 36;
    }
    if (typeof fontFamilies === 'string') {
      fontFamilies = [fontFamilies];
    }
    _results = [];
    for (size = _i = largestSize; largestSize <= smallestSize ? _i <= smallestSize : _i >= smallestSize; size = largestSize <= smallestSize ? ++_i : --_i) {
      _results.push((function() {
        var _j, _len, _results1;
        _results1 = [];
        for (_j = 0, _len = fontFamilies.length; _j < _len; _j++) {
          fontFamily = fontFamilies[_j];
          _results1.push(test(fontFamily, "" + size + "px", 'normal', drawSmartUnderlines = true));
        }
        return _results1;
      })());
    }
    return _results;
  };

}).call(this);
