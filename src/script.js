import sketch from 'sketch'
// const { toArray } = require('util')

//
//  Variables
//

let UI = require('sketch/ui') 
var SharedStyle = require('sketch/dom').SharedStyle

const pluginKey = "flowArrows"
const document = sketch.fromNative(context.document)
let docData = context.document.documentData()
let pluginData = context.command.valueForKey_onLayer_forPluginIdentifier("arrowConnections", docData, pluginKey) // TODO: Need to refactor
let currentParentGroup = docData.currentPage().currentArtboard() || docData.currentPage() // TODO: Might be a problem for multiple artboards
let newConnectionsData = getConnectionsData()

// Settings
var Settings = require('sketch/settings')
let arrowDirectionSetting

if(Settings.settingForKey("arrowDirection")) {
  arrowDirectionSetting = Settings.settingForKey('arrowDirection')
} else {
  arrowDirectionSetting = "Auto"
}
  
//
//  Default Function
//

export default function(context) {

  let selection = context.selection

  if(selection.count() > 1){
    // Need to find source object by ID first
    let sourceObjectID = getSourceObjectFromSelection(selection)
    let currentConnectionsData = newConnectionsData

    for(let g = 0; g < selection.count(); g++) {
      if(selection[g].objectID() != sourceObjectID){
        // Then need to create or update connection arrow with each selection
        let connectionIndex = findConnectionData(sourceObjectID, selection[g].objectID(), currentConnectionsData)
        // log("Index "+connectionIndex)
        if(connectionIndex != null){
          // Because this is creating flow, we need to take the direction from user settings
          updateArrow(currentConnectionsData[connectionIndex].firstObject, currentConnectionsData[connectionIndex].secondObject, arrowDirectionSetting, currentConnectionsData[connectionIndex].line, connectionIndex)
          sketch.UI.message("Current connection is updated 🚀")
        } else {
          // There is no connection with this two objects in our database
          createArrow(sourceObjectID, selection[g].objectID(), arrowDirectionSetting)
          sketch.UI.message("New connection is created 🚀")
        }
      }
    }
    context.command.setValue_forKey_onLayer_forPluginIdentifier(newConnectionsData, "arrowConnections", docData, pluginKey)
    // log(newConnectionsData)
  } else {
    // When user didn't select anything
    sketch.UI.message("Please select more than two layers")
  }
}

//
// Plugin Commands
//

export function updateSelectedArrows(context) {

  let selection = context.selection

  if(selection.count() > 1){
    // Need to find source object by ID first
    let sourceObjectID = getSourceObjectFromSelection(selection)
    let currentConnectionsData = newConnectionsData

    for(let g = 0; g < selection.count(); g++) {
      if(selection[g].objectID() != sourceObjectID){
        // Then need to create or update connection arrow with each selection
        let connectionIndex = findConnectionData(sourceObjectID, selection[g].objectID(), currentConnectionsData)

        if(connectionIndex != null){
          updateArrow(currentConnectionsData[connectionIndex].firstObject, currentConnectionsData[connectionIndex].secondObject, arrowDirectionSetting, currentConnectionsData[connectionIndex].line, connectionIndex)
          sketch.UI.message("Current connection is updated 🚀")
        } 
      }
    }
    context.command.setValue_forKey_onLayer_forPluginIdentifier(newConnectionsData, "arrowConnections", docData, pluginKey)
    // log(newConnectionsData)
  } else {
    // When user didn't select anything
    sketch.UI.message("Please select more than two layers")
  }
}

