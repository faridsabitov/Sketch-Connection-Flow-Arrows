//
//  Variables
//

import sketch from 'sketch';
import { createArrow } from "./createArrow.js";
import { updateArrow } from "./updateArrow.js";
import { getSourceObjectFromSelection } from "./utilities/getSourceObject.js"
import { getConnectionsData, deleteConnectionFromData } from "./utilities/data.js"
import { deleteLine } from "./utilities/lines.js"
import { deleteCondition } from "./utilities/conditions.js";

let UI = require('sketch/ui') ;
var Settings = require('sketch/settings');

const pluginKey = "flowArrows";

let document = sketch.fromNative(context.document);
let docData = context.document.documentData();
// let pluginData = context.command.valueForKey_onLayer_forPluginIdentifier("arrowConnections", docData, pluginKey);
// let currentParentGroup = docData.currentPage().currentArtboard() || docData.currentPage();
let connectionsData = getConnectionsData(docData);


  
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

function create(context, direction, isCondition){
  let selection = context.selection;

  if(selection.count() > 1 && selection[0].class() != "MSArtboardGroup"){
    let sourceObjectID = getSourceObjectFromSelection(selection, direction);
    let connectionIndex = []
    for(let g = 0; g < selection.count(); g++) {
      if(selection[g].objectID() != sourceObjectID){

        let firstObjectID = String(sourceObjectID);
        let secondObjectID = String(selection[g].objectID());
        let create = true
        let index

        if(connectionsData.length > 0){
          for (let y = 0; y < connectionsData.length; y++) {
            if ((firstObjectID == connectionsData[y].firstObject || firstObjectID == connectionsData[y].secondObject) && (secondObjectID == connectionsData[y].firstObject || secondObjectID == connectionsData[y].secondObject)) {
              // We have this connection and need to update
              create = false;
              index = y;
              connectionIndex.push(y);
            }
          }
        } 
  
        if(create){
          // Create
          let connection = createArrow(firstObjectID, secondObjectID, null, null, direction, null, isCondition, document, docData);
          connectionsData.push(connection);
          sketch.UI.message("New connection is created 🚀");
        } else {
          // Update
          deleteLine(connectionsData[index].line, document);
          if (!isCondition) { 
            deleteCondition(connectionsData[index].condition, document) 
          }

          let connection = createArrow(firstObjectID, secondObjectID, null, null, direction, connectionsData[index].condition, isCondition, document, docData);
          connectionsData.push(connection);
          sketch.UI.message("Current connection is updated 🤘");
        }
      }
    }
    if(connectionIndex.length > 0){
      // Update data if there was changes
      connectionsData = deleteConnectionFromData(connectionIndex, connectionsData);
    }
    context.command.setValue_forKey_onLayer_forPluginIdentifier(connectionsData, "arrowConnections", docData, pluginKey);
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
  
    if (level == 3) {
      if(isUpdate){
        newConnectionsData = updateArrow(connectionsData[i].firstObject, connectionsData[i].secondObject, connectionsData[i].style, connectionsData[i].type, connectionsData[i].direction, connectionsData[i].line, connectionsData[i].condition, i);
        sketch.UI.message("All arrows are updated");
      } else {
        for (let i = 0; i < connectionsData.length; i++) {
          deleteLine(connectionsData[i].line, document);
          deleteCondition(connectionsData[i].condition, document) 
          newConnectionsData = null;
        }
      }
    }
    if (level == 2) {


      if(isUpdate){
        // Need to update
      } else {
        for (let i = 0; i < connectionsData.length; i++) {
          if(selection[0].class() == "MSArtboardGroup") {
            firstObjectArtboard = document.getLayerWithID(connectionsData[i].firstObject);
            firstObjectArtboard = firstObjectArtboard.sketchObject.parentArtboard().objectID();
            if(firstObjectArtboard == selection[0].objectID()){
              deleteLine(connectionsData[i].line, document);
              deleteCondition(connectionsData[i].condition, document);
            } else {
              newConnectionsData.push(connectionsData[i]);
            }
          } else {
            sketch.UI.message("Please select an artboard");
          }
        }
      }
    }
    if (level == 1) {
      if(isUpdate){
        // updateArrow(connectionsData[i].firstObject, connectionsData[i].secondObject, connectionsData[i].style, connectionsData[i].type, connectionsData[i].direction, connectionsData[i].line, connectionsData[i].condition, i);
        // sketch.UI.message("All arrows are updated");
      } else {
        for (let i = 0; i < connectionsData.length; i++) {
          if((selection[0].objectID() == String(connectionsData[i].firstObject)) || (selection[0].objectID() == String(connectionsData[i].secondObject))) {
            if((selection[1].objectID() == String(connectionsData[i].firstObject)) || (selection[1].objectID() == String(connectionsData[i].secondObject))) {
              deleteLine(connectionsData[i].line, document);
              deleteCondition(connectionsData[i].condition, document);
            } else {
              newConnectionsData.push(connectionsData[i]);
            }
          } else {
            newConnectionsData.push(connectionsData[i]);
          }
        }
        sketch.UI.message("All arrows are deleted");
      }
    }
    sketch.UI.message("All arrows are updated 🚀");
      
    
    // let connection = createArrow(sourceObjectID, selection[g].objectID(), null, null, direction, null, isCondition, document, docData);
    // connectionsData.push(connection);
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





