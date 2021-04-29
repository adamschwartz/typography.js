clearCanvas = (canvas, context) ->
  context.clearRect 0, 0, canvas.width, canvas.height

calculateBoundary = (text, canvas, context) ->
  clearCanvas canvas, context

  context.fillStyle = 'red'
  metrics = context.measureText text
  textWidth = metrics.width
  context.fillText text, 0, metrics.fontBoundingBoxAscent || 0

  lowestY = undefined
  highestY = undefined

  for x in [0..textWidth]
    for y in [0..canvas.height]
      pixelData = context.getImageData x, y, x + 1, y + 1

      r = pixelData.data[0]
      alpha = pixelData.data[3]

      if r is 255 and alpha > 50 # TODO - tune this alpha?
        lowestY = y if not lowestY
        highestY = y if not highestY

        lowestY = y if y < lowestY
        highestY = y if y > highestY

  clearCanvas canvas, context

  { lowestY, highestY }

window.Typography =
  evaluate: (fontFamily, fontSize, fontWeight) ->
    canvas = document.createElement 'canvas'
    context = canvas.getContext '2d'

    canvas.height = canvas.width = parseInt(fontSize, 10) * 1.4 # TODO - be smarter?

    Typography.normalizeContext context

    # TODO support other font styles
    # We’d love to use `computedStyle.font` here,
    # but Firefox has issues... (TODO: file bug report)
    context.font = "#{ fontWeight } #{ fontSize }/normal '#{ fontFamily }'"

    { lowestY, highestY } = calculateBoundary 'I', canvas, context
    baselineY = highestY
    capHeight = baselineY - lowestY

    { lowestY } = calculateBoundary 'x', canvas, context
    xHeight = baselineY - lowestY

    { highestY } = calculateBoundary 'g', canvas, context
    descenderHeight = highestY - baselineY

    { lowestY, highestY } = calculateBoundary 'h', canvas, context
    ascenderHeight = baselineY - lowestY
    ascenderHeight = Math.max(ascenderHeight, capHeight) # Handle very small font sizes

    { baselineY, xHeight, capHeight, ascenderHeight, descenderHeight, _: { canvas, context }}

  normalizeContext: (context) ->
    context.textBaseline = 'top'
    context.textAlign = 'start'
    context.fontStretch = 1
    context.angle = 0
