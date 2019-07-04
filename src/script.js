//
//  Variables
//

import sketch from 'sketch';


let UI = require('sketch/ui') ;
var Settings = require('sketch/settings');

const pluginKey = "flowArrows";
let document;

let docData, pluginData, currentParentGroup, newConnectionsData;
if(context.document){
  //cc:remember place
  document = sketch.fromNative(context.document);
  docData = context.document.documentData();
  pluginData = context.command.valueForKey_onLayer_forPluginIdentifier("arrowConnections", docData, pluginKey);
  currentParentGroup = docData.currentPage().currentArtboard() || docData.currentPage(); // TODO: Might be a problem for multiple artboards
  newConnectionsData = getConnectionsData();
} else {
  document = sketch.fromNative(context.actionContext.document);
  //cc:here is bug;well, seems like a bug in logic
}
  
//
//  Create Connection Function
//


export function createAutoArrow(context){start(context, "Auto", false);}
export function createRightArrow(context){start(context, "Right", false);}
export function createDownArrow(context){start(context, "Down", false);}
export function createLeftArrow(context){start(context, "Left", false);}
export function createUpArrow(context){start(context, "Up", false);}

export function createRightArrowWithCondition(context){start(context, "Right", true);}
export function createDownArrowWithCondition(context){start(context, "Down", true);}
export function createLeftArrowWithCondition(context){start(context, "Left", true);}
export function createUpArrowWithCondition(context){start(context, "Up", true);}

//
// Plugin Commands
//

export function updateSelectedArrows(context) {
  let selection = context.selection;

  if(selection.count() > 1 && selection[0].class() != "MSArtboardGroup"){
    // Need to find source object by ID first
    let currentConnectionsData = newConnectionsData; // Need to refactor

    for(let g = 0; g < selection.count(); g++) {
      if(selection[g].objectID() != selection[0].objectID()){
        // Then need to create or update connection arrow with each selection
        let connectionIndex = findConnectionIndex(selection[0].objectID(), selection[g].objectID(), currentConnectionsData);

        if(connectionIndex.length == 0){
          updateArrow(currentConnectionsData[connectionIndex].firstObject, currentConnectionsData[connectionIndex].secondObject, currentConnectionsData[connectionIndex].style, currentConnectionsData[connectionIndex].type, currentConnectionsData[connectionIndex].direction, currentConnectionsData[connectionIndex].line, currentConnectionsData[connectionIndex].condition, currentConnectionsData[connectionIndex].isCondition, connectionIndex);
          sketch.UI.message("Current connection is updated 🤘");
        } else {
          sketch.UI.message("There is no connection between selected layers on the plugin data");
        }
      }
    }
    context.command.setValue_forKey_onLayer_forPluginIdentifier(newConnectionsData, "arrowConnections", docData, pluginKey);
    
  } else {
    // When user didn't select anything
    sketch.UI.message("Please select more than two layers. Artboards are coming soon 🥳");
  }
}

export function autoUpdateSelectedArrows(context) {  
  const action = context.actionContext;

  docData = action.document.documentData();
  pluginData = context.command.valueForKey_onLayer_forPluginIdentifier("arrowConnections", docData, pluginKey);
  currentParentGroup = docData.currentPage().currentArtboard() || docData.currentPage(); // TODO: Might be a problem for multiple artboards
  newConnectionsData = getConnectionsData();

  const movedLayers = Array.from(context.actionContext.layers).map(layer => sketch.fromNative(layer));
  log(movedLayers[0].id);
  log(movedLayers.length);

  // if (movedLayers.filter(layer => (layer.type == 'Artboard' || (layer.type == 'SymbolMaster' && config.arrangeSymbols))).length > 0) {
  //   ArrangeArtboards(context)
  // }

  let currentConnectionsData = newConnectionsData; // Need to refactor

  for(let g = 0; g < movedLayers.length; g++) {

    let connectionIndex = findConnectionIndex(movedLayers[0].id, null, currentConnectionsData);

    log("yes "+connectionIndex);
    if(connectionIndex.length == 0){
      
      updateArrow(currentConnectionsData[connectionIndex[0]].firstObject, currentConnectionsData[connectionIndex[0]].secondObject, currentConnectionsData[connectionIndex[0]].style, currentConnectionsData[connectionIndex[0]].type, currentConnectionsData[connectionIndex[0]].direction, currentConnectionsData[connectionIndex[0]].line, currentConnectionsData[connectionIndex[0]].condition, currentConnectionsData[connectionIndex[0]].isCondition, connectionIndex[0]);
      sketch.UI.message("Current connection is updated 🤘");
    } else {
      sketch.UI.message("There is no connection between selected layers on the plugin data");
    }
    
  }
  context.command.setValue_forKey_onLayer_forPluginIdentifier(newConnectionsData, "arrowConnections", docData, pluginKey);
}


