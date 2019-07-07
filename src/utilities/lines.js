import sketch from 'sketch';
let document = sketch.fromNative(context.document);

export function deleteLine(lineID){
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
