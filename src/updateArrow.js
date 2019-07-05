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