export function updateArtboardArrows(context) {
  // TODO: Need to show amount of updated arrows and deleted ones
  let selection = context.selection
  let connections = getConnectionsData()
  let firstObjectArtboard
  let secondObjectArtboard
  
  if(connections.length > 0){
    // We have connections in database
    const updateArrowsCounter = connections.length
    for (let i = 0; i < updateArrowsCounter; i ++) {
      // Need to check if the element is selected globally or from the artboard
      firstObjectArtboard = document.getLayerWithID(connections[i].firstObject)
      firstObjectArtboard = firstObjectArtboard.sketchObject.parentArtboard().objectID()

      secondObjectArtboard = document.getLayerWithID(connections[i].secondObject)
      secondObjectArtboard = secondObjectArtboard.sketchObject.parentArtboard().objectID()

      if(selection.count() == 1 && selection[0].class() == "MSArtboardGroup"){
        // Need to go through each connection and update arrow position for specific artboard
        
        if (firstObjectArtboard == selection[0].objectID()){
          if (secondObjectArtboard == selection[0].objectID()){
            updateArrow(connections[i].firstObject, connections[i].secondObject, connections[i].direction, connections[i].line, i)
          } else {newConnectionsData.push(connections[i])}
        } else {
          // If not just saving it
          newConnectionsData.push(connections[i])
        }
      }
    }
    context.command.setValue_forKey_onLayer_forPluginIdentifier(newConnectionsData, "arrowConnections", docData, pluginKey)
    sketch.UI.message("All arrows are updated 🚀")
  } else {
    // We don't have any connections to update
    sketch.UI.message("There is nothing to update")
  }

  // log(newConnectionsData)
}

export function updateAllArrows(context) { // TODO
  // TODO: Need to show amount of updated arrows and deleted ones
  let selection = context.selection
  let connections = getConnectionsData()
  let firstObjectArtboard
  let secondObjectArtboard
  
  if(connections.length > 0){
    // We have connections in database
    const updateArrowsCounter = connections.length
    for (let i = 0; i < updateArrowsCounter; i ++) {
      // Need to go through each connection and update arrow position without artboards
      // Need to check if current object don't have the parrent
      updateArrow(connections[i].firstObject, connections[i].secondObject, connections[i].direction, connections[i].line, i)
    }
    context.command.setValue_forKey_onLayer_forPluginIdentifier(newConnectionsData, "arrowConnections", docData, pluginKey)
    sketch.UI.message("All arrows are updated 🚀")
  } else {
    // We don't have any connections to update
    sketch.UI.message("There is nothing to update")
  }
}

