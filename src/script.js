import sketch from 'sketch'
const { toArray } = require('util')

//
//  Variables
//

let UI = require('sketch/ui') 
let Group = require('sketch/dom').Group
const pluginKey = "flowArrows" // TODO: Need to refactor
const document = sketch.fromNative(context.document)
const page = document.selectedPage
let docData = context.document.documentData() // TODO: Need to refactor
let pluginData = context.command.valueForKey_onLayer_forPluginIdentifier("arrowConnections", docData, pluginKey) // TODO: Need to refactor
let currentParentGroup = docData.currentPage().currentArtboard() || docData.currentPage() // TODO: Need to refactor
let newConnectionsData = getConnectionsData()
let currentGroup

// Settings
var Settings = require('sketch/settings')
let arrowDirectionSetting = Settings.settingForKey('arrowDirection')

//
//  Default Function
//

export default function(context) {

  // Check if we have "Arrows" group
  // TODO: Need to refactor
  currentGroup = checkForArrowGroup()
  let selection = context.selection

  if(selection.count() > 1){
    // When user selected more than one layer
    // Need to define source object first
    // TODO: There is a problem with the source object. Need to select it based on the direction
    let sourceObject = selection.firstObject()

    for(var g = 0; g < selection.count(); g++) {
      
      if(selection[g].objectID() != sourceObject.objectID()){
        const connectionIndex = findConnectionData(selection[g].objectID(), sourceObject.objectID())

        if(connectionIndex != null){
          // Because this is creating flow, we need to take the direction from user settings
          updateArrow(pluginData[connectionIndex].firstObject, pluginData[connectionIndex].secondObject, arrowDirectionSetting, pluginData[connectionIndex].line, connectionIndex)
          context.command.setValue_forKey_onLayer_forPluginIdentifier(newConnectionsData, "arrowConnections", docData, pluginKey)
          sketch.UI.message("Current connection is updated 🚀")
        } else {
          // There is no connection with this two objects in our database
          createArrow(sourceObject.objectID(), selection[g].objectID(), arrowDirectionSetting)
          context.command.setValue_forKey_onLayer_forPluginIdentifier(newConnectionsData, "arrowConnections", docData, pluginKey)
          sketch.UI.message("New connection is created 🚀")
        }
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
  let connections = getConnectionsData()
  
  if(connections.length > 0){
    // We have connections in database
    const updateArrowsCounter = connections.length
    for (let i = 0; i < updateArrowsCounter; i ++) {
      // Need to go through each connection and update arrow position
      updateArrow(connections[i].firstObject, connections[i].secondObject, connections[i].direction, connections[i].line, i)
    }
    context.command.setValue_forKey_onLayer_forPluginIdentifier(newConnectionsData, "arrowConnections", docData, pluginKey)
    sketch.UI.message("All arrows are updated 🚀")
  } else {
    // We don't have any connections to update
    sketch.UI.message("There is nothing to update")
  }
}


export function cleanArrows(context) {
  let alert = COSAlertWindow.new()
  // Title
  alert.setMessageText("Would you like to delete all the arrows?")

  // Creating dialog buttons
  alert.addButtonWithTitle("Delete Arrows")
  alert.addButtonWithTitle("Cancel")

  // Creating the view
  const viewWidth = 300
  const viewHeight = 40

  let view = NSView.alloc().initWithFrame(NSMakeRect(0, 0, viewWidth, viewHeight))
  alert.addAccessoryView(view)

  // Label
  var infoLabel = NSTextField.alloc().initWithFrame(NSMakeRect(-1, viewHeight - 40, 330, 40))

  infoLabel.setStringValue("ℹ️ You can select an artboard to delet all the arrows only from selected one")
  infoLabel.setSelectable(false)
  infoLabel.setDrawsBackground(false)
  infoLabel.setBezeled(false)

  view.addSubview(infoLabel)

  // Show modal and get the results
  let modalResponse = alert.runModal()

  if(modalResponse == NSAlertFirstButtonReturn){
    let selection = context.selection
    let firstObject, secondObject

    if(selection.count() == 1 && selection[0].class() == "MSArtboardGroup"){
      // Need to delete all the arrows only from selected artboard
      let connections = getConnectionsData()
      
      if(connections.length > 0){
        // We have connections in database
        const updateArrowsCounter = connections.length
        for (let i = 0; i < updateArrowsCounter; i ++) {
          // Need to go through each connection and check if it placed on selected artboard
          firstObject = document.getLayerWithID(connections[i].firstObject)
          secondObject = document.getLayerWithID(connections[i].secondObject)
          if (firstObject.sketchObject.parentArtboard().objectID() == selection[0].objectID()){
            if (secondObject.sketchObject.parentArtboard().objectID() == selection[0].objectID()){
              deleteLine(connections[i].line)
              newConnectionsData = deleteConnectionFromData(i)
            }
          }
        }
        context.command.setValue_forKey_onLayer_forPluginIdentifier(newConnectionsData, "arrowConnections", docData, pluginKey)
        sketch.UI.message("All arrows from selected artboard are deleted")
      } else {
        // We don't have any connections to update
        sketch.UI.message("There is nothing to delete")
      }
    } else {
      // Need to delete all the lines
      if(newConnectionsData.length > 0){
        // We have connections in database
        for (let i = 0; i < newConnectionsData.length; i ++) {
          // Need to go through each connection and update arrow position
          deleteLine(newConnectionsData[i].line)
        }
        context.command.setValue_forKey_onLayer_forPluginIdentifier(null, "arrowConnections", docData, pluginKey)
        sketch.UI.message("All arrows are deleted")
      } else {
        // We don't have any connections to update
        sketch.UI.message("There is nothing to delete")
      }
    }
  }
}

export function settings(context) {
  let alert = COSAlertWindow.new()

  // TODO: Need to specify plugin icon
  // alert.setIcon(NSImage.alloc().initByReferencingFile(plugin.urlForResourceNamed("icon.png").path()))

  // Title
  alert.setMessageText("Arrow Plugin Settings")
  
  // Creating dialog buttons
  alert.addButtonWithTitle("Update Settings")
  alert.addButtonWithTitle("Cancel")
  
  // Creating the view
  const viewWidth = 300;
  const viewHeight = 140;
  
  let view = NSView.alloc().initWithFrame(NSMakeRect(0, 0, viewWidth, viewHeight));
  alert.addAccessoryView(view);
  
  // Label: Arrow Direction
  var infoLabel = NSTextField.alloc().initWithFrame(NSMakeRect(-1, viewHeight - 17, 330, 20));

  infoLabel.setStringValue("Arrow Direction")
  infoLabel.setSelectable(false);
  infoLabel.setDrawsBackground(false);
  infoLabel.setBezeled(false);

  view.addSubview(infoLabel);


  // Select: Arrow Direction
  let arrowDirectionField = NSPopUpButton.alloc().initWithFrame(NSMakeRect(-2, viewHeight - 40, 300, 20));

  // Add select options and mark selected the active one
  setActiveDirectionSetting(arrowDirectionField)

  view.addSubview(arrowDirectionField);


  // Label: Auto Direction Desctiption
  var infoLabel = NSTextField.alloc().initWithFrame(NSMakeRect(-1, viewHeight-84, 280, 40));

  infoLabel.setStringValue("ℹ️ Auto mode will draw arrow based on location of the second object")
  infoLabel.setSelectable(false);
  infoLabel.setDrawsBackground(false);
  infoLabel.setBezeled(false);

  view.addSubview(infoLabel);

  // Show modal and get the results
  let modalResponse = alert.runModal()

  if(modalResponse == NSAlertFirstButtonReturn){
    // When user clicks on "Update Settings"
    // Need to save all this results into the Plugin Settings
    Settings.setSettingForKey("arrowDirection", alert.views()[0].subviews()[1].title())
    UI.message("Settings are updated 🚀")
  }
}

//
// Functions
//

function updateArrow(firstObjectID, secondObjectID, direction, lineID, connectionIndex) {
  // There might be a situation, when user deleted current group or current group stays on another artboard => In that case need to create another group

  // Need to check if we have the layers with such IDs
  let firstObject = document.getLayerWithID(firstObjectID)
  let secondObject = document.getLayerWithID(secondObjectID)
  let lineObject = document.getLayerWithID(lineID)

  // Need to delete data first, because we will have a new line
  newConnectionsData = deleteConnectionFromData(connectionIndex)
  if(lineObject){
    // If we have a line, need to delete it, because it will be recreated
    lineObject.remove()
  }

  if(firstObject && secondObject){
    // If we have all the objects, we can recreate the line
    createArrow(firstObjectID, secondObjectID, direction)
  } 
}

function createArrow(firstObjectID, secondObjectID, direction) {
  // Process of creating new connection
  let localDirection
  
  if(direction == "Auto"){
    // If direction is auto, we need to specify direction ourselves
    localDirection = getDirection(firstObjectID, secondObjectID)
  } else {
    localDirection = direction
  }

  let line = drawLine(firstObjectID, secondObjectID, localDirection)
  addToArrowsGroup(line)

  // Storage for current connection
  let connection = {
    firstObject : firstObjectID,
    secondObject : secondObjectID,
    direction: localDirection,
    line : line.objectID()
  }
  // Need to save this data to the global array
  newConnectionsData.push(connection)
}

function checkForArrowGroup() {
  // Checking all the groups that we have
  for(let i = 0; i < currentParentGroup.layers().count(); i++){
    if(currentParentGroup.layers()[i].name() == "Arrows") {
      // If we already have "Arrow" group we need to save it's folder
      currentGroup = currentParentGroup.layers()[i]
    } 
  }
  return currentGroup // TODO: Need to refactor. Can be used global variable here
}

function getDirection(firstObjectID, secondObjectID){
  // Get direction from the source object
  const firstObject = document.getLayerWithID(firstObjectID)
  const secondObject = document.getLayerWithID(secondObjectID)
  const firstObjectMidX = firstObject.frame.x+firstObject.frame.width/2
  const firstObjectMidY = firstObject.frame.y+firstObject.frame.height/2
  const secondObjectMidX = secondObject.frame.x+secondObject.frame.width/2
  const secondObjectMidY = secondObject.frame.y+secondObject.frame.height/2

  const diffX = firstObjectMidX - secondObjectMidX
  const diffY = firstObjectMidY - secondObjectMidY
  const absDiffX = Math.abs(diffX) 
  const absDiffY = Math.abs(diffY)
  let direction

  if(secondObjectMidX > firstObjectMidX){
    // Right Half
    if(secondObjectMidY > firstObjectMidY){
      // Bottom quarter
      if(diffX > diffY) {
        direction = "Down"
      } else {
        direction = "Right"
      }
    } else {
      // Top quarter
      if(absDiffX > absDiffY) {
        direction = "Right"
      } else {
        direction = "Up"
      }
    }
  } else {
    // Left Half
    if(secondObjectMidY > firstObjectMidY){
      // Bottom quarter
      if(absDiffX > absDiffY) {
        direction = "Left"
      } else {
        direction = "Down"
      }
    } else {
      // Top quarter
      if(diffX > diffY) {
        direction = "Left"
      } else {
        direction = "Up"
      }
    }
  }
  return direction
}

function drawLine(firstObjectID, secondObjectID, direction){
  let firstLayerPosX, firstLayerPosY, secondLayerPosX, secondLayerPosY, middlePosX, middlePosY
  
  const firstObject = document.getLayerWithID(firstObjectID)
  const secondObject = document.getLayerWithID(secondObjectID)

  // Drawing a line
  let path = NSBezierPath.bezierPath()
  
  // Based on direction, we need to specify connection points
  if(direction == "Up"){
    // First Layer Position Start Point Position
    firstLayerPosX = firstObject.frame.x+firstObject.frame.width/2
    firstLayerPosY = firstObject.frame.y

    // Second Layer Position End Point Position
    secondLayerPosX = secondObject.frame.x+secondObject.frame.width/2
    secondLayerPosY = secondObject.frame.y+secondObject.frame.height

    // Middle Points
    middlePosX = (firstLayerPosX + secondLayerPosX)/2
    middlePosY = (firstLayerPosY + secondLayerPosY)/2

    // Connecting points
    path.moveToPoint(NSMakePoint(firstLayerPosX,firstLayerPosY))
    path.lineToPoint(NSMakePoint(firstLayerPosX,middlePosY))
    path.lineToPoint(NSMakePoint(secondLayerPosX,middlePosY))
    path.lineToPoint(NSMakePoint(secondLayerPosX,secondLayerPosY))
  }

  if(direction == "Right"){
    // First Layer Position Start Point Position
    firstLayerPosX = firstObject.frame.x+firstObject.frame.width
    firstLayerPosY = firstObject.frame.y+firstObject.frame.height/2

    // Second Layer Position End Point Position
    secondLayerPosX = secondObject.frame.x
    secondLayerPosY = secondObject.frame.y+secondObject.frame.height/2
    
    // Middle Points
    middlePosX = (firstLayerPosX + secondLayerPosX)/2
    middlePosY = (firstLayerPosY + secondLayerPosY)/2

    // Connecting points
    path.moveToPoint(NSMakePoint(firstLayerPosX,firstLayerPosY))
    path.lineToPoint(NSMakePoint(middlePosX,firstLayerPosY))
    path.lineToPoint(NSMakePoint(middlePosX,secondLayerPosY))
    path.lineToPoint(NSMakePoint(secondLayerPosX,secondLayerPosY))
  }

  if(direction == "Down"){
    // First Layer Position Start Point Position
    firstLayerPosX = firstObject.frame.x+firstObject.frame.width/2
    firstLayerPosY = firstObject.frame.y+firstObject.frame.height

    // Second Layer Position End Point Position
    secondLayerPosX = secondObject.frame.x+secondObject.frame.width/2
    secondLayerPosY = secondObject.frame.y

    // Middle Points
    middlePosX = (firstLayerPosX + secondLayerPosX)/2
    middlePosY = (firstLayerPosY + secondLayerPosY)/2
    
    // Connecting points
    path.moveToPoint(NSMakePoint(firstLayerPosX,firstLayerPosY))
    path.lineToPoint(NSMakePoint(firstLayerPosX,middlePosY))
    path.lineToPoint(NSMakePoint(secondLayerPosX,middlePosY))
    path.lineToPoint(NSMakePoint(secondLayerPosX,secondLayerPosY))
  }

  if(direction == "Left"){
    // First Layer Position Start Point Position
    firstLayerPosX = firstObject.frame.x
    firstLayerPosY = firstObject.frame.y+firstObject.frame.height/2

    // Second Layer Position End Point Position
    secondLayerPosX = secondObject.frame.x+secondObject.frame.width
    secondLayerPosY = secondObject.frame.y+secondObject.frame.height/2

    // Middle Points
    middlePosX = (firstLayerPosX + secondLayerPosX)/2
    middlePosY = (firstLayerPosY + secondLayerPosY)/2

    // Connecting points
    path.moveToPoint(NSMakePoint(firstLayerPosX,firstLayerPosY))
    path.lineToPoint(NSMakePoint(middlePosX,firstLayerPosY))
    path.lineToPoint(NSMakePoint(middlePosX,secondLayerPosY))
    path.lineToPoint(NSMakePoint(secondLayerPosX,secondLayerPosY))
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

function getConnectionsData(){
  let dataArray = []
  let pluginDataConnections = []
  if(pluginData){
    pluginDataConnections = context.command.valueForKey_onLayer_forPluginIdentifier("arrowConnections", docData, pluginKey)
    
    for (let i = 0; i < pluginDataConnections.length; i ++) {
      dataArray.push(pluginDataConnections[i])
    }
  } 
  return dataArray
}

function findConnectionData(firstObjectID, secondObjectID){
  let arrayNumber = null

  if(pluginData){
    // If we have database, need to check for connections
    let connections = context.command.valueForKey_onLayer_forPluginIdentifier("arrowConnections", docData, pluginKey)

    
    for(let y = 0; y < connections.count(); y++){

      if(firstObjectID == connections[y].firstObject || firstObjectID == connections[y].secondObject){
        // if we found that we have this object in connection database already

        if(secondObjectID == connections[y].firstObject || secondObjectID == connections[y].secondObject){
          // if we found that we have this object in connection database already
          arrayNumber = y
        }
      }
    }
  }
  return arrayNumber
}

function setActiveDirectionSetting (arrowDirectionField){
  let currentDirection = "Auto"

  if(Settings.settingForKey("arrowDirection")){
    // if there is data in settings
    currentDirection = Settings.settingForKey("arrowDirection")  
    
    if(currentDirection == "Auto"){
      arrowDirectionField.addItemWithTitle("Auto")
      arrowDirectionField.lastItem().setState(1)
      arrowDirectionField.addItemWithTitle("Right")
      arrowDirectionField.lastItem().setState(0)
      arrowDirectionField.addItemWithTitle("Down")
      arrowDirectionField.lastItem().setState(0)
      arrowDirectionField.addItemWithTitle("Left")
      arrowDirectionField.lastItem().setState(0)
      arrowDirectionField.addItemWithTitle("Up")
      arrowDirectionField.lastItem().setState(0)
    } 
    
    if(currentDirection == "Right"){
      arrowDirectionField.addItemWithTitle("Right")
      arrowDirectionField.lastItem().setState(1)
      arrowDirectionField.addItemWithTitle("Down")
      arrowDirectionField.lastItem().setState(0)
      arrowDirectionField.addItemWithTitle("Left")
      arrowDirectionField.lastItem().setState(0)
      arrowDirectionField.addItemWithTitle("Up")
      arrowDirectionField.lastItem().setState(0)
      arrowDirectionField.addItemWithTitle("Auto")
      arrowDirectionField.lastItem().setState(0)
    } 

    if(currentDirection == "Down"){
      arrowDirectionField.addItemWithTitle("Down")
      arrowDirectionField.lastItem().setState(1)
      arrowDirectionField.addItemWithTitle("Left")
      arrowDirectionField.lastItem().setState(0)
      arrowDirectionField.addItemWithTitle("Up")
      arrowDirectionField.lastItem().setState(0)
      arrowDirectionField.addItemWithTitle("Auto")
      arrowDirectionField.lastItem().setState(0)
      arrowDirectionField.addItemWithTitle("Right")
      arrowDirectionField.lastItem().setState(0)
    } 

    if(currentDirection == "Left"){
      arrowDirectionField.addItemWithTitle("Left")
      arrowDirectionField.lastItem().setState(1)
      arrowDirectionField.addItemWithTitle("Up")
      arrowDirectionField.lastItem().setState(0)
      arrowDirectionField.addItemWithTitle("Auto")
      arrowDirectionField.lastItem().setState(0)
      arrowDirectionField.addItemWithTitle("Right")
      arrowDirectionField.lastItem().setState(0)
      arrowDirectionField.addItemWithTitle("Down")
      arrowDirectionField.lastItem().setState(0)
    } 

    if(currentDirection == "Up"){
      arrowDirectionField.addItemWithTitle("Up")
      arrowDirectionField.lastItem().setState(1)
      arrowDirectionField.addItemWithTitle("Auto")
      arrowDirectionField.lastItem().setState(0)
      arrowDirectionField.addItemWithTitle("Right")
      arrowDirectionField.lastItem().setState(0)
      arrowDirectionField.addItemWithTitle("Down")
      arrowDirectionField.lastItem().setState(0)
      arrowDirectionField.addItemWithTitle("Left")
      arrowDirectionField.lastItem().setState(0)
    } 

  } else {
    // Show default
    arrowDirectionField.addItemWithTitle("Auto")
    arrowDirectionField.addItemWithTitle("Right")
    arrowDirectionField.addItemWithTitle("Down")
    arrowDirectionField.addItemWithTitle("Left")
    arrowDirectionField.addItemWithTitle("Up")
  }
}

function deleteConnectionFromData(arrayNumber){
  let newConnections = []
  if(pluginData){
    // If we have database
    let connections = context.command.valueForKey_onLayer_forPluginIdentifier("arrowConnections", docData, pluginKey)

    for (let i = 0; i < connections.length; i ++) {
      // Updating all connections without deleted one
      if(i != arrayNumber){
        newConnections.push(connections[i])
      }
    }
  }
  return newConnections
}

function deleteLine(lineID){
  const lineObject = document.getLayerWithID(lineID)
  let selectedGroup

  if(lineObject){
    selectedGroup = lineObject.parent
    lineObject.remove()
    if(selectedGroup.layers.length == 0){
      selectedGroup.remove()
    }
  }
}