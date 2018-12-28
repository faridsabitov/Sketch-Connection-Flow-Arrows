import sketch from 'sketch'
const { toArray } = require('util')

//
//  Variables
//

var UI = require('sketch/ui')
var Group = require('sketch/dom').Group
var pluginKey = "flowArrows"
var connections = []
const document = sketch.fromNative(context.document)
const page = document.selectedPage
var docData = context.document.documentData()
var connectionsDatabase = context.command.valueForKey_onLayer_forPluginIdentifier("connections", docData, pluginKey)
var currentParentGroup = docData.currentPage().currentArtboard() || docData.currentPage()
var selection = context.selection
var currentGroup

// Saying that there is no line
var lineAvailable = false
var lineObject


//
//  Default Function
//

export default function() {

  // Checking all the groups that we have
  for(var i = 0; i < currentParentGroup.layers().count(); i++){
    if(currentParentGroup.layers()[i].name() == "Arrows") {
      // If we already have "Arrow" group we need to save it's folder
      currentGroup = currentParentGroup.layers()[i]
    } 
  }

  if(selection.count() == 2){
    // When user selected two layers

    for(var i = 0; i < selection.count(); i++){
      
      // Checking through all selected layers
      if(selection[i].class() == "MSSymbolInstance" || selection[i].class() == "MSRectangleShape" || selection[i].class() == "MSLayerGroup"){
        // If it's symbol, shape or a group
        
        // First Layer Position Start Point Position
        var firstLayerPos = selection[0].frame()
        var firstLayerPosX = firstLayerPos.maxX()
        var firstLayerPosY = firstLayerPos.midY()
        
        // Saving object ID for not recreating new arrows
        var firstObject = selection[0].objectID()
        
        // Second Layer Position End Point Position
        var secondLayerPos = selection[1].frame()
        var secondLayerPosX = secondLayerPos.minX()
        var secondLayerPosY = secondLayerPos.midY()
        // Saving object ID for not recreating new arrows
        var secondObject = selection[1].objectID()

        
      
      } else {
        
        // If it's not an appropriate layer
        sketch.UI.message("Only groups, shapes and symbols are supported")
      }
    }
  } else {
    // When user didn't select anything
    sketch.UI.message("Please select only two layers")
  }

  // if there is a line in Plugin Database, we are showing it
  lineObject = checkConnections(firstObject,secondObject)
  
  if(lineAvailable) {
    // if line is available

    // need to specify new size and location for the arrow shape
    lineObject.frame().x = firstLayerPos.maxX()
    lineObject.frame().width = secondLayerPos.minX() - firstLayerPos.maxX()
    lineObject.style().endMarkerType = 2
    
    if(firstLayerPos.midY() < secondLayerPos.midY()){
      // second object is higher
      lineObject.setIsFlippedVertical(false)
      lineObject.frame().y = firstLayerPos.midY()
      lineObject.frame().height = secondLayerPos.midY() - firstLayerPos.midY()
      
    } else {
      // second object is lower
      lineObject.setIsFlippedVertical(true)
      lineObject.frame().y = secondLayerPos.midY()
      lineObject.frame().height = firstLayerPos.midY() - secondLayerPos.midY()
    }
  } else {
    // if we don't have a line, need to create a new one

    // Middle Points
    var middlePosX = (firstLayerPosX + secondLayerPosX)/2
    var middlePosY = (firstLayerPosY + secondLayerPosY)/2

    // Drawing a line
    var path = NSBezierPath.bezierPath()
  
    // Adding points
    path.moveToPoint(NSMakePoint(firstLayerPosX,firstLayerPosY))
    path.lineToPoint(NSMakePoint(middlePosX,firstLayerPosY))
    path.lineToPoint(NSMakePoint(middlePosX,secondLayerPosY))
    path.lineToPoint(NSMakePoint(secondLayerPosX,secondLayerPosY))

    // Painting the line
    var line = MSShapeGroup.layerWithPath(MSPath.pathWithBezierPath(path))
    
    // Making middle points rounded
    var points = line.layers().firstObject().points()
    points[1].cornerRadius = 20
    points[2].cornerRadius = 20

    // Providing Settings for the arrow
    line.setName("Arrow")

    // Styling Border Style
    var border = line.style().addStylePartOfType(1)
    border.color = MSColor.colorWithRGBADictionary({r: 0.89, g: 0.89, b: 0.89, a: 1})
    border.thickness = 2
    line.style().endMarkerType = 2

    if(connectionsDatabase){
      connections = context.command.valueForKey_onLayer_forPluginIdentifier("connections", docData, pluginKey)
    }

    // Adding current connection to the all connections
    // Storage for current connection
    var connection = {
      firstObject : firstObject,
      secondObject : secondObject,
      line : line.objectID()
    }

    let connectionsArray = []
    for (let i = 0; i < connections.length; i ++) {
      connectionsArray.push(connections[i])
    }

    connectionsArray.push(connection)

    // Saving Connection Info to Sketch Plugin
    context.command.setValue_forKey_onLayer_forPluginIdentifier(connectionsArray, "connections", docData, pluginKey)
    // log(context.command.valueForKey_onLayer_forPluginIdentifier("connections", docData, pluginKey))

    

    if(currentGroup){
      // If we already have group
      currentGroup.addLayers([line])

    } else {
      // If we don't have a group
      // Creating a group
      var group = new Group({
        parent: currentParentGroup,
        name: 'Arrows',
        locked: true,
        layers: [line]
      })

      // Moving this group to the bottom of the page
      group.moveToBack()
    }
  }
}