export function deleteAllArrows(context) {

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

export function deleteArtboardArrows(context) {
  let selection = context.selection
  let firstObject, secondObject

  // Need to delete all the arrows only from selected artboard
  if(selection.count() == 1 && selection[0].class() == "MSArtboardGroup"){
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
    sketch.UI.message("Please select one artboard")
  }
}

export function deleteSelectedArrows(context) {
  let selection = context.selection
  let firstObject, secondObject

  // Need to delete all the arrows only from selected artboard
  if(selection.count() == 2){

    for(let g = 0; g < selection.count(); g++) {

      if(selection[g].objectID() != selection[0].objectID()){ // It will never check 3rd connection
        let connections = getConnectionsData()
        
        let connectionIndex = findConnectionData(selection[0].objectID(), selection[g].objectID(), connections)
        // log(connectionIndex)
        
        if(connectionIndex != null){
          // We have connections in database
          deleteLine(connections[connectionIndex].line)
          newConnectionsData = deleteConnectionFromData(connectionIndex)
          const updateArrowsCounter = connections.length
          for (let i = 0; i < updateArrowsCounter; i ++) {
            // Need to go through each connection and check if it placed on selected artboard
            firstObject = document.getLayerWithID(connections[i].firstObject)
            secondObject = document.getLayerWithID(connections[i].secondObject)
            if(firstObject.sketchObject.parentArtboard().objectID() == selection[0].objectID()){
              if(secondObject.sketchObject.parentArtboard().objectID() == selection[0].objectID()){
                deleteLine(connections[i].line)
                newConnectionsData = deleteConnectionFromData(i)
              }
            }
          }
          context.command.setValue_forKey_onLayer_forPluginIdentifier(newConnectionsData, "arrowConnections", docData, pluginKey)
          sketch.UI.message("All arrows from selected layers are deleted ✌️")
        }
      }
    }
  } else {
    sketch.UI.message("Select two layers, please 🧐")
  }
}

export function settings(context) {
  let alert = COSAlertWindow.new()
  const viewWidth = 300
  const viewHeight = 430
  
  // Alert window settingsnp
  alert = alertSetup(alert, viewWidth, viewHeight)
  let view = NSView.alloc().initWithFrame(NSMakeRect(0, 0, viewWidth, viewHeight))
  alert.addAccessoryView(view)

  // Label: Arrow Direction
  let arrowDirectionLabel = alertLabel("Arrow Direction", true, -1, viewHeight - 17, 330, 20)
  view.addSubview(arrowDirectionLabel)
    
  // Select: Arrow Direction
  let arrowDirectionField = NSPopUpButton.alloc().initWithFrame(NSMakeRect(-2, viewHeight - 40, 300, 20))
  setActiveDirectionSetting(arrowDirectionField)
  view.addSubview(arrowDirectionField)

  // Label: Auto Direction Info
  let arrowDirectionInfoLabel = alertLabel("Auto mode will draw arrow based on location of the second object", false, -1, viewHeight-84, 300, 40)
  view.addSubview(arrowDirectionInfoLabel)

  // Label: Arrow Spacing
  let arrowSpacingLabel = alertLabel("Arrow Spacing", true, -1, viewHeight - 120, 330, 20)
  view.addSubview(arrowSpacingLabel)

  // Select: Arrow Spacing
  let arrowSpacingField = NSPopUpButton.alloc().initWithFrame(NSMakeRect(-2, viewHeight - 143, 300, 20));
  setActiveSpacingSetting(arrowSpacingField)
  view.addSubview(arrowSpacingField)
  
  // Label: Auto Spacing Info
  let arrowSpacingInfoLabel = alertLabel("If you will select spacing, the second layer position will be moved closer", false, -1, viewHeight-187, 300, 40)
  view.addSubview(arrowSpacingInfoLabel)


  // Label: Arrow Style
  let arrowStyleLabel = alertLabel("Arrow Style", true, -1, viewHeight-240, 280, 40)
  view.addSubview(arrowStyleLabel)

  // Select: Arrow Style
  let arrowStylingField = NSPopUpButton.alloc().initWithFrame(NSMakeRect(-2, viewHeight - 240, 300, 20));
  // setActiveSpacingSetting(arrowSpacingField)
  view.addSubview(arrowStylingField)

  // Label: Arrow Style Info
  let arrowStyleInfoLabel = alertLabel("Add layer style to your document that will contain $arrow name and you will be able to specify it here ", false, -1, viewHeight-280, 300, 40)
  view.addSubview(arrowStyleInfoLabel)


  // Label: Other Settings
  let otherSettingsLabel = alertLabel("Other Settings", true, -1, viewHeight-340, 280, 40)
  view.addSubview(otherSettingsLabel)

  // Checkbox: Auto-Align
  let checkbox = alertCheckbox("Second layer auto-align", false, -1, viewHeight-350, 260, 40)
  view.addSubview(checkbox)

  // Label: Auto-Align Info
  let autoAlignInfoLabel = alertLabel("Align the second layer for 5px misalignment with the first one", false, -1, viewHeight-380, 280, 40)
  view.addSubview(autoAlignInfoLabel)

  // Label: Plugin Info
  let pluginInfoLabel = alertLabel("Made by @faridSabitov with the support of EPAM.com ❤️", true, -1, viewHeight-430, 280, 40)
  view.addSubview(pluginInfoLabel)


  // Need to check if style is still available

  // Show modal and get the results
  let modalResponse = alert.runModal()

  if(modalResponse == NSAlertFirstButtonReturn){
    // When user clicks on "Update Settings"
    // Need to save all this results into the Plugin Settings
    Settings.setSettingForKey("arrowDirection", alert.views()[0].subviews()[1].title())
    Settings.setSettingForKey("arrowSpacing", alert.views()[0].subviews()[4].title())
    Settings.setSettingForKey("autoAlign", alert.views()[0].subviews()[7].state())
    // TODO Save style context.command.setValue_forKey_onLayer_forPluginIdentifier(newConnectionsData, "arrowStyle", docData, pluginKey)
    UI.message("Settings are updated 🚀")
  }
}

export function onLayersMoved(context) {
  sketch.UI.message("Please select more than two layers")
  // let a = 0
  const action = context.actionContext
  // log(context.actionContext)
  // log("moved")
  
}

export function panel(context) {
  let ControlBar
  ControlBar = NSPanel.alloc().init();
  ControlBar.setStyleMask(NSTitledWindowMask + NSFullSizeContentViewWindowMask);
  // ControlBar.setBackgroundColor(NSColor.colorWithRed_green_blue_alpha(0.99, 0.99, 0.99, 1));
  ControlBar.setTitleVisibility(NSWindowTitleHidden);
  ControlBar.setTitlebarAppearsTransparent(true);
  ControlBar.setFrame_display(NSMakeRect(0, 0, 720, 50), false);
  ControlBar.setMovableByWindowBackground(true);
  ControlBar.setHasShadow(true);
  ControlBar.setLevel(NSFloatingWindowLevel);

  // contentView.addSubview(closeButton)
  ControlBar.center();
  ControlBar.makeKeyAndOrderFront(nil);

//   getImage = function(size, name){
//     var isRetinaDisplay = (NSScreen.mainScreen().backingScaleFactor() > 1)? true: false;
//         suffix = (isRetinaDisplay)? "@2x": "",
//         imageURL = NSURL.fileURLWithPath(self.pluginResources + "/icons/" + name + suffix + ".png"),
//         image = NSImage.alloc().initWithContentsOfURL(imageURL);
//     return image
// },
// addButton = function(rect, name, callAction){
//     var button = NSButton.alloc().initWithFrame(rect),
//         image = getImage(rect.size, name);

//     button.setImage(image);
//     button.setBordered(false);
//     button.sizeToFit();
//     button.setButtonType(NSMomentaryChangeButton);
//     button.setCOSJSTargetFunction(callAction);
//     button.setAction("callAction:");
//     return button;
// },
// addImage = function(rect, name){
//     var view = NSImageView.alloc().initWithFrame(rect),
//         image = getImage(rect.size, name);
//     view.setImage(image);
//     return view;
// },

// closeButton = addButton( NSMakeRect(20, 10, 30, 30), "close-control",
//     function(sender){
//         coscript.setShouldKeepAround(false);
//         threadDictionary.removeObjectForKey(identifier);
//         ControlBar.close();
// }),



}

log(getLayerStyles())

//
// Functions
//

function updateArrow(firstObjectID, secondObjectID, direction, lineID, connectionIndex) {
  // There might be a situation, when user deleted current group or current group stays on another artboard => In that case need to create another group

  // Need to check if we have the layers with such IDs
  let firstObject = document.getLayerWithID(firstObjectID)
  let secondObject = document.getLayerWithID(secondObjectID)

  // Need to delete data first, because we will have a new line
  deleteLine(lineID)
  newConnectionsData = deleteConnectionFromData(connectionIndex)

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
  
  updateSpacing(firstObjectID, secondObjectID, localDirection)
  autoAlignLayer(firstObjectID, secondObjectID, localDirection)
  let currentGroup = checkForArrowGroup()
  let line = drawLine(firstObjectID, secondObjectID, localDirection, currentGroup)
  addToArrowsGroup(line, currentGroup)

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
  let currentGroup = null
  // Checking all the groups that we have
  for(let i = 0; i < currentParentGroup.layers().count(); i++){
    if(currentParentGroup.layers()[i].name() == "Arrows") {
      // If we already have "Arrow" group we need to save it's folder
      currentGroup = currentParentGroup.layers()[i]
      refactorLines(currentGroup)
    } 
  }
  return currentGroup
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

function drawLine(firstObjectID, secondObjectID, direction, currentGroup){
  let firstLayerPosX, firstLayerPosY, secondLayerPosX, secondLayerPosY, middlePosX, middlePosY, diffX, diffY
  let firstObject = document.getLayerWithID(firstObjectID)
  let secondObject = document.getLayerWithID(secondObjectID)

  
  if(currentGroup){
    //if we already have a group, need to specify the difference
    diffX = currentGroup.frame().x()
    diffY = currentGroup.frame().y()
  } else {
    diffX = 0
    diffY = 0
  }

  // Drawing a line
  let path = NSBezierPath.bezierPath()

  
  
  // Based on direction, we need to specify connection points
  if(direction == "Up"){
    // First Layer Position Start Point Position
    firstLayerPosX = firstObject.frame.x+firstObject.frame.width/2-diffX
    firstLayerPosY = firstObject.frame.y-diffY

    // Second Layer Position End Point Position
    secondLayerPosX = secondObject.frame.x+secondObject.frame.width/2-diffX
    secondLayerPosY = secondObject.frame.y+secondObject.frame.height-diffY

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
    firstLayerPosX = firstObject.frame.x+firstObject.frame.width-diffX
    firstLayerPosY = firstObject.frame.y+firstObject.frame.height/2-diffY

    // Second Layer Position End Point Position
    secondLayerPosX = secondObject.frame.x-diffX
    secondLayerPosY = secondObject.frame.y+secondObject.frame.height/2-diffY
    
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
    firstLayerPosX = firstObject.frame.x+firstObject.frame.width/2-diffX
    firstLayerPosY = firstObject.frame.y+firstObject.frame.height-diffY

    // Second Layer Position End Point Position
    secondLayerPosX = secondObject.frame.x+secondObject.frame.width/2-diffX
    secondLayerPosY = secondObject.frame.y-diffY

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
    firstLayerPosX = firstObject.frame.x-diffX
    firstLayerPosY = firstObject.frame.y+firstObject.frame.height/2-diffY

    // Second Layer Position End Point Position
    secondLayerPosX = secondObject.frame.x+secondObject.frame.width-diffX
    secondLayerPosY = secondObject.frame.y+secondObject.frame.height/2-diffY

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

function addToArrowsGroup(line, currentGroup){
  if(currentGroup){
    currentGroup.addLayers([line])
    currentGroup.fixGeometryWithOptions(1)
  } else {
    // If we don't have a group
    let Group = require('sketch/dom').Group
    let group = new Group({
      parent: currentParentGroup,
      name: 'Arrows',
      locked: true,
      layers: [line]
    })
    // Moving this group to the bottom of the page
    group.moveToBack()
    currentGroup = checkForArrowGroup()
    currentGroup.fixGeometryWithOptions(1)
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

function findConnectionData(firstObjectID, secondObjectID, data){
  let arrayNumber = null
  firstObjectID = String(firstObjectID)
  secondObjectID = String(secondObjectID)

  if(pluginData){
    // If we have database, need to check for connections

    for(let y = 0; y < data.length; y++){
      // log("First one "+firstObjectID)
      // log("Current Index "+y)

      if(firstObjectID == data[y].firstObject || firstObjectID == data[y].secondObject){
        // if we found that we have this object in connection database already
        // log("We have the first one")
        // log("Second one "+secondObjectID)
        if(secondObjectID == data[y].firstObject || secondObjectID == data[y].secondObject){
          // if we found that we have this object in connection database already
          arrayNumber = y
          // log("We have the second one as"+arrayNumber)
        } 
      }
    }
  }
  return arrayNumber
}

function setActiveDirectionSetting(arrowDirectionField){
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

function setActiveSpacingSetting(arrowSpacingField){
  let currentSpacing = "Not selected"

  if(Settings.settingForKey("arrowSpacing")){
    // if there is data in settings
    currentSpacing = Settings.settingForKey("arrowSpacing")  
    
    if(currentSpacing == "Not selected"){
      arrowSpacingField.addItemWithTitle("Not selected")
      arrowSpacingField.lastItem().setState(1)
      arrowSpacingField.addItemWithTitle("30px")
      arrowSpacingField.lastItem().setState(0)
      arrowSpacingField.addItemWithTitle("70px")
      arrowSpacingField.lastItem().setState(0)
    } 
    
    if(currentSpacing == "30px"){
      arrowSpacingField.addItemWithTitle("30px")
      arrowSpacingField.lastItem().setState(1)
      arrowSpacingField.addItemWithTitle("70px")
      arrowSpacingField.lastItem().setState(0)
      arrowSpacingField.addItemWithTitle("Not selected")
      arrowSpacingField.lastItem().setState(0)
    } 

    if(currentSpacing == "70px"){
      arrowSpacingField.addItemWithTitle("70px")
      arrowSpacingField.lastItem().setState(1)
      arrowSpacingField.addItemWithTitle("Not selected")
      arrowSpacingField.lastItem().setState(0)
      arrowSpacingField.addItemWithTitle("30px")
      arrowSpacingField.lastItem().setState(0)
    } 
  } else {
    // Show default
    arrowSpacingField.addItemWithTitle("Not Selected")
    arrowSpacingField.addItemWithTitle("30px")
    arrowSpacingField.addItemWithTitle("70px")
  }
}

function setActiveStyleSetting(arrowSpacingField){
  let currentSpacing = "Not selected"
  let docSettings = context.command.valueForKey_onLayer_forPluginIdentifier("arrowStyle", docData, pluginKey)
  getLayerStyles()

  if(Settings.settingForKey("arrowSpacing")){
    // if there is data in settings
    currentSpacing = Settings.settingForKey("arrowSpacing")  
    
    if(currentSpacing == "Not selected"){
      arrowSpacingField.addItemWithTitle("Not selected")
      arrowSpacingField.lastItem().setState(1)
      arrowSpacingField.addItemWithTitle("30px")
      arrowSpacingField.lastItem().setState(0)
      arrowSpacingField.addItemWithTitle("70px")
      arrowSpacingField.lastItem().setState(0)
    } 

  } else {
    // Show default
    arrowSpacingField.addItemWithTitle("Default Style")
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

function refactorLines(group){ // Need to finish
  // log(group.layers().length)
  for(let i = 0; i < group.layers().length; i++){
    // log(group.layers()[i].objectID())
    // Here we need to go through each data in our database and delete line if there is no data
  }
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

function updateSpacing(sourceObjectID, childObjectID, direction){
  let sourceObject = document.getLayerWithID(sourceObjectID)
  let childObject = document.getLayerWithID(childObjectID)

  if(Settings.settingForKey("arrowSpacing")){
    let currentSpacing = Settings.settingForKey("arrowSpacing")
    
    if(direction == "Right"){
      if(currentSpacing == "30px"){childObject.frame.x = sourceObject.frame.x + sourceObject.frame.width + 30}
      if(currentSpacing == "70px"){childObject.frame.x = sourceObject.frame.x + sourceObject.frame.width + 70}
    }
  
    if(direction == "Down"){
      if(currentSpacing == "30px"){childObject.frame.y = sourceObject.frame.y + sourceObject.frame.height + 30}
      if(currentSpacing == "70px"){childObject.frame.y = sourceObject.frame.y + sourceObject.frame.height + 70}
    }
  
    if(direction == "Left"){
      if(currentSpacing == "30px"){childObject.frame.x = sourceObject.frame.x - childObject.frame.width - 30}
      if(currentSpacing == "70px"){childObject.frame.x = sourceObject.frame.x - childObject.frame.width - 70}
    }
  
    if(direction == "Up"){
      if(currentSpacing == "30px"){childObject.frame.y = sourceObject.frame.y - childObject.frame.height - 30}
      if(currentSpacing == "70px"){childObject.frame.y = sourceObject.frame.y - childObject.frame.height - 70}
    }
  }
}

function autoAlignLayer(sourceObjectID, childObjectID, direction){
  let sourceObject = document.getLayerWithID(sourceObjectID)
  let childObject = document.getLayerWithID(childObjectID)
  let sourceMidY, childMidY, sourceMidX, childMidX, diff

  if(Settings.settingForKey("autoAlign")){
    if(Settings.settingForKey("autoAlign") == true){
      // If user turned on Auto-Align settings
      
      if(direction == "Right" || direction == "Left"){
        sourceMidY = sourceObject.frame.y + sourceObject.frame.height/2
        childMidY = childObject.frame.y + childObject.frame.height/2
        diff = sourceMidY - childMidY
        if(diff > -6 && diff < 6){childObject.frame.y = childObject.frame.y + diff}
      }
    
      if(direction == "Down" || direction == "Up"){
        sourceMidX = sourceObject.frame.x + sourceObject.frame.width/2
        childMidX = childObject.frame.x + childObject.frame.width/2
        diff = sourceMidX - childMidX
        if(diff > -6 && diff < 6){childObject.frame.x = childObject.frame.x + diff}
      }
    }
  }
}

function defineSourceObject(firstObjectID, secondObjectID, direction){
  let firstObject = document.getLayerWithID(firstObjectID)
  let secondObject = document.getLayerWithID(secondObjectID)
  let sourceObjectID

  if(direction == "Auto"){
    sourceObjectID = firstObject.id
  }

  if(direction == "Right"){
    if(firstObject.frame.x <= secondObject.frame.x){
      sourceObjectID = firstObject.id
    } else {
      sourceObjectID = secondObject.id
    }
  }

  if(direction == "Down"){
    if(firstObject.frame.y <= secondObject.frame.y){
      sourceObjectID = firstObject.id
    } else {
      sourceObjectID = secondObject.id
    }
  }

  if(direction == "Left"){
    if(firstObject.frame.x <= secondObject.frame.x){
      sourceObjectID = secondObject.id
    } else {
      sourceObjectID = firstObject.id
    }
  }

  if(direction == "Up"){
    if(firstObject.frame.y <= secondObject.frame.y){
      sourceObjectID = secondObject.id
    } else {
      sourceObjectID = firstObject.id
    }
  }

  return sourceObjectID
}

function getSourceObjectFromSelection(selection){
  let sourceObjectID = selection.firstObject().objectID()
  
  if(arrowDirectionSetting != "Auto"){
    for(let g = 0; g < selection.count(); g++) {
      sourceObjectID = defineSourceObject(sourceObjectID, selection[g].objectID(), arrowDirectionSetting)
    }
  } else {
    sourceObjectID = defineSourceObject(sourceObjectID, selection[0].objectID(), arrowDirectionSetting)
  }
 
  return sourceObjectID
}

function confirmationAlert(alert, message) {
    // Title
    alert.setMessageText("Would you like to delete all the arrows from "+message)

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
  
    infoLabel.setStringValue("ℹ️ You can select layers, artboards to delete all the arrows from selected one only")
    infoLabel.setSelectable(false)
    infoLabel.setDrawsBackground(false)
    infoLabel.setBezeled(false)
  
    view.addSubview(infoLabel)

    return alert
}

function alertSetup(alert, viewWidth, viewHeight){
  // Title
  alert.setMessageText("Arrow Plugin Settings")
  
  // Creating dialog buttons
  alert.addButtonWithTitle("Update Settings")
  alert.addButtonWithTitle("Cancel")
  
  return alert
}

function alertLabel(message, state, x, y, width, height){
  let infoLabel = NSTextField.alloc().initWithFrame(NSMakeRect(x, y, width, height))

  infoLabel.setStringValue(message)
  infoLabel.setSelectable(false)
  infoLabel.setDrawsBackground(false)
  infoLabel.setBezeled(false)

  if(state == false){
    infoLabel.textColor = NSColor.disabledControlTextColor()
  }

  return infoLabel
}

function alertCheckbox(message, state, x, y, width, height){
  let checkbox = NSButton.alloc().initWithFrame(NSMakeRect(x, y, width, height))

  checkbox.setButtonType(NSSwitchButton)
  checkbox.setBezelStyle(0)
  checkbox.setTitle(message)
  if(Settings.settingForKey("autoAlign")){
    let currentState = Settings.settingForKey("autoAlign")  
    checkbox.setState(currentState)
  } else {
    checkbox.setState(state)
  }

  return checkbox
}

function getLayerStyles() {
  let allStyles = docData.allLayerStyles()
  let keyword = "$arrow"
  let styles = []
  for(let i = 0; i < allStyles.count(); i++){
    if(allStyles[i].name().includes(keyword)){
      styles.push(allStyles[i]);
    }
  }

	return styles
}

// {
//   "script": "./script.js",
//   "name" : "onLayersMoved",
//   "handlers" : {
//     "actions": {
//       "LayersMoved.finish": "onLayersMoved"
//     }
//   },
//   "identifier" : "onLayersMoved"
// }



