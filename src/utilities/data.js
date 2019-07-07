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

export function deleteConnectionFromData(connectionIndexArray, data){
  if(data){
    for (let i = connectionIndexArray.length -1; i >= 0; i--) {
      data.splice(connectionIndexArray[i],1);
    }
  }
  return data;
}
