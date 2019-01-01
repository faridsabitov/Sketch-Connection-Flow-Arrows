import sketch from 'sketch'
const { toArray } = require('util')

//
//  Variables
//

let UI = require('sketch/ui')
let Group = require('sketch/dom').Group
const pluginKey = "flowArrows"
let arrowConnections = []
let connectionsArray = []
const document = sketch.fromNative(context.document)
const page = document.selectedPage
let docData = context.document.documentData()
let pluginData = context.command.valueForKey_onLayer_forPluginIdentifier("arrowConnections", docData, pluginKey)
let currentParentGroup = docData.currentPage().currentArtboard() || docData.currentPage()
let selection = context.selection
let currentGroup

// Saying that there is no line
let lineAvailable = false
let lineObject

let sourceObject // currently Sketch can't provide really firsrt selection



//
//  Default Function
//

//
// defineLink
// .
// .  Check if we have more than one selection
// .  .
// .  .  If we have database
// .  .  .
// .  .  .  For every selection need to have separate flow
// .  .  .  .
// .  .  .  .  If we don’t have this two objects in one connection
// .  .  .  .  .
// .  .  .  .  .  Create new arrow(firstObject, secondObject)
// .  .  .  .  .
// .  .  .  .  else If we have this two objects in one connection
// .  .  .  .  .
// .  .  .  .  .  If we have this lineObject
// .  .  .  .  .  .
// .  .  .  .  .  .  UpdateArrow(firstObject, secondObject, line)
// .  .  .  .  .  .
// .  .  .  .  .  if we don’t have this lineObject
// .  .  .  .  .  .
// .  .  .  .  .  .  Need to delete this line from database(line)
// .  .  .  .  .  .  Create new arrow(firstObject, secondObject)
// .  .  .  .  .  .
// .  .  else if we don’t have database
// .  .  .
// .  .  .  For every selection need to have separate flow
// .  .  .  . 
// .  .  .  . Create new arrow(firstObject, secondObject)
// .  .  .  . 


