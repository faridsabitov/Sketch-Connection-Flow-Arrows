import sketch from 'sketch'
const { toArray } = require('util')

var UI = require('sketch/ui')
var Group = require('sketch/dom').Group
// var Shape = require('sketch/dom').Shape

export default function() {
  // Predefing
  const document = sketch.fromNative(context.document)
  const page = document.selectedPage
  const doc = sketch.getSelectedDocument()

  // var selection = document.selectedLayers
  var selection = context.selection

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

          // Painting the line
          var shape = MSShapeGroup.layerWithPath(MSPath.pathWithBezierPath(path)); // TODO: Need to find a way, how to make corners rounded 
          
          // Making middle points rounded
          var points = shape.layers().firstObject().points()
          points[1].cornerRadius = 20;
          points[2].cornerRadius = 20;

          // Providing Settings for the arrow
          shape.setName("Arrow")

          // Styling Border Style
          var border = shape.style().addStylePartOfType(1)
          border.color = MSColor.colorWithRGBADictionary({r: 0.89, g: 0.89, b: 0.89, a: 1})
          border.thickness = 2
          // TODO: Need to have arrow style at the end
          
          // Selecting artboard or global
          var documentData = context.document.documentData();
          var currentParentGroup = documentData.currentPage().currentArtboard() || documentData.currentPage()
          var currentGroup
          
          // Checking all the groups that we have
          for(var i = 0; i < currentParentGroup.layers().count(); i++){
            if(currentParentGroup.layers()[i].name() == "Arrows") {
              // If we already have "Arrow" group we need to save it's folder
              currentGroup = currentParentGroup.layers()[i]
            } 
          }

          if(currentGroup){
            // If we already have group
            currentGroup.addLayers([shape])
            
          } else {
            // If we don't have a group
            // Creating a group
            var group = new Group({
              parent: currentParentGroup,
              name: 'Arrows',
              locked: true,
              layers: [shape]
            })

            // Moving this group to the bottom of the page
            group.moveToBack()
          }
          

  
          
          
          
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
  const document = sketch.fromNative(context.document)
  sketch.UI.message("All unlocked arrows are updated 🚀")
  // TO DO: Make a function for redrawing all the points
}

export function updateLayerNames(context) {
  const document = sketch.fromNative(context.document)
  sketch.UI.message("All Layers are updated 🎉")
}

export function settings(context) {
  // Shop Popup for asking arrow type
  var options = ['Link Arrow', 'Back Arrow']
  var selection = UI.getSelectionFromUser(
    "Please choose link type", options
  )

  var ok = selection[2]
  var value = options[selection[1]]
  
  if (ok) {
    // If user specified decision
    log(value)
  }
}


// var sharedLayerStylesForContext = function(context) {

// 	var dict = {};

// 	if(sketchVersion < sketchVersion51) return dict;

// 	var doc = context.document || context.actionContext.document,
// 		localStyles = doc.documentData().layerStyles().sharedStyles(),
// 		foreignStyles = doc.documentData().valueForKeyPath("foreignLayerStyles.@unionOfObjects.localSharedStyle"),
// 		availableStyles = localStyles.arrayByAddingObjectsFromArray(foreignStyles),
// 		predicate = NSPredicate.predicateWithFormat("style.firstEnabledFill == nil"),
// 		borderStyles = availableStyles.filteredArrayUsingPredicate(predicate),
// 		loop = borderStyles.objectEnumerator(),
// 		sharedStyle;
	
// 	while(sharedStyle = loop.nextObject()) {
// 		dict[sharedStyle.objectID()] = sharedStyle;
// 	}

// 	return dict;
// }

