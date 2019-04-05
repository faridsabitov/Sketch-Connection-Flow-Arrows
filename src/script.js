import sketch from 'sketch'
// const { toArray } = require('util')

//
//  Variables
//

let UI = require('sketch/ui') 
// var SharedStyle = require('sketch/dom').SharedStyle

const pluginKey = "flowArrows"
const document = sketch.fromNative(context.document)
let docData = context.document.documentData()
let pluginData = context.command.valueForKey_onLayer_forPluginIdentifier("arrowConnections", docData, pluginKey)
let currentParentGroup = docData.currentPage().currentArtboard() || docData.currentPage() // TODO: Might be a problem for multiple artboards
let newConnectionsData = getConnectionsData()

// Settings
var Settings = require('sketch/settings')

  
//
//  Create Connection Function
//

export default function(context) {}
export function createAutoArrow(context){start(context, "Auto", false)}
export function createRightArrow(context){start(context, "Right", false)}
export function createDownArrow(context){start(context, "Down", false)}
export function createLeftArrow(context){start(context, "Left", false)}
export function createUpArrow(context){start(context, "Up", false)}

export function createRightArrowWithCondition(context){start(context, "Right", true)}
export function createDownArrowWithCondition(context){start(context, "Down", true)}
export function createLeftArrowWithCondition(context){start(context, "Left", true)}
export function createUpArrowWithCondition(context){start(context, "Up", true)}

//
// Plugin Commands
//

