import sketch from 'sketch';
let document = sketch.fromNative(context.document);
let docData = context.document.documentData();
let currentParentGroup = docData.currentPage().currentArtboard() || docData.currentPage();


export function getSourceObjectFromSelection(selection, direction){
  let sourceObjectID = selection.firstObject().objectID();
  
  if(direction != "Auto"){
    for(let g = 0; g < selection.count(); g++) {
      sourceObjectID = defineSourceObject(sourceObjectID, selection[g].objectID(), direction);
    }
  }
  return sourceObjectID;
}

function defineSourceObject(firstObjectID, secondObjectID, direction){
  
  let firstObject = document.getLayerWithID(firstObjectID);
  let secondObject = document.getLayerWithID(secondObjectID);
  let firstObjectAbsPos = firstObject.frame.changeBasis({from: firstObject.parent, to: currentParentGroup});
  let secondObjectAbsPos = secondObject.frame.changeBasis({from: secondObject.parent, to: currentParentGroup});
  let sourceObjectID;

  if(direction == "Right"){
    if(firstObjectAbsPos.x <= secondObjectAbsPos.x){ // We need to get the doc position
      sourceObjectID = firstObject.id;
    } else {
      sourceObjectID = secondObject.id;
    }
  }

  if(direction == "Down"){
    if(firstObject.y <= secondObjectAbsPos.y){
      sourceObjectID = firstObject.id;
    } else {
      sourceObjectID = secondObject.id;
    }
  }

  if(direction == "Left"){
    if(firstObjectAbsPos.x <= secondObjectAbsPos.x){
      sourceObjectID = secondObject.id;
    } else {
      sourceObjectID = firstObject.id;
    }
  }

  if(direction == "Up"){
    if(firstObjectAbsPos.y <= secondObjectAbsPos.y){
      sourceObjectID = secondObject.id;
    } else {
      sourceObjectID = firstObject.id;
    }
  }

  return sourceObjectID;
}