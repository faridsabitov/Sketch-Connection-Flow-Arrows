import sketch from 'sketch';
let document = sketch.fromNative(context.document);


export function getSourceObjectFromSelection(selection, direction){
  let sourceObjectID = selection.firstObject().objectID();
  
  if(direction != "Auto"){
    for(let g = 0; g < selection.count(); g++) {
      sourceObjectID = defineSourceObject(sourceObjectID, selection[g].objectID(), direction);
    }
  }
  return sourceObjectID;
}

function defineSourceObject(firstObjectID, secondObjectID, direction){ //Refactored
  let firstObject = document.getLayerWithID(firstObjectID);
  let secondObject = document.getLayerWithID(secondObjectID);
  let sourceObjectID;

  if(direction == "Right"){
    if(firstObject.frame.x <= secondObject.frame.x){
      sourceObjectID = firstObject.id;
    } else {
      sourceObjectID = secondObject.id;
    }
  }

  if(direction == "Down"){
    if(firstObject.frame.y <= secondObject.frame.y){
      sourceObjectID = firstObject.id;
    } else {
      sourceObjectID = secondObject.id;
    }
  }

  if(direction == "Left"){
    if(firstObject.frame.x <= secondObject.frame.x){
      sourceObjectID = secondObject.id;
    } else {
      sourceObjectID = firstObject.id;
    }
  }

  if(direction == "Up"){
    if(firstObject.frame.y <= secondObject.frame.y){
      sourceObjectID = secondObject.id;
    } else {
      sourceObjectID = firstObject.id;
    }
  }

  return sourceObjectID;
}