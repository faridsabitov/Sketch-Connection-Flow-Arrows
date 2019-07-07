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

export function findConnectionIndex(sourceObjectID, selection, data) {
  let indexArray = [];
  if (data) {
    for (let g = 0; g < selection.count(); g++) {
      if (sourceObjectID != selection[g].objectID()) {

        let firstObjectID = String(sourceObjectID);
        let secondObjectID = String(selection[g].objectID());

        for (let y = 0; y < data.length; y++) {
          if (firstObjectID == data[y].firstObject || firstObjectID == data[y].secondObject) {
            if (secondObjectID == data[y].firstObject || secondObjectID == data[y].secondObject) {
              indexArray.push(y);
            }
          }
        }

      }
    }
  }
  return indexArray;
}

export function deleteConnectionFromData(connectionIndexArray, data){
  if(data){
    for (let i = connectionIndexArray.length -1; i >= 0; i--) {
      data.splice(connectionIndexArray[i],1);
    }
  }
  return data;
}
