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

  if (pluginData) {
    // If we have database, need to check for connections
    for (let y = 0; y < data.length; y++) {
      if (
        firstObjectID == data[y].firstObject ||
        firstObjectID == data[y].secondObject
      ) {
        if (secondObjectID == null) {
          // When we need to find connection between two objects
          if (
            secondObjectID == data[y].firstObject ||
            secondObjectID == data[y].secondObject
          ) {
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
