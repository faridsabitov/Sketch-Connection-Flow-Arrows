import sketch from 'sketch'
const { toArray } = require('util')

var UI = require('sketch/ui')

export default function() {
  // Predefing
  const document = sketch.fromNative(context.document)
  const page = document.selectedPage
  // var selection = document.selectedLayers
  var selection = context.selection

  // log(selection[0].lastPoint().isRounded())

  if(selection.count() == 2){
    
    // When user selected two layers
    for(var i = 0; i < selection.count(); i++){
      
      // Checking through all selected layers
      if(selection[i].class() == "MSSymbolInstance" || selection[i].class() == "MSRectangleShape" || selection[i].class() == "MSLayerGroup"){
        
        // If it's symbol, shape or a group
        var layer = selection[i]

        if(i == 0){
          // First Layer Position Start Point Position
          var firstLayerPos = layer.frame()
          var firstLayerPosX = firstLayerPos.maxX()
          var firstLayerPosY = firstLayerPos.midY()

        } else if (i == 1) {
          // Second Layer Position End Point Position
          var secondLayerPos = layer.frame()
          var secondLayerPosX = secondLayerPos.minX()
          var secondLayerPosY = secondLayerPos.midY()

          // Middle Points
          var middlePosX = (firstLayerPosX + secondLayerPosX)/2
          var middlePosY = (firstLayerPosY + secondLayerPosY)/2

          // Drawing a line
          var path = NSBezierPath.bezierPath();
        
          // Adding points
          path.moveToPoint(NSMakePoint(firstLayerPosX,firstLayerPosY));
          path.lineToPoint(NSMakePoint(middlePosX,firstLayerPosY));
          path.lineToPoint(NSMakePoint(middlePosX,secondLayerPosY));
          path.lineToPoint(NSMakePoint(secondLayerPosX,secondLayerPosY));

          // Paiting the line
          var shape = MSShapeGroup.layerWithPath(MSPath.pathWithBezierPath(path));
          
          // Providing Settings for the arrow
          shape.setName("Arrow")

          // Styling Border Style
          var border = shape.style().addStylePartOfType(1);
          border.color = MSColor.colorWithRGBADictionary({r: 0.89, g: 0.89, b: 0.89, a: 1});
          border.thickness = 2;
          
          var documentData = context.document.documentData();
          var currentParentGroup = documentData.currentPage().currentArtboard() || documentData.currentPage() //Currently this is artboard
          // TODO: Need to add to the bottom group
          currentParentGroup.addLayers([shape])
          log(currentParentGroup)
          currentParentGroup.setName("Arrows")
          currentParentGroup.setIsLocked(true)
          // var group = new Group({
          //   name: 'Arrows',
          //   layers: [
          //     {
          //       type: sketch.Types.Text,
          //       text: 'Hello world',
          //     },
          //   ],
          // })
        }

      } else {
        
        // If it's not an appropriate layer
        sketch.UI.message("Only groups, shapes and symbols are supported")
      }
    }
 } else {
    // When user didn't select anything
    sketch.UI.message("Please select only two layers")
  }
}

export function updateArrows(context) {
  // const document = sketch.fromNative(context.document)
  // // var layerIsLocked = layer.isLocked();
  // sketch.UI.message("All unlocked arrows are updated 🚀")




}

// Functions

// var getAlertWindow = function() {
// 	var alert = COSAlertWindow.new();
// 	// if (iconImage) {
// 	// 	alert.setIcon(iconImage);
// 	// } 
// 	return alert;
// }



        // // Shop Popup for asking arrow type
        // var options = ['Link Arrow', 'Back Arrow']
        // var selection = UI.getSelectionFromUser(
        //   "Please choose link type", options
        // )

        // var ok = selection[2]
        // var value = options[selection[1]]
        
        // if (ok) {
        //   // If user specified decision
        //   log(value)
        // }
