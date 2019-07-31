import sketch from 'sketch';
let UI = require('sketch/ui');

export function deleteLine(lineID, document){
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