export function updateArtboardArrows(context) {
  // TODO: Need to show amount of updated arrows and deleted ones
  let selection = context.selection;
  let connections = getConnectionsData();
  let firstObjectArtboard;
  let secondObjectArtboard;
  
  if(connections.length > 0){
    // We have connections in database
    const updateArrowsCounter = connections.length;
    for (let i = 0; i < updateArrowsCounter; i ++) {
      // Need to check if the element is selected globally or from the artboard
      firstObjectArtboard = document.getLayerWithID(connections[i].firstObject);
      firstObjectArtboard = firstObjectArtboard.sketchObject.parentArtboard().objectID();

      secondObjectArtboard = document.getLayerWithID(connections[i].secondObject);
      secondObjectArtboard = secondObjectArtboard.sketchObject.parentArtboard().objectID();

      if(selection.count() == 1 && selection[0].class() == "MSArtboardGroup"){
        // Need to go through each connection and update arrow position for specific artboard
        
        if (firstObjectArtboard == selection[0].objectID()){
          if (secondObjectArtboard == selection[0].objectID()){
            updateArrow(connections[i].firstObject, connections[i].secondObject, connections[i].style, connections[i].type, connections[i].direction, connections[i].line, connections[i].condition, i);
          } else {newConnectionsData.push(connections[i])}
        } else {
          // If not just saving it
          newConnectionsData.push(connections[i]);
        }
      }
    }
    context.command.setValue_forKey_onLayer_forPluginIdentifier(newConnectionsData, "arrowConnections", docData, pluginKey);
    sketch.UI.message("All arrows are updated 🚀");
  } else {
    // We don't have any connections to update
    sketch.UI.message("There is nothing to update");
  }
}

export function updateAllArrows(context) { // TODO
  // TODO: Need to show amount of updated arrows and deleted ones
  let currentConnectionsData = newConnectionsData;
  if(currentConnectionsData.length > 0){
    // We have connections in database
    const updateArrowsCounter = currentConnectionsData.length;
    for (let i = 0; i < updateArrowsCounter; i ++) {
      // Need to go through each connection and update arrow position without artboards
      // Need to check if current object don't have the parrent
      updateArrow(currentConnectionsData[i].firstObject, currentConnectionsData[i].secondObject, currentConnectionsData[i].style, currentConnectionsData[i].type, currentConnectionsData[i].direction, currentConnectionsData[i].line, currentConnectionsData[i].condition, i);
    }
    context.command.setValue_forKey_onLayer_forPluginIdentifier(newConnectionsData, "arrowConnections", docData, pluginKey);
    sketch.UI.message("All arrows are updated 🚀");
  } else {
    // We don't have any connections to update
    sketch.UI.message("There is nothing to update");
  }
}

export function deleteAllArrows(context) {

  if(newConnectionsData.length > 0){
    // We have connections in database
    for (let i = 0; i < newConnectionsData.length; i ++) {
      // Need to go through each connection and update arrow position
      deleteLine(newConnectionsData[i].line);
    }
    context.command.setValue_forKey_onLayer_forPluginIdentifier(null, "arrowConnections", docData, pluginKey);
    sketch.UI.message("All arrows are deleted");
  } else {
    // We don't have any connections to update
    sketch.UI.message("There is nothing to delete");
  }
}

