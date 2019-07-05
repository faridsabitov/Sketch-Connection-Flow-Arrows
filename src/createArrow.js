import sketch from 'sketch';
import { drawConnection } from "./draw.js";

var Settings = require('sketch/settings');
let document = sketch.fromNative(context.document);

// Main Function

export function createArrow(firstObjectID, secondObjectID, style, type, direction, conditionID, isCondition) {  // Refactored
  let localDirection = direction == "Auto" ? getDirection(firstObjectID, secondObjectID) : direction;

  // Main Operations based on the settings
  updateSpacing(firstObjectID, secondObjectID, localDirection);
  autoAlignLayer(firstObjectID, secondObjectID, localDirection);

  // Making an Arrow 
  let arrow = drawConnection(firstObjectID, secondObjectID, style, type, localDirection, conditionID, isCondition);
  
  // Storage for current connection
  let connection = {
    firstObject : firstObjectID,
    secondObject : secondObjectID,
    style : arrow.style,
    condition : arrow.conditionID,
    isCondition : isCondition,
    type : arrow.type,
    direction: localDirection,
    line : arrow.line.objectID()
  }
  return connection;
}

function getDirection(firstObjectID, secondObjectID){ // Refactored
  // Get direction from the source object
  const firstObject = document.getLayerWithID(firstObjectID);
  const secondObject = document.getLayerWithID(secondObjectID);
  const firstObjectMidX = firstObject.frame.x+firstObject.frame.width/2;
  const firstObjectMidY = firstObject.frame.y+firstObject.frame.height/2;
  const secondObjectMidX = secondObject.frame.x+secondObject.frame.width/2;
  const secondObjectMidY = secondObject.frame.y+secondObject.frame.height/2;

  const diffX = firstObjectMidX - secondObjectMidX;
  const diffY = firstObjectMidY - secondObjectMidY;
  const absDiffX = Math.abs(diffX);
  const absDiffY = Math.abs(diffY);
  let direction;

  if(secondObjectMidX > firstObjectMidX){
    // Right Half
    if(secondObjectMidY > firstObjectMidY){
      // Bottom quarter
      direction = diffX > diffY ? "Down" : "Right";
    } else {
      // Top quarter
      direction = absDiffX > absDiffY ? "Right" : "Up";
    }
  } else {
    // Left Half
    if(secondObjectMidY > firstObjectMidY){
      // Bottom quarter
      direction = absDiffX > absDiffY ? "Left" : "Down";
    } else {
      // Top quarter
      direction = diffX > diffY ? "Left" : "Up";
    }
  }

  return direction;
}

function updateSpacing(sourceObjectID, childObjectID, direction){
  let sourceObject = document.getLayerWithID(sourceObjectID);
  let childObject = document.getLayerWithID(childObjectID);

  if(Settings.settingForKey("arrowSpacing") && Settings.settingForKey("arrowSpacing") != 0){
    let currentSpacing = Settings.settingForKey("arrowSpacing");
    
    if(direction == "Right"){
      childObject.frame.x = sourceObject.frame.x + sourceObject.frame.width + currentSpacing;
    }
  
    if(direction == "Down"){
      childObject.frame.y = sourceObject.frame.y + sourceObject.frame.height + currentSpacing;
    }
  
    if(direction == "Left"){
      childObject.frame.x = sourceObject.frame.x - childObject.frame.width - currentSpacing;
    }
  
    if(direction == "Up"){
      childObject.frame.y = sourceObject.frame.y - childObject.frame.height - currentSpacing;
    }
  }
}

function autoAlignLayer(sourceObjectID, childObjectID, direction){
  let sourceObject = document.getLayerWithID(sourceObjectID);
  let childObject = document.getLayerWithID(childObjectID);
  let sourceMidY, childMidY, sourceMidX, childMidX, diff;

  if(Settings.settingForKey("autoAlign")){
    if(Settings.settingForKey("autoAlign") == true){
      // If user turned on Auto-Align settings
      
      if(direction == "Right" || direction == "Left"){
        sourceMidY = sourceObject.frame.y + sourceObject.frame.height/2;
        childMidY = childObject.frame.y + childObject.frame.height/2;
        diff = sourceMidY - childMidY;
        if(diff > -6 && diff < 6){childObject.frame.y = childObject.frame.y + diff;}
      }
    
      if(direction == "Down" || direction == "Up"){
        sourceMidX = sourceObject.frame.x + sourceObject.frame.width/2;
        childMidX = childObject.frame.x + childObject.frame.width/2;
        diff = sourceMidX - childMidX;
        if(diff > -6 && diff < 6){childObject.frame.x = childObject.frame.x + diff;}
      }
    }
  }
}