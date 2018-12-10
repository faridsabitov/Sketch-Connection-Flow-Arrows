import sketch from 'sketch'
const { toArray } = require('util')


export default function() {
  // Predefing
  const document = sketch.fromNative(context.document)
  const page = document.selectedPage
  // var selection = document.selectedLayers
  var selection = context.selection

  var layer = selection[0]
  var layerParent = layer.parentGroup();

  if(selection.count() == 2){
    
    // When user selected two layers
    for(var i = 0; i < selection.count(); i++){
      
      // Checking through all selected layers
      if(selection[i].class() == "MSSymbolInstance" || selection[i].class() == "MSRectangleShape" || selection[i].class() == "MSLayerGroup"){
        
        // If it's symbol, shape or a group
        var layer = selection[i]

        if(i = 0){
          // First Layer Position Start Point Position
          var firstLayerPos = layer.frame()
          var firstLayerPosX = firstLayerPos.maxX()
          var firstLayerPosY = firstLayerPos.midY()
        } else {
          // Second Layer Position End Point Position
          var secondLayerPos = layer.frame()
          var secondLayerPosX = secondLayerPos.maxX()
          var secondLayerPosY = secondLayerPos.midY()
        }


        // Need to get the location of the layer itself
        // For the first one we need to find the width
        // And then found position of the right side with y + height/2
        // For the second one we need to find the width 
        // And found position on the left side
        

      } else {
        
        // If it's not an appropriate layer
        sketch.UI.message("Only groups, shapes and symbols are supported")
      }
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
  // var layerIsLocked = layer.isLocked();
  sketch.UI.message("All unlocked arrows are updated 🚀")
}