//
// Functions
//

export function updateArrows(context) {
  const document = sketch.fromNative(context.document)
  // TODO: Need to show amount of updated arrows and deleted ones
  // TODO: Need to make a function that will delete arrows and connection itself, if there is no object
  sketch.UI.message("All arrows are updated 🚀")
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


var sharedLayerStylesForContext = function(context) {

	var dict = {};

	if(sketchVersion < sketchVersion51) return dict;

	var doc = context.document || context.actionContext.document,
		localStyles = doc.documentData().layerStyles().sharedStyles(),
		foreignStyles = doc.documentData().valueForKeyPath("foreignLayerStyles.@unionOfObjects.localSharedStyle"),
		availableStyles = localStyles.arrayByAddingObjectsFromArray(foreignStyles),
		predicate = NSPredicate.predicateWithFormat("style.firstEnabledFill == nil"),
		borderStyles = availableStyles.filteredArrayUsingPredicate(predicate),
		loop = borderStyles.objectEnumerator(),
		sharedStyle;
	
	while(sharedStyle = loop.nextObject()) {
		dict[sharedStyle.objectID()] = sharedStyle;
	}

	return dict;
}

function multiplyLayerByXY(layer,xScale,yScale) {
  const scaledRect = {
    origin: {
      x: layer.rect().origin.x,
      y: layer.rect().origin.y
    },
    size: {
      width: layer.rect().size.width * xScale,
      height: layer.rect().size.height * yScale
    }
  }
  layer.rect = scaledRect;
}

function checkConnections(firstObject,secondObject) {
  var lineObject
  // Need to check if we have this information already
  if(connectionsDatabase) {
    // if we have connectionDatabase for this document
    // Need to check if we have this connection already
    for(var y = 0; y < connectionsDatabase.count(); y++){
      
      if(firstObject == connectionsDatabase[y].firstObject || firstObject == connectionsDatabase[y].secondObject){
        // if we found that we have this object in connection database already
        
        if(secondObject == connectionsDatabase[y].firstObject || secondObject == connectionsDatabase[y].secondObject){
          // if we found that we have this object in connection database already

          // Do we have a line inside "Arrows" group?
          // TODO: Need to add check system if we don't have group
          for(var z = 0; z < currentGroup.layers().count(); z++){
            if(currentGroup.layers()[z].objectID() == connectionsDatabase[y].line) {                      
              // we have this line
              lineAvailable = true
              lineObject = currentGroup.layers()[z]
            } 
          }
        }
      }
    }
    return lineObject
  }
}