import sketch from 'sketch'
// documentation: https://developer.sketchapp.com/reference/api/

export default function() {
  var document = require('sketch/dom').getSelectedDocument()
  var selection = document.selectedLayers
  log(selection)
  sketch.UI.message("It's alive run watche 🙌")
}