export function deleteArtboardArrows(context) {
  let selection = context.selection;
  let firstObject, secondObject;

  // Need to delete all the arrows only from selected artboard
  if(selection.count() == 1 && selection[0].class() == "MSArtboardGroup"){
    let connections = getConnectionsData();
    
    if(connections.length > 0){
      // We have connections in database
      const updateArrowsCounter = connections.length;
      for (let i = 0; i < updateArrowsCounter; i ++) {
        // Need to go through each connection and check if it placed on selected artboard
        firstObject = document.getLayerWithID(connections[i].firstObject);
        secondObject = document.getLayerWithID(connections[i].secondObject);
        if (firstObject.sketchObject.parentArtboard().objectID() == selection[0].objectID()){
          if (secondObject.sketchObject.parentArtboard().objectID() == selection[0].objectID()){
            deleteLine(connections[i].line);
            newConnectionsData = deleteConnectionFromData(i);
          }
        }
      }
      context.command.setValue_forKey_onLayer_forPluginIdentifier(newConnectionsData, "arrowConnections", docData, pluginKey);
      sketch.UI.message("All arrows from selected artboard are deleted");
    } else {
      // We don't have any connections to update
      sketch.UI.message("There is nothing to delete");
    }
  } else {
    sketch.UI.message("Please select one artboard");
  }
}

export function deleteSelectedArrows(context) {
  let selection = context.selection;
  let firstObject, secondObject;

  if(selection.count() == 2){

    for(let g = 0; g < selection.count(); g++) {

      if(selection[g].objectID() != selection[0].objectID()){ // It will never check 3rd connection
        
        let connections = getConnectionsData() ;
        let connectionIndex = findConnectionIndex(selection[0].objectID(), selection[g].objectID(), connections);
        
        if(connectionIndex != null){
          // We have connections in database
          deleteLine(connections[connectionIndex].line);
          newConnectionsData = deleteConnectionFromData(connectionIndex);
          const updateArrowsCounter = connections.length;
          for (let i = 0; i < updateArrowsCounter; i ++) {
            // Need to go through each connection and check if it placed on selected artboard
            firstObject = document.getLayerWithID(connections[i].firstObject);
            secondObject = document.getLayerWithID(connections[i].secondObject);
            if(firstObject.sketchObject.parentArtboard().objectID() == selection[0].objectID()){
              if(secondObject.sketchObject.parentArtboard().objectID() == selection[0].objectID()){
                deleteLine(connections[i].line);
                newConnectionsData = deleteConnectionFromData(i);
              }
            }
          }
          context.command.setValue_forKey_onLayer_forPluginIdentifier(newConnectionsData, "arrowConnections", docData, pluginKey);
          sketch.UI.message("All arrows from selected layers are deleted ✌️");
        }
      }
    }
  } else {
    sketch.UI.message("Select two layers, please 🧐");
  }
}


//
// Functions
//

import { drawConnection } from "./draw.js";

function updateArrow(firstObjectID, secondObjectID, style, type, direction, lineID, conditionID, isCondition, connectionIndex) { // Refactored
  // Need to check if we have the layers with such IDs
  let firstObject = document.getLayerWithID(firstObjectID);
  let secondObject = document.getLayerWithID(secondObjectID);
  let conditionObject = document.getLayerWithID(conditionID);
  
  // Need to delete data first, because we will have a new line
  deleteLine(lineID);
  if(conditionID && !isCondition){
    if(conditionObject){conditionObject.remove();}
  }
  
  newConnectionsData = deleteConnectionFromData(connectionIndex);

  if(firstObject && secondObject){
    // If we have all the objects, we can recreate the line
    createArrow(firstObjectID, secondObjectID, style, type, direction, conditionID, isCondition);
  } 
}

function createArrow(firstObjectID, secondObjectID, style, type, direction, conditionID, isCondition) {  // Refactored
  let localDirection = direction == "Auto" ? getDirection(firstObjectID, secondObjectID) : direction;

  // Main Operations based on the settings
  updateSpacing(firstObjectID, secondObjectID, localDirection);
  autoAlignLayer(firstObjectID, secondObjectID, localDirection);

  // Making an Arrow 
  let arrow = drawConnection(firstObjectID, secondObjectID, style, type, localDirection, conditionID, isCondition);
  
  // Storage for current connection
  let connection = {
    firstObject : firstObjectID,
    secondObject : secondObjectID,
    style : arrow.style,
    condition : arrow.conditionID,
    isCondition : isCondition,
    type : arrow.type,
    direction: localDirection,
    line : arrow.line.objectID()
  }

  // Need to save this data to the global array
  newConnectionsData.push(connection);
}