export default function(context) {


  // Check if we have "Arrows" group
  checkForArrowGroup()

  //Check if we have more than one selection
  if(selection.count() > 1){
    // When user selected more than one layer
    // We need to define the connections and connection position
    // defineArrowPoints()

    // Need to define source object first
    sourceObject = selection.firstObject()
  
    // if there is a line in Plugin Database, we are showing it
    // lineObject = checkConnections(firstObject,secondObject)


    if(pluginData) {
      // if we have connectionDatabase for this document
      // Need to check if we have this connection already
      
      for(var g = 0; g < selection.count(); g++) {
        if(selection[g].objectID() != sourceObject.objectID()){
          createArrow(sourceObject, selection[g])
        }
      }

      // for(var y = 0; y < pluginData.count(); y++){
        
      //   if(selection[g].objectID() != sourceObject.objectID()){
      //     createArrow(sourceObject, selection[g])
      //   }
        
      //   if(firstObject == pluginData[y].firstObject || firstObject == pluginData[y].secondObject){
      //     // if we found that we have this object in connection database already

    
          
      //     if(secondObject == pluginData[y].firstObject || secondObject == pluginData[y].secondObject){
      //       // if we found that we have this object in connection database already
  
      //       // Here we found connection and here we need to update position


      //       // Do we have a line inside "Arrows" group?
      //       // TODO: Need to add check system if we don't have group
      //       for(var z = 0; z < currentGroup.layers().count(); z++){
      //         if(currentGroup.layers()[z].objectID() == pluginData[y].line) {                      
      //           // we have this line
      //           lineAvailable = true
      //           lineObject = currentGroup.layers()[z]
      //         } 
      //       }
      //     }
      //   } else {
      //     // no such object
      //   }
      // }
    } else {
      // Fresh Start
      // log(selection.count()-1)
      for(var g = 0; g < selection.count(); g++) {
        if(selection[g].objectID() != sourceObject.objectID()){
          createArrow(sourceObject, selection[g])
        }
      }
      
      // 



    }
    
    
    // if(lineAvailable) {
    //   // if line is available we need to update it's position
    //   updateArrow(firstObject, secondObject, direction, line) 

    // } else {
    //   // if we don't have a line, need to create a new one

    //   // Middle Points
    //   let middlePosX = (firstLayerPosX + secondLayerPosX)/2
    //   let middlePosY = (firstLayerPosY + secondLayerPosY)/2

    //   // Drawing a line
    //   let path = NSBezierPath.bezierPath()
    
    //   // Adding points
    //   path.moveToPoint(NSMakePoint(firstLayerPosX,firstLayerPosY))
    //   path.lineToPoint(NSMakePoint(middlePosX,firstLayerPosY))
    //   path.lineToPoint(NSMakePoint(middlePosX,secondLayerPosY))
    //   path.lineToPoint(NSMakePoint(secondLayerPosX,secondLayerPosY))

    //   // Painting the line
    //   let line = MSShapeGroup.layerWithPath(MSPath.pathWithBezierPath(path))
      
    //   // Making middle points rounded
    //   let points = line.layers().firstObject().points()
    //   points[1].cornerRadius = 20
    //   points[2].cornerRadius = 20

    //   // Providing Settings for the arrow
    //   line.setName("Arrow")

    //   // Styling Border Style
    //   let border = line.style().addStylePartOfType(1)
    //   border.color = MSColor.colorWithRGBADictionary({r: 0.89, g: 0.89, b: 0.89, a: 1})
    //   border.thickness = 2
    //   line.style().endMarkerType = 2

    //   if(pluginData){
    //     connections = context.command.valueForKey_onLayer_forPluginIdentifier("connections", docData, pluginKey)
    //   }

    //   // Adding current connection to the all connections
    //   // Storage for current connection
    //   let connection = {
    //     firstObject : firstObject,
    //     secondObject : secondObject,
    //     direction: "right",
    //     line : line.objectID()
    //   }

    //   let connectionsArray = []
    //   for (let i = 0; i < connections.length; i ++) {
    //     connectionsArray.push(connections[i])
    //   }

    //   connectionsArray.push(connection)

    //   // Saving Connection Info to Sketch Plugin
    //   context.command.setValue_forKey_onLayer_forPluginIdentifier(connectionsArray, "connections", docData, pluginKey)
    //   // log(context.command.valueForKey_onLayer_forPluginIdentifier("connections", docData, pluginKey))

      

    //   if(currentGroup){
    //     // If we already have group
    //     currentGroup.addLayers([line])

    //   } else {
    //     // If we don't have a group
    //     // Creating a group
    //     var group = new Group({
    //       parent: currentParentGroup,
    //       name: 'Arrows',
    //       locked: true,
    //       layers: [line]
    //     })

    //     // Moving this group to the bottom of the page
    //     group.moveToBack()
    //   }
    // }
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
  getConnectionsFromPluginData()
  for (let i = 0; i < connectionsArray.length; i ++) {
    // Need to go through each connection and update arrow position
    updateArrow(connectionsArray[i].firstObject, connectionsArray[i].secondObject, connectionsArray[i].direction, connectionsArray[i].line)
  }
  
  sketch.UI.message("All arrows are updated 🚀")
}

export function updateLayerNames(context) {
  const document = sketch.fromNative(context.document)
  sketch.UI.message("All Layers are updated 🎉")
}

export function cleanArrows(context) {
  const document = sketch.fromNative(context.document)
  checkForArrowGroup()
  currentGroup.ungroup()
  context.command.setValue_forKey_onLayer_forPluginIdentifier(null, "arrowConnections", docData, pluginKey)
  sketch.UI.message("All Connections are deleted 🎉")
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
  if(pluginData) {
    // if we have connectionDatabase for this document
    // Need to check if we have this connection already
    for(var y = 0; y < pluginData.count(); y++){
      
      if(firstObject == pluginData[y].firstObject || firstObject == pluginData[y].secondObject){
        // if we found that we have this object in connection database already
        
        if(secondObject == pluginData[y].firstObject || secondObject == pluginData[y].secondObject){
          // if we found that we have this object in connection database already

          // Do we have a line inside "Arrows" group?
          // TODO: Need to add check system if we don't have group
          for(var z = 0; z < currentGroup.layers().count(); z++){
            if(currentGroup.layers()[z].objectID() == pluginData[y].line) {                      
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

 

function checkForArrowGroup() {
  // Checking all the groups that we have
  for(let i = 0; i < currentParentGroup.layers().count(); i++){
    if(currentParentGroup.layers()[i].name() == "Arrows") {
      // If we already have "Arrow" group we need to save it's folder
      currentGroup = currentParentGroup.layers()[i]
    } 
  }
  return currentGroup
}

function updateArrow(firstObjectID, secondObjectID, direction, lineID) {
  currentGroup = checkForArrowGroup()
  if(currentGroup){
    let firstObject = document.getLayerWithID(firstObjectID)
    let secondObject = document.getLayerWithID(secondObjectID)
    let line = document.getLayerWithID(lineID)
    if(firstObject && secondObject && line){
      // need to specify new size and location for the arrow shape

      log(direction)
      switch(direction) {
        case "right":
          log("yes")
          line.frame.x = firstObject.frame.x + firstObject.frame.width
          line.frame.width = secondObject.frame.x - (firstObject.frame.x + firstObject.frame.width)
    
          line.frame.y = firstObject.frame.y + (secondObject.frame.height/2)
          line.frame.height = (secondObject.frame.y + (secondObject.frame.height / 2)) - (firstObject.frame.y + (firstObject.frame.height/2))
    
          break;
        case "left":
          log("no")
          line.frame.x = firstObject.frame.x + firstObject.frame.width
          line.frame.width = secondObject.frame.x - (firstObject.frame.x + firstObject.frame.width)
    
          line.frame.y = firstObject.frame.y + (secondObject.frame.height/2)
          line.frame.height = (secondObject.frame.y + (secondObject.frame.height / 2)) - (firstObject.frame.y + (firstObject.frame.height/2))
          break;   
          
        default:
          log("dwedw")
      }
    } else {

    }
    // log(firstObject)

  } else {
    // If we don't have "Arrows" group 
  }
  // TODO: We need to check if we have a group for "Arrows"
  // If yes,
  // // Need to check each object. If we don't have, need to delete this data from plugin data
  // // // Then we need to update line 
  // 


  
  // if(firstLayerPos.midY() < secondLayerPos.midY()){
  //   // second object is higher
  //   lineObject.setIsFlippedVertical(false)
  //   lineObject.frame().y = firstLayerPos.midY()
  //   lineObject.frame().height = secondLayerPos.midY() - firstLayerPos.midY()
    
  // } else {
  //   // second object is lower
  //   lineObject.setIsFlippedVertical(true)
  //   lineObject.frame().y = secondLayerPos.midY()
  //   lineObject.frame().height = firstLayerPos.midY() - secondLayerPos.midY()
  // }
}

function createArrow(firstObject, secondObject) {
  // Process of creating new connection
  
  const firstObjectID = firstObject.objectID()
  const secondObjectID = secondObject.objectID()

  // Need to understand the direction
  // TODO: Because Sketch is not allowing to get order of selected elements, we will select elements based on it's ID (creation order)
  let direction = getDirection(firstObject, secondObject)
  let line = drawLine(firstObject, secondObject, direction)
  addToArrowsGroup(line)
  
  
  


  // Storage for current connection
  let connection = {
    firstObject : firstObjectID,
    secondObject : secondObjectID,
    direction: direction,
    line : line.objectID()
  }

  connectionsArray.push(connection)

  // Saving Connection Info to Sketch Plugin
  context.command.setValue_forKey_onLayer_forPluginIdentifier(connectionsArray, "arrowConnections", docData, pluginKey)
  
}

function getDirection(firstObject, secondObject){
  // Get direction from the source object
  const diffX = firstObject.frame().midX() - secondObject.frame().midX()
  const diffY = firstObject.frame().midY() - secondObject.frame().midY()
  const absDiffX = Math.abs(diffX) 
  const absDiffY = Math.abs(diffY)
  let direction

  if(secondObject.frame().midX() > firstObject.frame().midX()){
    // Right Half
    if(secondObject.frame().midY() > firstObject.frame().midY()){
      // Bottom quarter
      if(diffX > diffY) {
        direction = "bottom"
      } else {
        direction = "right"
      }
    } else {
      // Top quarter
      if(absDiffX > absDiffY) {
        direction = "right"
      } else {
        direction = "top"
      }
    }
  } else {
    // Left Half
    if(secondObject.frame().midY() > firstObject.frame().midY()){
      // Bottom quarter
      if(absDiffX > absDiffY) {
        direction = "left"
      } else {
        direction = "bottom"
      }
    } else {
      // Top quarter
      if(diffX > diffY) {
        direction = "left"
      } else {
        direction = "top"
      }
    }
  }
  return direction
}

function drawLine(firstObject, secondObject, direction){
  let firstLayerPosX, firstLayerPosY, secondLayerPosX, secondLayerPosY, middlePosX, middlePosY
  
  // Drawing a line
  let path = NSBezierPath.bezierPath()
  
  // Based on direction, we need to specify connection points
  switch(direction) {
    case "top":
      // First Layer Position Start Point Position
      firstLayerPosX = firstObject.frame().midX()
      firstLayerPosY = firstObject.frame().minY()

      // Second Layer Position End Point Position
      secondLayerPosX = secondObject.frame().midX()
      secondLayerPosY = secondObject.frame().maxY()

      // Middle Points
      middlePosX = (firstLayerPosX + secondLayerPosX)/2
      middlePosY = (firstLayerPosY + secondLayerPosY)/2

      // Connecting points
      path.moveToPoint(NSMakePoint(firstLayerPosX,firstLayerPosY))
      path.lineToPoint(NSMakePoint(firstLayerPosX,middlePosY))
      path.lineToPoint(NSMakePoint(secondLayerPosX,middlePosY))
      path.lineToPoint(NSMakePoint(secondLayerPosX,secondLayerPosY))

      break;
    case "right":
      // First Layer Position Start Point Position
      firstLayerPosX = firstObject.frame().maxX()
      firstLayerPosY = firstObject.frame().midY()

      // Second Layer Position End Point Position
      secondLayerPosX = secondObject.frame().minX()
      secondLayerPosY = secondObject.frame().midY()

      // Middle Points
      middlePosX = (firstLayerPosX + secondLayerPosX)/2
      middlePosY = (firstLayerPosY + secondLayerPosY)/2

      // Connecting points
      path.moveToPoint(NSMakePoint(firstLayerPosX,firstLayerPosY))
      path.lineToPoint(NSMakePoint(middlePosX,firstLayerPosY))
      path.lineToPoint(NSMakePoint(middlePosX,secondLayerPosY))
      path.lineToPoint(NSMakePoint(secondLayerPosX,secondLayerPosY))

      break;
    case "bottom":
      // First Layer Position Start Point Position
      log(firstLayerPosX = firstObject.frame().midX())
      log(firstLayerPosY = firstObject.frame().maxY())

      // Second Layer Position End Point Position
      log(secondLayerPosX = secondObject.frame().midX())
      log(secondLayerPosY = secondObject.frame().minY())

      // Middle Points
      log(middlePosX = (firstLayerPosX + secondLayerPosX)/2)
      log(middlePosY = (firstLayerPosY + secondLayerPosY)/2)
      
      // Connecting points
      path.moveToPoint(NSMakePoint(firstLayerPosX,firstLayerPosY))
      path.lineToPoint(NSMakePoint(firstLayerPosX,middlePosY))
      path.lineToPoint(NSMakePoint(secondLayerPosX,middlePosY))
      path.lineToPoint(NSMakePoint(secondLayerPosX,secondLayerPosY))

      break;
    case "left":
      // First Layer Position Start Point Position
      firstLayerPosX = firstObject.frame().minX()
      firstLayerPosY = firstObject.frame().midY()

      // Second Layer Position End Point Position
      secondLayerPosX = secondObject.frame().maxX()
      secondLayerPosY = secondObject.frame().midY()

      // Middle Points
      middlePosX = (firstLayerPosX + secondLayerPosX)/2
      middlePosY = (firstLayerPosY + secondLayerPosY)/2

      // Connecting points
      path.moveToPoint(NSMakePoint(firstLayerPosX,firstLayerPosY))
      path.lineToPoint(NSMakePoint(middlePosX,firstLayerPosY))
      path.lineToPoint(NSMakePoint(middlePosX,secondLayerPosY))
      path.lineToPoint(NSMakePoint(secondLayerPosX,secondLayerPosY))

      break;
  }

  //TODO: Provide a separate file with all the stylings

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

  return line
}

function addToArrowsGroup(line){
  
  if(currentGroup){
    // If we already have group
    currentGroup.addLayers([line])

  } else {
    // If we don't have a group
    // Creating a group
    let group = new Group({
      parent: currentParentGroup,
      name: 'Arrows',
      locked: true,
      layers: [line]
    })

    // Moving this group to the bottom of the page
    group.moveToBack()
  }
}

function getConnectionsFromPluginData(){
  if(pluginData){
    // If we have database, need to get all previous arrowConnections
    arrowConnections = context.command.valueForKey_onLayer_forPluginIdentifier("arrowConnections", docData, pluginKey)

    for (let i = 0; i < arrowConnections.length; i ++) {
      connectionsArray.push(arrowConnections[i])
    }
  }
}