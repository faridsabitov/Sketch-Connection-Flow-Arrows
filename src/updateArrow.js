import sketch from 'sketch';

let UI = require('sketch/ui') ;
var Settings = require('sketch/settings');

const pluginKey = "flowArrows";
let document;

let docData, pluginData, currentParentGroup, connectionsData;

document = sketch.fromNative(context.document);
docData = context.document.documentData();
pluginData = context.command.valueForKey_onLayer_forPluginIdentifier("arrowConnections", docData, pluginKey);
currentParentGroup = docData.currentPage().currentArtboard() || docData.currentPage(); // TODO: Might be a problem for multiple artboards
connectionsData = getConnectionsData();



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

export function updateArrow(firstObjectID, secondObjectID, style, type, direction, lineID, conditionID, isCondition, connectionIndex) { // Refactored
  // Need to check if we have the layers with such IDs
  let firstObject = document.getLayerWithID(firstObjectID);
  let secondObject = document.getLayerWithID(secondObjectID);
  let conditionObject = document.getLayerWithID(conditionID);
  let result = false;
  
  // Need to delete data first, because we will have a new line
  deleteLine(lineID);
  if(conditionID && !isCondition){
    if(conditionObject){conditionObject.remove();}
  }
  
  connectionsData = deleteConnectionFromData(connectionIndex);

  if(firstObject && secondObject){
    // If we have all the objects, we can recreate the line
    result = true;
  }

  return result;
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

function getConnectionsData(){ //Refactored
    let dataArray = [];
    
    if(pluginData){
      for (let i = 0; i < pluginData.length; i ++) {
        dataArray.push(pluginData[i]);
      }
    } 
    return dataArray;
}