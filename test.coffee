window.test = (fontFamily, fontSize, fontWeight, drawSmartUnderlines) ->
  { baselineY, xHeight, capHeight, ascenderHeight, descenderHeight, _ } = Typography.evaluate fontFamily, fontSize, fontWeight

  testId = "#{ fontFamily } #{ fontSize } #{ fontWeight }"
  testString = "#{ fontFamily.replace(/\"/g, "") } Ixgh"

  fontSizeInt = parseInt(fontSize, 10)
  lineHeightInt = fontSizeInt * 1.4 # TODO - wtf?

  testDiv = document.createElement 'div'
  testDiv.className = 'test'
  testDiv.setAttribute 'data-test-id', testId

  domTextDiv = document.createElement 'div'
  domTextDiv.className = 'dom-text'
  domTextDiv.textContent = testString
  domTextDiv.style.fontSize = fontSize
  domTextDiv.style.fontWeight = fontWeight
  domTextDiv.style.fontFamily = fontFamily

  canvasWrapDiv = document.createElement 'div'
  canvasWrapDiv.className = 'canvas-wrap'
  canvasWrapDiv.appendChild _.canvas
  canvasWrapDiv.appendChild domTextDiv

  canvasWrapOuterDiv = document.createElement 'div'
  canvasWrapOuterDiv.className = 'canvas-wrap-outer'
  canvasWrapOuterDiv.style.minHeight = "#{ lineHeightInt }px"
  canvasWrapOuterDiv.appendChild canvasWrapDiv

  testTitle = document.createElement 'h2'
  testTitle.textContent = "#{ fontSize } #{ fontWeight }"

  resultsParagraph = document.createElement 'p'
  resultsParagraph.textContent = """
    baselineY      #{ baselineY }
    xHeight        #{ xHeight }
    capHeight      #{ capHeight }
    ascenderHght   #{ ascenderHeight }
    descenderHght  #{ descenderHeight }
  """

  metrics = _.context.measureText testString
  textWidth = metrics.width
  _.canvas.width = textWidth

  Typography.normalizeContext _.context
  _.context.font = "#{ fontWeight } #{ fontSize }/normal #{ fontFamily }"

  _.context.fillStyle = '#a0a0a0'
  _.context.fillRect 0, 0, _.canvas.width, 1

  _.context.fillStyle = 'red'
  _.context.fillRect 0, baselineY, _.canvas.width, 1

  _.context.fillStyle = 'orange'
  _.context.fillRect 0, baselineY - xHeight, _.canvas.width, 1

  _.context.fillStyle = 'yellow'
  _.context.fillRect 0, baselineY - capHeight, _.canvas.width, 1

  _.context.fillStyle = 'green'
  _.context.fillRect 0, baselineY - ascenderHeight, _.canvas.width, 1

  _.context.fillStyle = 'blue'
  _.context.fillRect 0, baselineY + descenderHeight, _.canvas.width, 1

  _.context.fillStyle = 'red'
  _.context.fillText testString, 0, metrics.fontBoundingBoxAscent || 0

  testDiv.appendChild canvasWrapOuterDiv
  testDiv.appendChild testTitle
  testDiv.appendChild resultsParagraph

  if ascenderHeight < capHeight or capHeight < xHeight
    testDiv.classList.add 'fail'

  if baselineY <= 0 or xHeight <= 0 or capHeight <= 0 or ascenderHeight <= 0 or descenderHeight <= 0
    testDiv.classList.add 'fail'

  if baselineY > lineHeightInt or xHeight > lineHeightInt or capHeight > lineHeightInt or ascenderHeight > lineHeightInt or descenderHeight > lineHeightInt
    testDiv.classList.add 'fail'

  results.appendChild testDiv

  # if drawSmartUnderlines
  #   testDiv.classList.add 'with-smart-underline'

  #   textHeight = domTextDiv.clientHeight - 1
  #   descenderY = baselineY + descenderHeight

  #   smartUnderlinePosition = Math.max(((descenderY - baselineY) / 2) + 1, 3) + baselineY

  #   if descenderHeight is 3
  #     smartUnderlinePosition = baselineY + descenderHeight

  #   smartUnderlinePositionPercent = Math.round(100 * smartUnderlinePosition / textHeight)

  #   if descenderHeight > 2 and fontSizeInt > 10 and smartUnderlinePositionPercent <= 100
  #     domTextDiv.style.textShadow = '0.03em 0 #fff, -0.03em 0 #fff, 0 0.03em #fff, 0 -0.03em #fff, 0.06em 0 #fff, -0.06em 0 #fff, 0.09em 0 #fff, -0.09em 0 #fff, 0.12em 0 #fff, -0.12em 0 #fff, 0.15em 0 #fff, -0.15em 0 #fff'
  #     domTextDiv.style.backgroundImage = '-webkit-linear-gradient(#fff, #fff), -webkit-linear-gradient(#fff, #fff), -webkit-linear-gradient(#000, #000)'
  #     domTextDiv.style.backgroundSize = '0.05em 1px, 0.05em 1px, 1px 1px'
  #     domTextDiv.style.backgroundRepeat = 'no-repeat, no-repeat, repeat-x'
  #     domTextDiv.style.backgroundPosition = "0% #{ smartUnderlinePositionPercent }%, 100% #{ smartUnderlinePositionPercent }%, 0% #{ smartUnderlinePositionPercent }%"

  #     smartUnderlineResult = document.createElement 'p'
  #     smartUnderlineResult.innerHTML = "underlinePosY  #{ smartUnderlinePositionPercent }%"
  #     testDiv.appendChild smartUnderlineResult

  #   else
  #     domTextDiv.style.textDecoration = 'underline'

  if drawSmartUnderlines
    testDiv.classList.add 'with-smart-underline'

    textHeight = domTextDiv.getClientRects()[0].height - 1
    descenderY = baselineY + descenderHeight

    smartUnderlinePosition = Math.max(((descenderY - baselineY) / 2) + 1, 3) + baselineY

    if descenderHeight is 3
      smartUnderlinePosition = baselineY + descenderHeight

    smartUnderlinePositionPercent = Math.round(100 * smartUnderlinePosition / textHeight)

    if descenderHeight > 2 and fontSizeInt > 10 and smartUnderlinePositionPercent <= 100
      domTextDiv.style.textShadow = '0.03em 0 #fff, -0.03em 0 #fff, 0 0.03em #fff, 0 -0.03em #fff, 0.06em 0 #fff, -0.06em 0 #fff, 0.09em 0 #fff, -0.09em 0 #fff, 0.12em 0 #fff, -0.12em 0 #fff, 0.15em 0 #fff, -0.15em 0 #fff'
      domTextDiv.style.backgroundImage = '-webkit-linear-gradient(#fff, #fff), -webkit-linear-gradient(#fff, #fff), -webkit-linear-gradient(#000, #000)'
      domTextDiv.style.backgroundImage = 'linear-gradient(#fff, #fff), -webkit-linear-gradient(#fff, #fff), -webkit-linear-gradient(#000, #000)'
      domTextDiv.style.backgroundSize = '0.05em 1px, 0.05em 1px, 1px 1px'
      domTextDiv.style.backgroundRepeat = 'no-repeat, no-repeat, repeat-x'
      domTextDiv.style.backgroundPosition = "0% #{ smartUnderlinePositionPercent }%, 100% #{ smartUnderlinePositionPercent }%, 0% #{ smartUnderlinePositionPercent }%"

      smartUnderlineResult = document.createElement 'p'
      smartUnderlineResult.innerHTML = "underlinePosY  #{ smartUnderlinePositionPercent }%"
      testDiv.appendChild smartUnderlineResult

    else
      domTextDiv.style.textDecoration = 'underline'


window.testSuite = ->
  fontFamilies = [
    'Arial'
    'Futura'
    'Georgia'
    '"Gill Sans"'
    'Helvetica'
    '"Helvetica Neue"'
    'monospace'
    'sans-serif'
    'serif'
    'Times'
    '"Times New Roman"'
  ]

  sizes = [
    '36px'
    '24px'
    '16px'
    '16px'
    '8px'
  ]

  for size in sizes
    for fontFamily in fontFamilies
      test fontFamily, size, 'normal'

      if size is '16px'
        test fontFamily, size, 'bold'

window.testFontsInSizeRange = (fontFamilies, smallestSize = 8, largestSize = 36) ->
  if typeof fontFamilies is 'string'
    fontFamilies = [fontFamilies]

  for size in [largestSize..smallestSize]
    for fontFamily in fontFamilies
      test fontFamily, "#{ size }px", 'normal', drawSmartUnderlines = true
