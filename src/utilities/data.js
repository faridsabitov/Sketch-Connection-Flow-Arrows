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



export function getConnectionsData() {
  let dataArray = [];

  if (pluginData) {
    for (let i = 0; i < pluginData.length; i++) {
      dataArray.push(pluginData[i]);
    }
  }
  return dataArray;
}

export function findConnectionIndex(firstObjectID, secondObjectID, data) {
  let indexArray = [];
  firstObjectID = String(firstObjectID);
  secondObjectID = String(secondObjectID);

  if (data) {
    // If we have database, need to check for connections
    for (let y = 0; y < data.length; y++) {
      if (firstObjectID == data[y].firstObject || firstObjectID == data[y].secondObject) {
        // When we need to find connection between two objects
        if (secondObjectID == data[y].firstObject || secondObjectID == data[y].secondObject) {
          indexArray.push(y);
        }
      }
    }
  }
  return indexArray;
}

export function deleteConnectionFromData(connectionIndex){ // Refactored
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
