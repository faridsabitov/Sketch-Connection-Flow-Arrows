import sketch from 'sketch';
let UI = require('sketch/ui');
const pluginKey = "flowArrows";
import { deleteLine } from "./utilities/lines.js"
import { createArrow } from "./createArrow.js";
import { getConnectionsData, deleteConnectionFromData } from "./utilities/data.js"



export function autoUpdateSelectedArrows(context) {
    let document = sketch.fromNative(context.actionContext.document)
    let action = context.actionContext
    let docData = action.document.documentData();

    let connectionsData = getConnectionsData(docData);

    
    const movedLayers = Array.from(context.actionContext.layers).map(layer => sketch.fromNative(layer))
    let firstObjectID = String(movedLayers[0].id);
    let connectionIndex = []

    if(connectionsData.length > 0){
        for (let y = 0; y < connectionsData.length; y++) {
            if (firstObjectID == connectionsData[y].firstObject || firstObjectID == connectionsData[y].secondObject) {
                connectionIndex.push(y);
            }
        }
    } 

    if(connectionIndex.length > 0){
        for (let x = 0; x < connectionIndex.length; x++) {
            deleteLine(connectionsData[connectionIndex[x]].line, document);
            let connection = createArrow(
                connectionsData[connectionIndex[x]].firstObject, 
                connectionsData[connectionIndex[x]].secondObject, 
                connectionsData[connectionIndex[x]].style,
                connectionsData[connectionIndex[x]].type, 
                connectionsData[connectionIndex[x]].direction, 
                connectionsData[connectionIndex[x]].conditionID, 
                connectionsData[connectionIndex[x]].isCondition,
                document, 
                docData
            );
            connectionsData.push(connection);
        }
    }

    if(connectionIndex.length > 0){
        connectionsData = deleteConnectionFromData(connectionIndex, connectionsData);
    }
    context.command.setValue_forKey_onLayer_forPluginIdentifier(connectionsData, "arrowConnections", docData, pluginKey);

}