export function updateSelectedArrows(context) {

  let selection = context.selection

  if(selection.count() > 1){
    // Need to find source object by ID first
    // let sourceObjectID = getSourceObjectFromSelection(selection)
    let currentConnectionsData = newConnectionsData

    for(let g = 0; g < selection.count(); g++) {
      if(selection[g].objectID() != selection[0].objectID()){
        // Then need to create or update connection arrow with each selection
        let connectionIndex = findConnectionData(selection[0].objectID(), selection[g].objectID(), currentConnectionsData)

        if(connectionIndex != null){
          updateArrow(currentConnectionsData[connectionIndex].firstObject, currentConnectionsData[connectionIndex].secondObject, currentConnectionsData[connectionIndex].style, currentConnectionsData[connectionIndex].type, currentConnectionsData[connectionIndex].direction, currentConnectionsData[connectionIndex].line, currentConnectionsData[connectionIndex].condition, connectionIndex)
          sketch.UI.message("Current connection is updated 🚀")
        } else {
          sketch.UI.message("There is no connection between selected layers on the plugin data")
        }
      }
    }
    context.command.setValue_forKey_onLayer_forPluginIdentifier(newConnectionsData, "arrowConnections", docData, pluginKey)
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
            updateArrow(connections[i].firstObject, connections[i].secondObject, connections[i].style, connections[i].type, connections[i].direction, connections[i].line, connections[i].condition, i)
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
}

export function updateAllArrows(context) { // TODO
  // TODO: Need to show amount of updated arrows and deleted ones
  let currentConnectionsData = newConnectionsData
  if(currentConnectionsData.length > 0){
    // We have connections in database
    const updateArrowsCounter = currentConnectionsData.length
    for (let i = 0; i < updateArrowsCounter; i ++) {
      // Need to go through each connection and update arrow position without artboards
      // Need to check if current object don't have the parrent
      updateArrow(currentConnectionsData[i].firstObject, currentConnectionsData[i].secondObject, currentConnectionsData[i].style, currentConnectionsData[i].type, currentConnectionsData[i].direction, currentConnectionsData[i].line, currentConnectionsData[i].condition, i)
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
  const viewHeight = 450
  
  // Alert window settings
  alert = alertSetup(alert, viewWidth, viewHeight)
  let view = NSView.alloc().initWithFrame(NSMakeRect(0, 0, viewWidth, viewHeight))
  alert.addAccessoryView(view)

  // Label: Arrow Style
  let arrowStyleLabel = alertLabel("Arrow Style", true, -1, viewHeight-40, 280, 40)
  view.addSubview(arrowStyleLabel)

  // Select: Arrow Style
  let arrowStylingField = NSPopUpButton.alloc().initWithFrame(NSMakeRect(-2, viewHeight - 40, 300, 20));
  setActiveStyleSetting(arrowStylingField)
  view.addSubview(arrowStylingField)

  // Label: Arrow Style Info
  let arrowStyleInfoLabel = alertLabel("Add layer style to your document that will contain $arrow name and you will be able to specify it here ", false, -1, viewHeight-80, 300, 40)
  view.addSubview(arrowStyleInfoLabel)


  // Label: Arrow Type
  let arrowTypeLabel = alertLabel("Arrow Type", true, -1, viewHeight-130, 280, 40)
  view.addSubview(arrowTypeLabel)

  // Select: Arrow Type
  let arrowTypeField = NSPopUpButton.alloc().initWithFrame(NSMakeRect(-2, viewHeight - 130, 300, 20));
  setActiveTypeSetting(arrowTypeField)
  view.addSubview(arrowTypeField)

  // Label: Arrow Type Info
  let arrowTypeInfoLabel = alertLabel("Select one of the arrow types. Angled is used by default", false, -1, viewHeight-170, 300, 40)
  view.addSubview(arrowTypeInfoLabel)


  // Label: Arrow Spacing
  let arrowSpacingLabel = alertLabel("Arrow Spacing", true, -1, viewHeight - 200, 330, 20)
  view.addSubview(arrowSpacingLabel)

  // Label: Arrow Spacing PX
  let arrowSpacingPxLabel = alertLabel("px", true, 90, viewHeight - 220, 330, 20)
  view.addSubview(arrowSpacingPxLabel)

  // Input: Arrow Spacing
  let arrowSpacingField = NSTextField.alloc().initWithFrame(NSMakeRect(-2, viewHeight - 220, 80, 20))
  var formatter = NSNumberFormatter.alloc().init().autorelease()
  arrowSpacingField.setStringValue(String(Settings.settingForKey("arrowSpacing")))
  arrowSpacingField.setFormatter(formatter)
  view.addSubview(arrowSpacingField)

  // Stepper: Arrow Spacing
  let arrowSpacingStepper = NSStepper.alloc().initWithFrame(NSMakeRect(70, viewHeight - 220, 20, 20));
  arrowSpacingStepper.setMaxValue(1000)
  arrowSpacingStepper.setMinValue(0)
  arrowSpacingStepper.setValueWraps(false)
  arrowSpacingStepper.setAutorepeat(true)
  arrowSpacingStepper.setCOSJSTargetFunction(function(sender){
    var value = 0 + sender.integerValue()
    arrowSpacingField.setStringValue(String(value))
  })
  
  view.addSubview(arrowSpacingStepper)
  // view.addSubview(formatter)
  
  // Label: Auto Spacing Info
  let arrowSpacingInfoLabel = alertLabel("The second layer will be moved closer based on the value provided here. Keep it 0 if you don't want to have auto spacing feature ", false, -1, viewHeight-285, 300, 60)
  view.addSubview(arrowSpacingInfoLabel)

  // Label: Other Settings
  let otherSettingsLabel = alertLabel("Other Settings", true, -1, viewHeight-330, 280, 40)
  view.addSubview(otherSettingsLabel)

  // Checkbox: Auto-Align
  let checkbox = alertCheckbox("Second layer auto-align", false, -1, viewHeight-340, 260, 40)
  view.addSubview(checkbox)

  // Label: Auto-Align Info
  let autoAlignInfoLabel = alertLabel("Align the second layer for 5px misalignment with the first one", false, -1, viewHeight-370, 280, 40)
  view.addSubview(autoAlignInfoLabel)

  // Label: Plugin Info
  let pluginInfoLabel = alertLabel("Made by @faridSabitov with the support of EPAM.com ❤️", true, -1, viewHeight-420, 280, 40)
  view.addSubview(pluginInfoLabel)


  // Need to check if style is still available

  // Show modal and get the results
  let modalResponse = alert.runModal()

  if(modalResponse == NSAlertFirstButtonReturn){
    // When user clicks on "Update Settings"
    // Need to save all this results into the Plugin Settings
    context.command.setValue_forKey_onLayer_forPluginIdentifier(alert.views()[0].subviews()[1].title(), "arrowStyle", docData, pluginKey)
    Settings.setSettingForKey("arrowType", alert.views()[0].subviews()[4].title())
    Settings.setSettingForKey("arrowSpacing", alert.views()[0].subviews()[8].intValue())
    Settings.setSettingForKey("autoAlign", alert.views()[0].subviews()[12].state())
    UI.message("Settings are updated 🚀")
  }
}

export function onLayersMoved(context) {
  sketch.UI.message("Please select more than two layers")
  const action = context.actionContext  
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

//
// Functions
//

function updateArrow(firstObjectID, secondObjectID, style, type, direction, lineID, conditionID, isCondition, connectionIndex) { // Refactored
  // Need to check if we have the layers with such IDs
  let firstObject = document.getLayerWithID(firstObjectID)
  let secondObject = document.getLayerWithID(secondObjectID)
  let conditionObject = document.getLayerWithID(conditionID)
  
  // Need to delete data first, because we will have a new line
  deleteLine(lineID)
  if(!isCondition && conditionObject){
    conditionObject.remove()
  }
  log(conditionID)

  newConnectionsData = deleteConnectionFromData(connectionIndex)

  if(firstObject && secondObject){
    // If we have all the objects, we can recreate the line
    createArrow(firstObjectID, secondObjectID, style, type, direction, isCondition)
  } 
}

function createArrow(firstObjectID, secondObjectID, style, type, direction, isCondition) {  // Refactored
  let localDirection = direction == "Auto" ? getDirection(firstObjectID, secondObjectID) : direction

  // Main Operations based on the settings
  updateSpacing(firstObjectID, secondObjectID, localDirection)
  autoAlignLayer(firstObjectID, secondObjectID, localDirection)

  // Making an Arrow 
  let arrow = drawConnection(firstObjectID, secondObjectID, style, type, direction, isCondition)
  
  // Storage for current connection
  let connection = {
    firstObject : firstObjectID,
    secondObject : secondObjectID,
    style : arrow.style,
    condition : arrow.conditionID,
    type : arrow.type,
    direction: localDirection,
    line : arrow.line.objectID()
  }

  // Need to save this data to the global array
  newConnectionsData.push(connection)
}

function checkForGroup(groupName) { // refactored
  let currentGroup = null

  // Checking all the groups that we have
  for(let i = 0; i < currentParentGroup.layers().count(); i++){
    if(currentParentGroup.layers()[i].name() == groupName) {
      currentGroup = currentParentGroup.layers()[i]
    } 
  }

  return currentGroup
}

function getDirection(firstObjectID, secondObjectID){ // Refactored
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
      direction = diffX > diffY ? "Down" : "Right"
    } else {
      // Top quarter
      direction = absDiffX > absDiffY ? "Right" : "Up"
    }
  } else {
    // Left Half
    if(secondObjectMidY > firstObjectMidY){
      // Bottom quarter
      direction = absDiffX > absDiffY ? "Left" : "Down"
    } else {
      // Top quarter
      direction = diffX > diffY ? "Left" : "Up"
    }
  }

  return direction
}

function drawConnection(firstObjectID, secondObjectID, style, type, localDirection, condition){ // Refactored
  // Process of creating new connection  
  let localType = type == null ? Settings.settingForKey("arrowType") : type
  let firstObject = document.getLayerWithID(firstObjectID)
  let secondObject = document.getLayerWithID(secondObjectID)
  let connectionPos = getConnectionPos(firstObject, secondObject, localDirection)
  let connection = {
    line: [], 
    conditionID: [],
    type: [],
    style: []
  }
  
  // Type  
  if(localType == "Angled" || localType == null){ connection.line = drawAngledLine(connectionPos.firstLayerPosX, connectionPos.firstLayerPosY, connectionPos.middlePosX, connectionPos.middlePosY, connectionPos.secondLayerPosX, connectionPos.secondLayerPosY, localDirection)}
  if(localType == "Straight"){ connection.line = drawStraightLine(connectionPos.firstLayerPosX, connectionPos.firstLayerPosY, connectionPos.secondLayerPosX, connectionPos.secondLayerPosY, localDirection)}
  if(localType == "Curved"){ connection.line = drawCurvedLine(connectionPos.firstLayerPosX, connectionPos.firstLayerPosY, connectionPos.secondLayerPosX, connectionPos.secondLayerPosY, localDirection)}

  // Condition
  connection.conditionID = condition != false ? connection.conditionID = addCondition("#con", connectionPos.middlePosX, connectionPos.middlePosY) : connection.conditionID = null

  // Style
  connection.style = styleLine(connection.line, style)

  // Add to group
  addToArrowsGroup(connection.line)

  return connection
}

function addToArrowsGroup(line){
  let currentGroup = checkForGroup("Arrows")
  log("Arr "+line)
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
    currentGroup = checkForGroup("Arrows")
    currentGroup.fixGeometryWithOptions(1)
  }
}

function addToConditionGroup(condition){
  let currentGroup = checkForGroup("Conditions") 
  log("Con "+condition)
  if(currentGroup){
    currentGroup.addLayers([condition])
    currentGroup.fixGeometryWithOptions(1)
  } else {
    // If we don't have a group
    let Group = require('sketch/dom').Group
    let group = new Group({
      parent: currentParentGroup,
      name: 'Conditions',
      layers: [condition]
    })
    // Moving this group to the bottom of the page
    group.moveToBack()
    group.adjustToFit()
    currentGroup = checkForGroup("Conditions") 
    // log("g "+group)
    log("Cg "+currentGroup)
    
    currentGroup.fixGeometryWithOptions(1)
  }
}

function getConnectionsData(){ //Refactored
  let dataArray = []
  
  if(pluginData){
    for (let i = 0; i < pluginData.length; i ++) {
      dataArray.push(pluginData[i])
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

      if(firstObjectID == data[y].firstObject || firstObjectID == data[y].secondObject){
        // if we found that we have this object in connection database already
        if(secondObjectID == data[y].firstObject || secondObjectID == data[y].secondObject){
          // if we found that we have this object in connection database already
          arrayNumber = y
        } 
      }
    }
  }
  return arrayNumber
}

function setActiveStyleSetting(arrowStylingField){
  let docSettings = context.command.valueForKey_onLayer_forPluginIdentifier("arrowStyle", docData, pluginKey)
  let styles = getLayerStyles(null)

  if(docSettings){
    // We have info about the settings in the current document
    
    if(docSettings != "Default Style") {
      // if user specified own option
      arrowStylingField.addItemWithTitle(docSettings)
      arrowStylingField.addItemWithTitle("Default Style")
      for(let i = 0; i < styles.length; i++){
        if(styles[i].name() != docSettings){
          arrowStylingField.addItemWithTitle(styles[i].name())
        }
      }

    } else {
      // Need to show the default first
      arrowStylingField.addItemWithTitle("Default Style")
      for(let i = 0; i < styles.length; i++){
        arrowStylingField.addItemWithTitle(styles[i].name())
      }
    }
  } else {
    arrowStylingField.addItemWithTitle("Default Style")
    for(let i = 0; i < styles.length; i++){
      arrowStylingField.addItemWithTitle(styles[i].name())
    }
  }
}

function setActiveTypeSetting(arrowTypeField){
  let docTypeSettings = Settings.settingForKey("arrowType")  


  if(docTypeSettings){
    // We have info about the settings in the current document
    
    if(docTypeSettings == "Angled"){
      arrowTypeField.addItemWithTitle("Angled")
      arrowTypeField.lastItem().setState(1)
      arrowTypeField.addItemWithTitle("Curved")
      arrowTypeField.lastItem().setState(0)
      arrowTypeField.addItemWithTitle("Straight")
      arrowTypeField.lastItem().setState(0)
    } 

    if(docTypeSettings == "Curved"){
      arrowTypeField.addItemWithTitle("Curved")
      arrowTypeField.lastItem().setState(1)
      arrowTypeField.addItemWithTitle("Straight")
      arrowTypeField.lastItem().setState(0)
      arrowTypeField.addItemWithTitle("Angled")
      arrowTypeField.lastItem().setState(0)
    } 

    if(docTypeSettings == "Straight"){
      arrowTypeField.addItemWithTitle("Straight")
      arrowTypeField.lastItem().setState(1)
      arrowTypeField.addItemWithTitle("Angled")
      arrowTypeField.lastItem().setState(0)
      arrowTypeField.addItemWithTitle("Curved")
      arrowTypeField.lastItem().setState(0)
    } 
  } else {
    // Show default
    arrowTypeField.addItemWithTitle("Angled")
    arrowTypeField.addItemWithTitle("Curved")
    arrowTypeField.addItemWithTitle("Straight")
  }

}

function deleteConnectionFromData(connectionIndex){ // Refactored
  let newConnections = []
  if(pluginData){
    // If we have database
    let connections = pluginData

    for (let i = 0; i < connections.length; i ++) {
      // Updating all connections without deleted one
      if(i != connectionIndex){
        newConnections.push(connections[i])
      }
    }
  }
  return newConnections
}

function deleteLine(lineID){ // refactored
  let lineObject = document.getLayerWithID(lineID)
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

  if(Settings.settingForKey("arrowSpacing") && Settings.settingForKey("arrowSpacing") != 0){
    let currentSpacing = Settings.settingForKey("arrowSpacing")
    
    if(direction == "Right"){
      childObject.frame.x = sourceObject.frame.x + sourceObject.frame.width + currentSpacing
    }
  
    if(direction == "Down"){
      childObject.frame.y = sourceObject.frame.y + sourceObject.frame.height + currentSpacing
    }
  
    if(direction == "Left"){
      childObject.frame.x = sourceObject.frame.x - childObject.frame.width - currentSpacing
    }
  
    if(direction == "Up"){
      childObject.frame.y = sourceObject.frame.y - childObject.frame.height - currentSpacing
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

function defineSourceObject(firstObjectID, secondObjectID, direction){ //Refactored
  let firstObject = document.getLayerWithID(firstObjectID)
  let secondObject = document.getLayerWithID(secondObjectID)
  let sourceObjectID

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

function getSourceObjectFromSelection(selection, direction){ //Refactored
  let sourceObjectID = selection.firstObject().objectID()
  
  if(direction != "Auto"){
    for(let g = 0; g < selection.count(); g++) {
      sourceObjectID = defineSourceObject(sourceObjectID, selection[g].objectID(), direction)
    }
  }
 
  return sourceObjectID
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

function getLayerStyles(name) { // Refactored
  let allStyles = docData.allLayerStyles()
  let keyword = "$arrow"
  let styles = []

  for(let i = 0; i < allStyles.count(); i++){
    if(name == null) {
      if(allStyles[i].name().includes(keyword)){styles.push(allStyles[i])}
    } else {
      if(allStyles[i].name() == name){styles.push(allStyles[i])}
    }
  }
	return styles
}

function start(context, direction, isCondition){
  let selection = context.selection

  if(selection.count() > 1 && selection[0].class() != "MSArtboardGroup"){
    // Need to find source object by ID first
    let sourceObjectID = getSourceObjectFromSelection(selection, direction)
    let currentConnectionsData = newConnectionsData // Need to refactor

    for(let g = 0; g < selection.count(); g++) {
      if(selection[g].objectID() != sourceObjectID){
        // Then need to create or update connection arrow with each selection
        let connectionIndex = findConnectionData(sourceObjectID, selection[g].objectID(), currentConnectionsData)
        
        if(connectionIndex == null){
          // There is no connection with this two objects in our database
          createArrow(sourceObjectID, selection[g].objectID(), null, null, direction, isCondition)
          sketch.UI.message("New connection is created 🚀")
        } else {
          // Need to remake the arrow condition
          updateArrow(sourceObjectID, selection[g].objectID(), null, null, direction, currentConnectionsData[connectionIndex].line, currentConnectionsData[connectionIndex].condition, isCondition, connectionIndex)
          sketch.UI.message("Current connection is updated 🤘")
        }
      }
    }
    context.command.setValue_forKey_onLayer_forPluginIdentifier(newConnectionsData, "arrowConnections", docData, pluginKey)
  } else {
    // When user didn't select anything
    sketch.UI.message("Please select more than two layers. Artboards are coming soon 🥳")
  }
}

function addCondition(keyword, x, y){ // Refactored
  let libraries = sketch.getLibraries()
  let conditionObject, symbolReferences

  for(let g = 0; g < libraries.length; g++) {
    symbolReferences = libraries[g].getImportableSymbolReferencesForDocument(document)

    for(let i = 0; i < symbolReferences.length; i++) {
      if(symbolReferences[i].name.includes(keyword)){
        conditionObject = symbolReferences[i]
      }
    }
  }

  if(conditionObject == null){
    UI.alert('Condition symbol is not found', 'If you would like to add arrows with specific conditions, you need to specify them in your libraries. You can download the library that works well with the plugin by going into Plugins -> Connection Arrows -> Get Free Library. Conditions are taken from the library based on their names. Make sure to name symbol as "#condition" so it will be added here')
  } else {
    let symbolMaster = conditionObject.import()
    let instance = symbolMaster.createNewInstance()
    instance.parent = currentParentGroup
    addToConditionGroup(instance)
    instance.frame.x = x - instance.frame.width / 2 
    instance.frame.y = y - instance.frame.height / 2
  }

  return conditionObject.id
}

function getConnectionPos(firstObject, secondObject, direction){ // Refactored

  let firstObjectAbsPos = firstObject.frame.changeBasis({from: firstObject.parent, to: currentParentGroup})
  let secondObjectAbsPos = secondObject.frame.changeBasis({from: secondObject.parent, to: currentParentGroup})
  let currentGroup = checkForGroup("Arrows") 
  let diffX, diffY

  if(currentGroup){
    diffX = currentGroup.frame().x()
    diffY = currentGroup.frame().y()
  } else {
    diffX = 0
    diffY = 0
  }

  let connectionPos = {
    firstLayerPosX: null, 
    firstLayerPosY: null, 
    secondLayerPosX: null, 
    secondLayerPosY: null, 
    middlePosX: null, 
    middlePosY: null
  }

  // Getting all the positions
  if(direction == "Up"){
    // First Layer Position Start Point Position
    connectionPos.firstLayerPosX = firstObjectAbsPos.x+firstObjectAbsPos.width/2-diffX
    connectionPos.firstLayerPosY = firstObjectAbsPos.y-diffY

    // Second Layer Position End Point Position
    connectionPos.secondLayerPosX = secondObjectAbsPos.x+secondObjectAbsPos.width/2-diffX
    connectionPos.secondLayerPosY = secondObjectAbsPos.y+secondObjectAbsPos.height-diffY

    // Middle Points
    connectionPos.middlePosX = (connectionPos.firstLayerPosX + connectionPos.secondLayerPosX)/2
    connectionPos.middlePosY = (connectionPos.firstLayerPosY + connectionPos.secondLayerPosY)/2
  }

  if(direction == "Right"){
    // First Layer Position Start Point Position
    connectionPos.firstLayerPosX = firstObjectAbsPos.x+firstObjectAbsPos.width-diffX
    connectionPos.firstLayerPosY = firstObjectAbsPos.y+firstObjectAbsPos.height/2-diffY

    // Second Layer Position End Point Position
    connectionPos.secondLayerPosX = secondObjectAbsPos.x-diffX
    connectionPos.secondLayerPosY = secondObjectAbsPos.y+secondObjectAbsPos.height/2-diffY
    
    // Middle Points
    connectionPos.middlePosX = (connectionPos.firstLayerPosX + connectionPos.secondLayerPosX)/2
    connectionPos.middlePosY = (connectionPos.firstLayerPosY + connectionPos.secondLayerPosY)/2
  }

  if(direction == "Down"){
    // First Layer Position Start Point Position
    connectionPos.firstLayerPosX = firstObjectAbsPos.x+firstObjectAbsPos.width/2-diffX
    connectionPos.firstLayerPosY = firstObjectAbsPos.y+firstObjectAbsPos.height-diffY

    // Second Layer Position End Point Position
    connectionPos.secondLayerPosX = secondObjectAbsPos.x+secondObjectAbsPos.width/2-diffX
    connectionPos.secondLayerPosY = secondObjectAbsPos.y-diffY

    // Middle Points
    connectionPos.middlePosX = (connectionPos.firstLayerPosX + connectionPos.secondLayerPosX)/2
    connectionPos.middlePosY = (connectionPos.firstLayerPosY + connectionPos.secondLayerPosY)/2
  }

  if(direction == "Left"){
    // First Layer Position Start Point Position
    connectionPos.firstLayerPosX = firstObjectAbsPos.x-diffX
    connectionPos.firstLayerPosY = firstObjectAbsPos.y+firstObjectAbsPos.height/2-diffY

    // Second Layer Position End Point Position
    connectionPos.secondLayerPosX = secondObjectAbsPos.x+secondObjectAbsPos.width-diffX
    connectionPos.secondLayerPosY = secondObjectAbsPos.y+secondObjectAbsPos.height/2-diffY

    // Middle Points
    connectionPos.middlePosX = (connectionPos.firstLayerPosX + connectionPos.secondLayerPosX)/2
    connectionPos.middlePosY = (connectionPos.firstLayerPosY + connectionPos.secondLayerPosY)/2
  }

  return connectionPos
}

function drawStraightLine(firstLayerPosX, firstLayerPosY, secondLayerPosX, secondLayerPosY, direction){ // Refactored
  let path = NSBezierPath.bezierPath()
  
  if(direction == "Up"){
    path.moveToPoint(NSMakePoint(firstLayerPosX,firstLayerPosY))
    path.lineToPoint(NSMakePoint(secondLayerPosX,secondLayerPosY))
  }

  if(direction == "Right"){
    path.moveToPoint(NSMakePoint(firstLayerPosX,firstLayerPosY))
    path.lineToPoint(NSMakePoint(secondLayerPosX,secondLayerPosY))
  }

  if(direction == "Down"){
    path.moveToPoint(NSMakePoint(firstLayerPosX,firstLayerPosY))
    path.lineToPoint(NSMakePoint(secondLayerPosX,secondLayerPosY))
  }

  if(direction == "Left"){
    path.moveToPoint(NSMakePoint(firstLayerPosX,firstLayerPosY))
    path.lineToPoint(NSMakePoint(secondLayerPosX,secondLayerPosY))
  }

  let line = MSShapeGroup.layerWithPath(MSPath.pathWithBezierPath(path))
  line.setName("Straight Arrow")

  return line
}

function drawAngledLine(firstLayerPosX, firstLayerPosY, middlePosX, middlePosY, secondLayerPosX, secondLayerPosY, direction){ // Refactored
  let path = NSBezierPath.bezierPath()

  if(direction == "Up"){
    // Connecting points
    path.moveToPoint(NSMakePoint(firstLayerPosX, firstLayerPosY))
    path.lineToPoint(NSMakePoint(firstLayerPosX, middlePosY))
    path.lineToPoint(NSMakePoint(secondLayerPosX, middlePosY))
    path.lineToPoint(NSMakePoint(secondLayerPosX, secondLayerPosY))
  }

  if(direction == "Right"){
    // Connecting points
    path.moveToPoint(NSMakePoint(firstLayerPosX, firstLayerPosY))
    path.lineToPoint(NSMakePoint(middlePosX, firstLayerPosY))
    path.lineToPoint(NSMakePoint(middlePosX, secondLayerPosY))
    path.lineToPoint(NSMakePoint(secondLayerPosX, secondLayerPosY))
  }

  if(direction == "Down"){
    // Connecting points
    path.moveToPoint(NSMakePoint(firstLayerPosX, firstLayerPosY))
    path.lineToPoint(NSMakePoint(firstLayerPosX, middlePosY))
    path.lineToPoint(NSMakePoint(secondLayerPosX, middlePosY))
    path.lineToPoint(NSMakePoint(secondLayerPosX, secondLayerPosY))
  }

  if(direction == "Left"){
    // Connecting points
    path.moveToPoint(NSMakePoint(firstLayerPosX, firstLayerPosY))
    path.lineToPoint(NSMakePoint(middlePosX, firstLayerPosY))
    path.lineToPoint(NSMakePoint(middlePosX, secondLayerPosY))
    path.lineToPoint(NSMakePoint(secondLayerPosX, secondLayerPosY))
  }

  let line = MSShapeGroup.layerWithPath(MSPath.pathWithBezierPath(path))
  let points = line.layers().firstObject().points()
  points[1].cornerRadius = 20
  points[2].cornerRadius = 20
  line.setName("Angled Arrow")

  return line
}

function drawCurvedLine(firstLayerPosX, firstLayerPosY, secondLayerPosX, secondLayerPosY, direction){ // Refactored
  let path = NSBezierPath.bezierPath()
  let line

  if(direction == "Up"){
    // Connecting points
    path.moveToPoint(NSMakePoint(firstLayerPosX,firstLayerPosY))
    path.lineToPoint(NSMakePoint(secondLayerPosX,secondLayerPosY))

    // Painting the line
    line = MSShapeGroup.layerWithPath(MSPath.pathWithBezierPath(path))
    let points = line.layers().firstObject().points()

    points[0].curveMode = points[1].curveMode = 4
    points[0].hasCurveFrom = points[1].hasCurveTo = true

    if(firstLayerPosX<secondLayerPosX){
      points[0].curveFrom = {x: 0, y: 0.5}
      points[0].curveTo = {x: -0.5,y:1}

      points[1].curveFrom = {x: 1,y: 1}
      points[1].curveTo = {x: 1,y: 0.5}
    } else {
      points[0].curveFrom = {x: 1, y: 0.5}
      points[0].curveTo = {x: -0.5,y:1}

      points[1].curveFrom = {x: 1,y: 1}
      points[1].curveTo = {x: 0,y: 0.5}
    }
  }

  if(direction == "Right"){
    // Connecting points
    path.moveToPoint(NSMakePoint(firstLayerPosX,firstLayerPosY))
    path.lineToPoint(NSMakePoint(secondLayerPosX,secondLayerPosY))

    // Painting the line
    line = MSShapeGroup.layerWithPath(MSPath.pathWithBezierPath(path))
    let points = line.layers().firstObject().points()

    points[0].curveMode = points[1].curveMode = 4
    points[0].hasCurveFrom = points[1].hasCurveTo = true

    if(firstLayerPosY<secondLayerPosY){
      points[0].curveFrom = {x: 0.5, y: 0}
      points[0].curveTo = {x: -0.5,y:1}

      points[1].curveFrom = {x: 1,y: 1}
      points[1].curveTo = {x: 0.5,y: 1}
    } else {
      points[0].curveFrom = {x: 0.5, y: 1}
      points[0].curveTo = {x: -0.5,y:1}

      points[1].curveFrom = {x: 1,y: 1}
      points[1].curveTo = {x: 0.5,y: 0}
    }
  }

  if(direction == "Down"){
    // Connecting points
    path.moveToPoint(NSMakePoint(firstLayerPosX,firstLayerPosY))
    path.lineToPoint(NSMakePoint(secondLayerPosX,secondLayerPosY))

    // Painting the line
    line = MSShapeGroup.layerWithPath(MSPath.pathWithBezierPath(path))
    let points = line.layers().firstObject().points()

    points[0].curveMode = points[1].curveMode = 4
    points[0].hasCurveFrom = points[1].hasCurveTo = true

    if(firstLayerPosX<secondLayerPosX){
      points[0].curveFrom = {x: 0, y: 0.5}
      points[0].curveTo = {x: -0.5,y:1}

      points[1].curveFrom = {x: 1,y: 1}
      points[1].curveTo = {x: 1,y: 0.5}
    } else {
      points[0].curveFrom = {x: 1, y: 0.5}
      points[0].curveTo = {x: -0.5,y:1}

      points[1].curveFrom = {x: 1,y: 1}
      points[1].curveTo = {x: 0,y: 0.5}
    }
  }

  if(direction == "Left"){
    // Connecting points
    path.moveToPoint(NSMakePoint(firstLayerPosX,firstLayerPosY))
    path.lineToPoint(NSMakePoint(secondLayerPosX,secondLayerPosY))

    // Painting the line
    line = MSShapeGroup.layerWithPath(MSPath.pathWithBezierPath(path))
    let points = line.layers().firstObject().points()

    points[0].curveMode = points[1].curveMode = 4
    points[0].hasCurveFrom = points[1].hasCurveTo = true

    if(firstLayerPosY<secondLayerPosY){
      points[0].curveFrom = {x: 0.5, y: 0}
      points[0].curveTo = {x: -0.5,y:1}

      points[1].curveFrom = {x: 1,y: 1}
      points[1].curveTo = {x: 0.5,y: 1}
    } else {
      points[0].curveFrom = {x: 0.5, y: 1}
      points[0].curveTo = {x: -0.5,y:1}

      points[1].curveFrom = {x: 1,y: 1}
      points[1].curveTo = {x: 0.5,y: 0}
    }
  }

  // Providing Settings for the arrow
  line.setName("Curved Arrow")

  return line
}

function styleLine(line, style){ // Refactored
  let localStyle
  
  if(style != null){ 
    // For updates
    if(getLayerStyles(style) != null && style != "Default Style"){
      // If style is specified
      localStyle = style
      let ownStyle = getLayerStyles(style)
      line.sharedStyle = ownStyle[0]
    } else {
      // if there is no specific style
      localStyle = "Default Style"
      let border = line.style().addStylePartOfType(1)
      border.color = MSColor.colorWithRGBADictionary({r: 0.89, g: 0.89, b: 0.89, a: 1})
      border.thickness = 2
      line.style().endMarkerType = 2
    }
  } else {
    // For creating new
    if(context.command.valueForKey_onLayer_forPluginIdentifier("arrowStyle", docData, pluginKey) != null && context.command.valueForKey_onLayer_forPluginIdentifier("arrowStyle", docData, pluginKey) != "Default Style"){
      // we have settins almost all the time and it's not default
      localStyle = getLayerStyles(context.command.valueForKey_onLayer_forPluginIdentifier("arrowStyle", docData, pluginKey))
      line.sharedStyle = localStyle[0]
      localStyle = localStyle[0].name()
    } else {
      localStyle = "Default Style"
      let border = line.style().addStylePartOfType(1)
      border.color = MSColor.colorWithRGBADictionary({r: 0.89, g: 0.89, b: 0.89, a: 1})
      border.thickness = 2
      line.style().endMarkerType = 2
    } 
  }

  return localStyle
}





