import sketch from 'sketch';
import { getConnectionsData, deleteConnectionFromData} from "./utilities/data.js"
import { deleteLine } from "./utilities/lines.js"

let UI = require('sketch/ui') ;
var Settings = require('sketch/settings');
const pluginKey = "flowArrows";
let document = sketch.fromNative(context.document);
let docData = context.document.documentData();
let pluginData = context.command.valueForKey_onLayer_forPluginIdentifier("arrowConnections", docData, pluginKey);
let currentParentGroup = docData.currentPage().currentArtboard() || docData.currentPage(); // TODO: Might be a problem for multiple artboards
let connectionsData = getConnectionsData(docData);



export function updateArrow(firstObjectID, secondObjectID, style, type, direction, lineID, conditionID, isCondition, connectionIndex) {
  let firstObject = document.getLayerWithID(firstObjectID);
  let secondObject = document.getLayerWithID(secondObjectID);
  let conditionObject = document.getLayerWithID(conditionID);
  let connection = [];

  deleteLine(lineID);

  if(conditionID && !isCondition){
    if(conditionObject){conditionObject.remove();}
  }
  
  connectionsData = deleteConnectionFromData(connectionIndex);

  if(firstObject && secondObject){
    connection = createArrow(
      connectionsData[connectionIndex[x]].firstObject, 
      connectionsData[connectionIndex[x]].secondObject, 
      connectionsData[connectionIndex[x]].style,
      connectionsData[connectionIndex[x]].type, 
      connectionsData[connectionIndex[x]].direction, 
      connectionsData[connectionIndex[x]].condition, 
      connectionsData[connectionIndex[x]].isCondition,
      document, 
      docData
    );
  }

  return connection;
}