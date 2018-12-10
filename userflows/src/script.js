import sketch from 'sketch'
// documentation: https://developer.sketchapp.com/reference/api/

export default function() {
  var document = require('sketch/dom').getSelectedDocument()
  var selection = document.selectedLayers
  // log(selection)
  var symbols = document.getSymbols()
  log(symbols)
  sketch.UI.message("It's alive run watcshe 🙌")
}

// export default function(defineLink) {
//   sketch.UI.message("It's alive run watcshe 🙌")

// }