function getDirection(firstObjectID, secondObjectID){ // Refactored
  // Get direction from the source object
  const firstObject = document.getLayerWithID(firstObjectID);
  const secondObject = document.getLayerWithID(secondObjectID);
  const firstObjectMidX = firstObject.frame.x+firstObject.frame.width/2;
  const firstObjectMidY = firstObject.frame.y+firstObject.frame.height/2;
  const secondObjectMidX = secondObject.frame.x+secondObject.frame.width/2;
  const secondObjectMidY = secondObject.frame.y+secondObject.frame.height/2;

  const diffX = firstObjectMidX - secondObjectMidX;
  const diffY = firstObjectMidY - secondObjectMidY;
  const absDiffX = Math.abs(diffX);
  const absDiffY = Math.abs(diffY);
  let direction;

  if(secondObjectMidX > firstObjectMidX){
    // Right Half
    if(secondObjectMidY > firstObjectMidY){
      // Bottom quarter
      direction = diffX > diffY ? "Down" : "Right";
    } else {
      // Top quarter
      direction = absDiffX > absDiffY ? "Right" : "Up";
    }
  } else {
    // Left Half
    if(secondObjectMidY > firstObjectMidY){
      // Bottom quarter
      direction = absDiffX > absDiffY ? "Left" : "Down";
    } else {
      // Top quarter
      direction = diffX > diffY ? "Left" : "Up";
    }
  }

  return direction;
}

function getConnectionsData(){ //Refactored
  let dataArray = [];
  
  if(pluginData){
    for (let i = 0; i < pluginData.length; i ++) {
      dataArray.push(pluginData[i]);
    }
  } 
  return dataArray;
}

function findConnectionIndex(firstObjectID, secondObjectID, data){
  let indexArray = []  ;
  firstObjectID = String(firstObjectID);
  secondObjectID = String(secondObjectID);
  
  if(pluginData){
    // If we have database, need to check for connections
    for(let y = 0; y < data.length; y++){
      if(firstObjectID == data[y].firstObject || firstObjectID == data[y].secondObject){
        if(secondObjectID == null){
          // When we need to find connection between two objects
          if(secondObjectID == data[y].firstObject || secondObjectID == data[y].secondObject){
            indexArray[0] = y;
          } 
        } else {
          // When we need to find a connection for one object only
          indexArray.push(y);
        }
      }
    }
  }
  return indexArray;
}

function deleteConnectionFromData(connectionIndex){ // Refactored
  let newConnections = [];
  if(pluginData){
    // If we have database
    let connections = pluginData;

    for (let i = 0; i < connections.length; i ++) {
      // Updating all connections without deleted one
      if(i != connectionIndex){
        newConnections.push(connections[i]);
      }
    }
  }
  return newConnections;
}

function deleteLine(lineID){ // refactored
  let lineObject = document.getLayerWithID(lineID);
  let selectedGroup;
  if(lineObject){
    selectedGroup = lineObject.parent;
    lineObject.remove();
    if(selectedGroup.layers.length == 0){
      selectedGroup.remove();
    }
  }
}

function updateSpacing(sourceObjectID, childObjectID, direction){
  let sourceObject = document.getLayerWithID(sourceObjectID);
  let childObject = document.getLayerWithID(childObjectID);

  if(Settings.settingForKey("arrowSpacing") && Settings.settingForKey("arrowSpacing") != 0){
    let currentSpacing = Settings.settingForKey("arrowSpacing");
    
    if(direction == "Right"){
      childObject.frame.x = sourceObject.frame.x + sourceObject.frame.width + currentSpacing;
    }
  
    if(direction == "Down"){
      childObject.frame.y = sourceObject.frame.y + sourceObject.frame.height + currentSpacing;
    }
  
    if(direction == "Left"){
      childObject.frame.x = sourceObject.frame.x - childObject.frame.width - currentSpacing;
    }
  
    if(direction == "Up"){
      childObject.frame.y = sourceObject.frame.y - childObject.frame.height - currentSpacing;
    }
  }
}

