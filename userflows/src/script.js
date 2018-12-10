import sketch from 'sketch'
// documentation: https://developer.sketchapp.com/reference/api/

export default function() {
  var document = require('sketch/dom').getSelectedDocument()
  var selection = document.selectedLayers
  // log(selection)
  var symbols = document.getSymbols()
  log(symbols)
  sketch.UI.message("It's alive run watcshe 🙌")

  const page = document.selectedPage

  // Now let's create a new text layer, and a traditional value...
  // const layer = new sketch.Text({
  //   parent: page,
  //   alignment: sketch.Text.Alignment.center,
  //   text: 'Hello World',
  // })

  document.centerOnLayer(selection)
}

