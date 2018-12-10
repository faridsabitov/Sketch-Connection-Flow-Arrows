import sketch from 'sketch'
const { toArray } = require('util')


export default function() {
  // Predefing
  const document = sketch.fromNative(context.document)
  const page = document.selectedPage
  // var selection = document.selectedLayers
  var selection = context.selection

  if(selection.count() == 2){
    // When user selected two layers
    
    if(selection[1].class() == "MSSymbolInstance"){
      sketch.UI.message("Do something")
    } else {
      sketch.UI.message("Not symbols")
    }
  
 } else {
    // When user didn't select anything
    sketch.UI.message("Please select only two layers")
  }

  // const imageURL = context.plugin.urlForResourceNamed('icon.png')


  // const group = new sketch.Group({
  //   parent: page,
  //   name: 'arrows',
  //   frame: {
  //     x: 0,
  //     y: 0,
  //     width: 200,
  //     height: 200,
  //   },
  //   layers: [
  //     // you can also define nested layers directly
  //     {
  //       type: sketch.Types.Image,
  //       frame: {
  //         x: 50,
  //         y: 50,
  //         width: 100,
  //         height: 100,
  //       },
  //       image: imageURL,
  //     },
  //   ],
  // })
}

export function updateArrows(context) {
  const document = sketch.fromNative(context.document)
  sketch.UI.message("All unlocked arrows are updated 🚀")
}