function autoAlignLayer(sourceObjectID, childObjectID, direction){
  let sourceObject = document.getLayerWithID(sourceObjectID);
  let childObject = document.getLayerWithID(childObjectID);
  let sourceMidY, childMidY, sourceMidX, childMidX, diff;

  if(Settings.settingForKey("autoAlign")){
    if(Settings.settingForKey("autoAlign") == true){
      // If user turned on Auto-Align settings
      
      if(direction == "Right" || direction == "Left"){
        sourceMidY = sourceObject.frame.y + sourceObject.frame.height/2;
        childMidY = childObject.frame.y + childObject.frame.height/2;
        diff = sourceMidY - childMidY;
        if(diff > -6 && diff < 6){childObject.frame.y = childObject.frame.y + diff;}
      }
    
      if(direction == "Down" || direction == "Up"){
        sourceMidX = sourceObject.frame.x + sourceObject.frame.width/2;
        childMidX = childObject.frame.x + childObject.frame.width/2;
        diff = sourceMidX - childMidX;
        if(diff > -6 && diff < 6){childObject.frame.x = childObject.frame.x + diff;}
      }
    }
  }
}

function defineSourceObject(firstObjectID, secondObjectID, direction){ //Refactored
  let firstObject = document.getLayerWithID(firstObjectID);
  let secondObject = document.getLayerWithID(secondObjectID);
  let sourceObjectID;

  if(direction == "Right"){
    if(firstObject.frame.x <= secondObject.frame.x){
      sourceObjectID = firstObject.id;
    } else {
      sourceObjectID = secondObject.id;
    }
  }

  if(direction == "Down"){
    if(firstObject.frame.y <= secondObject.frame.y){
      sourceObjectID = firstObject.id;
    } else {
      sourceObjectID = secondObject.id;
    }
  }

  if(direction == "Left"){
    if(firstObject.frame.x <= secondObject.frame.x){
      sourceObjectID = secondObject.id;
    } else {
      sourceObjectID = firstObject.id;
    }
  }

  if(direction == "Up"){
    if(firstObject.frame.y <= secondObject.frame.y){
      sourceObjectID = secondObject.id;
    } else {
      sourceObjectID = firstObject.id;
    }
  }

  return sourceObjectID;
}

function getSourceObjectFromSelection(selection, direction){ //Refactored
  let sourceObjectID = selection.firstObject().objectID();
  
  if(direction != "Auto"){
    for(let g = 0; g < selection.count(); g++) {
      sourceObjectID = defineSourceObject(sourceObjectID, selection[g].objectID(), direction);
    }
  }
 
  return sourceObjectID;
}

function start(context, direction, isCondition){
  //cc:start#1;Passing all the data
  let selection = context.selection;

  if(selection.count() > 1 && selection[0].class() != "MSArtboardGroup"){
    // Need to find source object by ID first
    let sourceObjectID = getSourceObjectFromSelection(selection, direction);
    let currentConnectionsData = newConnectionsData; // Need to refactor

    for(let g = 0; g < selection.count(); g++) {
      if(selection[g].objectID() != sourceObjectID){
        // Then need to create or update connection arrow with each selection
        let connectionIndex = findConnectionIndex(sourceObjectID, selection[g].objectID(), currentConnectionsData);
        
        if(connectionIndex.length == 0){
          // There is no connection with this two objects in our database
          createArrow(sourceObjectID, selection[g].objectID(), null, null, direction, null, isCondition);
          sketch.UI.message("New connection is created 🚀");
        } else {
          // Need to remake the arrow condition
          updateArrow(sourceObjectID, selection[g].objectID(), null, null, direction, currentConnectionsData[connectionIndex].line, currentConnectionsData[connectionIndex].condition, isCondition, connectionIndex);
          sketch.UI.message("Current connection is updated 🤘");
        }
      }
    }
    context.command.setValue_forKey_onLayer_forPluginIdentifier(newConnectionsData, "arrowConnections", docData, pluginKey);
  } else {
    // When user didn't select anything
    sketch.UI.message("Please select more than two layers. Artboards are coming soon 🥳");
  }
}


// const track = require("sketch-module-google-analytics")
// track("UA-138226597-1", "event", {
//   ec: "command", 
//   ea: "start", 
//   ev: "my-command"
// });





