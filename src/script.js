import sketch from 'sketch'
const { toArray } = require('util')

//
//  Variables
//

let UI = require('sketch/ui')
let Group = require('sketch/dom').Group
const pluginKey = "flowArrows"
let connections = []
const document = sketch.fromNative(context.document)
const page = document.selectedPage
let docData = context.document.documentData()
let connectionsDatabase = context.command.valueForKey_onLayer_forPluginIdentifier("connections", docData, pluginKey)
let currentParentGroup = docData.currentPage().currentArtboard() || docData.currentPage()
let selection = context.selection
let currentGroup

// Saying that there is no line
let lineAvailable = false
let lineObject

let sourceObject //firstObject
let objectsToConnect = []


//
//  Default Function
//

export default function() {

  // Check if we have "Arrows" group
  checkForArrowGroup()

  if(selection.count() > 1){
    // When user selected more than one layer
    // We need to define the connections and connection position
    // defineArrowPoints()
  
    // if there is a line in Plugin Database, we are showing it
    // lineObject = checkConnections(firstObject,secondObject)

    if(connectionsDatabase) {
      // if we have connectionDatabase for this document
      // Need to check if we have this connection already
      for(var y = 0; y < connectionsDatabase.count(); y++){
        
        if(firstObject == connectionsDatabase[y].firstObject || firstObject == connectionsDatabase[y].secondObject){
          // if we found that we have this object in connection database already

    
          
          if(secondObject == connectionsDatabase[y].firstObject || secondObject == connectionsDatabase[y].secondObject){
            // if we found that we have this object in connection database already
  
            // Here we found connection and here we need to update position


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
        } else {
          // no such object
        }
      }
    } else {
      // Fresh Start



    }
    
    
    if(lineAvailable) {
      // if line is available we need to update it's position
      updateArrow(firstObject, secondObject, direction, line) 

    } else {
      // if we don't have a line, need to create a new one

      // Middle Points
      let middlePosX = (firstLayerPosX + secondLayerPosX)/2
      let middlePosY = (firstLayerPosY + secondLayerPosY)/2

      // Drawing a line
      let path = NSBezierPath.bezierPath()
    
      // Adding points
      path.moveToPoint(NSMakePoint(firstLayerPosX,firstLayerPosY))
      path.lineToPoint(NSMakePoint(middlePosX,firstLayerPosY))
      path.lineToPoint(NSMakePoint(middlePosX,secondLayerPosY))
      path.lineToPoint(NSMakePoint(secondLayerPosX,secondLayerPosY))

      // Painting the line
      let line = MSShapeGroup.layerWithPath(MSPath.pathWithBezierPath(path))
      
      // Making middle points rounded
      let points = line.layers().firstObject().points()
      points[1].cornerRadius = 20
      points[2].cornerRadius = 20

      // Providing Settings for the arrow
      line.setName("Arrow")

      // Styling Border Style
      let border = line.style().addStylePartOfType(1)
      border.color = MSColor.colorWithRGBADictionary({r: 0.89, g: 0.89, b: 0.89, a: 1})
      border.thickness = 2
      line.style().endMarkerType = 2

      if(connectionsDatabase){
        connections = context.command.valueForKey_onLayer_forPluginIdentifier("connections", docData, pluginKey)
      }

      // Adding current connection to the all connections
      // Storage for current connection
      let connection = {
        firstObject : firstObject,
        secondObject : secondObject,
        direction: "right",
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
  } else {
    // When user didn't select anything
    sketch.UI.message("Please select more than two layers")
  }
}

//
// Plugin Commands
//

export function updateArrows(context) {
  // TODO: Need to show amount of updated arrows and deleted ones
  // TODO: Need to make a function that will delete arrows and connection itself, if there is no object

  // TODO: Need to go through all the connections and check if we have all the object

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


//
// Functions
//

function checkConnections(firstObject,secondObject) {
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
  }
}

function defineArrowPoints() {

  // TODO: Need to define direction
  

  sourceObject = {
    ID : selection[0].objectID(), //firstObject
    frame: selection[0].frame()
  }

  log(sourceObject)
  objectsToConnect = []

  connection = {
    firstObject : firstObject,
    secondObject : secondObject,
    line : line.objectID()
  }

  // First Layer Position Start Point Position
  let firstLayerPos = selection[0].frame()
  let firstLayerPosX = firstLayerPos.maxX()
  let firstLayerPosY = firstLayerPos.midY()
  
  // Saving object ID for not recreating new arrows
  // var firstObject = selection[0].objectID()
  
  // Second Layer Position End Point Position
  let secondLayerPos = selection[1].frame()
  let secondLayerPosX = secondLayerPos.minX()
  let secondLayerPosY = secondLayerPos.midY()
  // Saving object ID for not recreating new arrows
  var secondObject = selection[1].objectID()

  
}
    

function checkForArrowGroup() {
  // Checking all the groups that we have
  for(let i = 0; i < currentParentGroup.layers().count(); i++){
    if(currentParentGroup.layers()[i].name() == "Arrows") {
      // If we already have "Arrow" group we need to save it's folder
      currentGroup = currentParentGroup.layers()[i]
    } 
  }
}

function updateArrow(firstObject, secondObject, direction, line) {
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
}