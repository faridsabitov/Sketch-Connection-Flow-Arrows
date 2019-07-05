//
//  Variables
//

import sketch from 'sketch';
import { createArrow } from "./createArrow.js";
import { updateArrow } from "./updateArrow.js";
import { getSourceObjectFromSelection } from "./utilities/getSourceObject.js"
import { getConnectionsData, findConnectionIndex } from "./utilities/data.js"

let UI = require('sketch/ui') ;
var Settings = require('sketch/settings');

const pluginKey = "flowArrows";
let document;

let docData, pluginData, currentParentGroup, connectionsData;
if(context.document){
  //cc:remember place
  document = sketch.fromNative(context.document);
  docData = context.document.documentData();
  pluginData = context.command.valueForKey_onLayer_forPluginIdentifier("arrowConnections", docData, pluginKey);
  currentParentGroup = docData.currentPage().currentArtboard() || docData.currentPage(); // TODO: Might be a problem for multiple artboards
  connectionsData = getConnectionsData();
} else {
  document = sketch.fromNative(context.actionContext.document);
  //cc:here is bug;well, seems like a bug in logic
}

  
//
//  Plugin Incoming Commands - Create 
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


function create(context, direction, isCondition){
  let selection = context.selection;

  if(selection.count() > 1 && selection[0].class() != "MSArtboardGroup"){

    let sourceObjectID = getSourceObjectFromSelection(selection, direction);

    for(let g = 0; g < selection.count(); g++) {
      if(selection[g].objectID() != sourceObjectID){
        let connectionIndex = findConnectionIndex(sourceObjectID, selection[g].objectID(), connectionsData);
        
        if(connectionIndex.length == 0){
          // Create
          let connection = createArrow(sourceObjectID, selection[g].objectID(), null, null, direction, null, isCondition);
          connectionsData.push(connection);
          context.command.setValue_forKey_onLayer_forPluginIdentifier(connectionsData, "arrowConnections", docData, pluginKey);
          sketch.UI.message("New connection is created 🚀");
        } else {
          // Update
          if(updateArrow(sourceObjectID, selection[g].objectID(), null, null, direction, connectionsData[connectionIndex].line, connectionsData[connectionIndex].condition, isCondition, connectionIndex)){
            createArrow(sourceObjectID, selection[g].objectID(), null, null, direction, connectionsData[connectionIndex].condition, isCondition);
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

  
//
//  Plugin Incoming Commands - Update and Delete
//

export function updateSelectedArrows(context) {update(context, 1, true);}
export function updateArtboardArrows(context) {update(context, 2, true);}
export function updateAllArrows(context) {update(context, 3, true);}
export function deleteSelectedArrows(context) {update(context, 1, false);}
export function deleteArtboardArrows(context) {update(context, 2, false);}
export function deleteAllArrows(context) {update(context, 3, false);}

export function update(context, level, isUpdate) {
  // 1 - selection level
  // 2 - artboard level
  // 3 - document level
  let newConnectionsData = [];
  let selection = context.selection;
  let firstObjectArtboard;
  let secondObjectArtboard;

  if (connectionsData.length > 0) {
      for (let i = 0; i < connectionsData.length; i++) {
          deleteLine(connectionsData[i].line);
          
          if (level == 3) {
              if(isUpdate){
                  updateArrow(connectionsData[i].firstObject, connectionsData[i].secondObject, connectionsData[i].style, connectionsData[i].type, connectionsData[i].direction, connectionsData[i].line, connectionsData[i].condition, i);
                  sketch.UI.message("All arrows are updated");
              } else {
                  newConnectionsData = null
                  sketch.UI.message("All arrows are deleted");
              }
          }
          if (level == 2) {
              firstObjectArtboard = document.getLayerWithID(connectionsData[i].firstObject);
              firstObjectArtboard = firstObjectArtboard.sketchObject.parentArtboard().objectID();
              secondObjectArtboard = document.getLayerWithID(connectionsData[i].secondObject);
              secondObjectArtboard = secondObjectArtboard.sketchObject.parentArtboard().objectID();

              if (selection.count() == 1 && selection[0].class() == "MSArtboardGroup") {

                  if (firstObjectArtboard == selection[0].objectID()) {
                      if (secondObjectArtboard == selection[0].objectID()) {
                          updateArrow(connectionsData[i].firstObject, connectionsData[i].secondObject, connectionsData[i].style, connectionsData[i].type, connectionsData[i].direction, connectionsData[i].line, connectionsData[i].condition, i);
                      } else {
                          newConnectionsData.push(connectionsData[i]);
                      }
                  } else {
                      newConnectionsData.push(connectionsData[i]);
                  }
              }
          }
          sketch.UI.message("All arrows are updated 🚀");
          
         
      }
      context.command.setValue_forKey_onLayer_forPluginIdentifier(newConnectionsData, "arrowConnections", docData, pluginKey);
  } else {
      sketch.UI.message("There is no arrows");
  }
}

// const track = require("sketch-module-google-analytics")
// track("UA-138226597-1", "event", {
//   ec: "command", 
//   ea: "create", 
//   ev: "my-command"
// });





