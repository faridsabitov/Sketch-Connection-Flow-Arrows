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


export function createAutoArrow(context){create(context, "Auto", false);}
export function createRightArrow(context){create(context, "Right", false);}
export function createDownArrow(context){create(context, "Down", false);}
export function createLeftArrow(context){create(context, "Left", false);}
export function createUpArrow(context){create(context, "Up", false);}

export function createRightArrowWithCondition(context){create(context, "Right", true);}
export function createDownArrowWithCondition(context){create(context, "Down", true);}
export function createLeftArrowWithCondition(context){create(context, "Left", true);}
export function createUpArrowWithCondition(context){create(context, "Up", true);}

export function autoUpdateSelectedArrows(context) {  
  // const action = context.actionContext;

  // docData = action.document.documentData();
  // pluginData = context.command.valueForKey_onLayer_forPluginIdentifier("arrowConnections", docData, pluginKey);
  // currentParentGroup = docData.currentPage().currentArtboard() || docData.currentPage(); // TODO: Might be a problem for multiple artboards
  // newConnectionsData = getConnectionsData();

  // const movedLayers = Array.from(context.actionContext.layers).map(layer => sketch.fromNative(layer));
  // log(movedLayers[0].id);
  // log(movedLayers.length);

  // // if (movedLayers.filter(layer => (layer.type == 'Artboard' || (layer.type == 'SymbolMaster' && config.arrangeSymbols))).length > 0) {
  // //   ArrangeArtboards(context)
  // // }

  // let currentConnectionsData = newConnectionsData; // Need to refactor

  // for(let g = 0; g < movedLayers.length; g++) {

  //   let connectionIndex = findConnectionIndex(movedLayers[0].id, null, currentConnectionsData);

  //   log("yes "+connectionIndex);
  //   if(connectionIndex.length == 0){
      
  //     updateArrow(currentConnectionsData[connectionIndex[0]].firstObject, currentConnectionsData[connectionIndex[0]].secondObject, currentConnectionsData[connectionIndex[0]].style, currentConnectionsData[connectionIndex[0]].type, currentConnectionsData[connectionIndex[0]].direction, currentConnectionsData[connectionIndex[0]].line, currentConnectionsData[connectionIndex[0]].condition, currentConnectionsData[connectionIndex[0]].isCondition, connectionIndex[0]);
  //     sketch.UI.message("Current connection is updated 🤘");
  //   } else {
  //     sketch.UI.message("There is no connection between selected layers on the plugin data");
  //   }
    
  // }
  // context.command.setValue_forKey_onLayer_forPluginIdentifier(newConnectionsData, "arrowConnections", docData, pluginKey);
}

  
//
//  Update Connection Function
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

export function updateArtboardArrows(context) {update(context, 2, false);}

export function updateAllArrows(context) {update(context, 3, true);}

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

export function deleteAllArrows(context) {update(context, 3, false);}





  // let selection = context.selection;
  // if(selection.count() > 1 && selection[0].class() != "MSArtboardGroup"){
  //   // Need to find source object by ID first
  //   let currentConnectionsData = newConnectionsData; // Need to refactor

  //   for(let g = 0; g < selection.count(); g++) {
  //     if(selection[g].objectID() != selection[0].objectID()){
  //       // Then need to create or update connection arrow with each selection
  //       let connectionIndex = findConnectionIndex(selection[0].objectID(), selection[g].objectID(), currentConnectionsData);

  //       if(connectionIndex.length == 0){
  //         updateArrow(currentConnectionsData[connectionIndex].firstObject, currentConnectionsData[connectionIndex].secondObject, currentConnectionsData[connectionIndex].style, currentConnectionsData[connectionIndex].type, currentConnectionsData[connectionIndex].direction, currentConnectionsData[connectionIndex].line, currentConnectionsData[connectionIndex].condition, currentConnectionsData[connectionIndex].isCondition, connectionIndex);
  //         sketch.UI.message("Current connection is updated 🤘");
  //       } else {
  //         sketch.UI.message("There is no connection between selected layers on the plugin data");
  //       }
  //     }
  //   }
  //   context.command.setValue_forKey_onLayer_forPluginIdentifier(newConnectionsData, "arrowConnections", docData, pluginKey);
    
  // } else {
  //   // When user didn't select anything
  //   sketch.UI.message("Please select more than two layers. Artboards are coming soon 🥳");
  // }


//
//  Data
//

function getConnectionsData(){ //Refactored
  let dataArray = [];
  
  if(pluginData){
    for (let i = 0; i < pluginData.length; i ++) {
      dataArray.push(pluginData[i]);
    }
  } 
  return dataArray;
}


//
// Functions
//

import { createArrow } from "./createArrow.js";
import { updateArrow } from "./updateArrow.js";
import { update } from "./updateArrow.js";


function create(context, direction, isCondition){
  //cc:create#1;Passing all the data
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
          if(updateArrow(sourceObjectID, selection[g].objectID(), null, null, direction, currentConnectionsData[connectionIndex].line, currentConnectionsData[connectionIndex].condition, isCondition, connectionIndex)){
            createArrow(sourceObjectID, selection[g].objectID(), null, null, direction, currentConnectionsData[connectionIndex].condition, isCondition);
          }
          sketch.UI.message("Current connection is updated 🤘");
        }
      }
    }
  } else {
    // When user didn't select anything
    sketch.UI.message("Please select more than two layers. Artboards are coming soon 🥳");
  }
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


// const track = require("sketch-module-google-analytics")
// track("UA-138226597-1", "event", {
//   ec: "command", 
//   ea: "create", 
//   ev: "my-command"
// });





