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
let connectionsData = getConnectionsData();



export function updateArrow(firstObjectID, secondObjectID, style, type, direction, lineID, conditionID, isCondition, connectionIndex) { // Refactored
  // Need to check if we have the layers with such IDs
  // let firstObject = document.getLayerWithID(firstObjectID);
  // let secondObject = document.getLayerWithID(secondObjectID);
  // let conditionObject = document.getLayerWithID(conditionID);
  // let result = false;
  
  // Need to delete data first, because we will have a new line
  // deleteLine(lineID);
  // if(conditionID && !isCondition){
  //   if(conditionObject){conditionObject.remove();}
  // }
  
  connectionsData = deleteConnectionFromData(connectionIndex);

  // if(firstObject && secondObject){
  //   // If we have all the objects, we can recreate the line
  //   result = true;
  // }

  // return result;
}