import sketch from 'sketch';
import { styleLine } from "./utilities/styling.js";
import { addCondition, updateCondition } from "./utilities/conditions.js";
import { checkForGroup, addToArrowsGroup } from "./utilities/groups.js";
let Settings = require('sketch/settings');
let UI = require('sketch/ui') ;

// let document = sketch.fromNative(context.document);
// let docData = context.document.documentData();
// let currentParentGroup = docData.currentPage().currentArtboard() || docData.currentPage();


// Main Function

export function drawConnection(firstObjectID, secondObjectID, style, type, localDirection, conditionID, isCondition, document, docData){ // Refactored
  // Process of creating new connection  
  let currentParentGroup = docData.currentPage().currentArtboard() || docData.currentPage();
  let firstObject = document.getLayerWithID(firstObjectID);
  let secondObject = document.getLayerWithID(secondObjectID);
  let connectionPos = getConnectionPos(firstObject, secondObject, localDirection, currentParentGroup);
  let connection = {
    line: [], 
    conditionID: [],
    type: [],
    style: []
  }

  // Type  
  connection.type = type == null ? Settings.settingForKey("arrowType") : type;
  if(connection.type == "Angled" || connection.type == null){ connection.line = drawAngledLine(connectionPos.firstLayerPosX, connectionPos.firstLayerPosY, connectionPos.middlePosX, connectionPos.middlePosY, connectionPos.secondLayerPosX, connectionPos.secondLayerPosY, localDirection);}
  if(connection.type == "Straight"){ connection.line = drawStraightLine(connectionPos.firstLayerPosX, connectionPos.firstLayerPosY, connectionPos.secondLayerPosX, connectionPos.secondLayerPosY, localDirection);}
  if(connection.type == "Curved"){ connection.line = drawCurvedLine(connectionPos.firstLayerPosX, connectionPos.firstLayerPosY, connectionPos.secondLayerPosX, connectionPos.secondLayerPosY, localDirection);}


  // Condition
  if(isCondition == true){
    if(document.getLayerWithID(conditionID)){
      connection.conditionID = updateCondition(conditionID, connectionPos.middlePosX, connectionPos.middlePosY, document, docData);
    } else {
      connection.conditionID = addCondition("#con", connectionPos.middlePosX, connectionPos.middlePosY, document, docData);
    }
  } else {
    connection.conditionID = null;
  }
 
  // Style
  connection.style = styleLine(connection.line, style, docData);

  // Add to group
  addToArrowsGroup(connection.line, currentParentGroup);
  
  return connection
}

// Positions

function getConnectionPos(firstObject, secondObject, direction, currentParentGroup){ // Refactored

    let firstObjectAbsPos = firstObject.frame.changeBasis({from: firstObject.parent, to: currentParentGroup});
    let secondObjectAbsPos = secondObject.frame.changeBasis({from: secondObject.parent, to: currentParentGroup});
    let currentGroup = checkForGroup("Arrows", currentParentGroup);
    let diffX, diffY;
  
    if(currentGroup){
      diffX = currentGroup.frame().x();
      diffY = currentGroup.frame().y();
    } else {
      diffX = 0;
      diffY = 0;
    }
  
    let connectionPos = {
      firstLayerPosX: null,
      firstLayerPosY: null, 
      secondLayerPosX: null, 
      secondLayerPosY: null, 
      middlePosX: null, 
      middlePosY: null
    }
  
    // Getting all the positions
    if(direction == "Up"){
      // First Layer Position Start Point Position
      connectionPos.firstLayerPosX = firstObjectAbsPos.x+firstObjectAbsPos.width/2-diffX;
      connectionPos.firstLayerPosY = firstObjectAbsPos.y-diffY;
  
      // Second Layer Position End Point Position
      connectionPos.secondLayerPosX = secondObjectAbsPos.x+secondObjectAbsPos.width/2-diffX;
      connectionPos.secondLayerPosY = secondObjectAbsPos.y+secondObjectAbsPos.height-diffY;
  
      // Middle Points
      connectionPos.middlePosX = (connectionPos.firstLayerPosX + connectionPos.secondLayerPosX)/2;
      connectionPos.middlePosY = (connectionPos.firstLayerPosY + connectionPos.secondLayerPosY)/2;
    }
  
    if(direction == "Right"){
      // First Layer Position Start Point Position
      connectionPos.firstLayerPosX = firstObjectAbsPos.x+firstObjectAbsPos.width-diffX;
      connectionPos.firstLayerPosY = firstObjectAbsPos.y+firstObjectAbsPos.height/2-diffY;
  
      // Second Layer Position End Point Position
      connectionPos.secondLayerPosX = secondObjectAbsPos.x-diffX;
      connectionPos.secondLayerPosY = secondObjectAbsPos.y+secondObjectAbsPos.height/2-diffY;
      
      // Middle Points
      connectionPos.middlePosX = (connectionPos.firstLayerPosX + connectionPos.secondLayerPosX)/2;
      connectionPos.middlePosY = (connectionPos.firstLayerPosY + connectionPos.secondLayerPosY)/2;
    }
  
    if(direction == "Down"){
      // First Layer Position Start Point Position
      connectionPos.firstLayerPosX = secondObjectAbsPos.x+secondObjectAbsPos.width/2-diffX;
      connectionPos.firstLayerPosY = secondObjectAbsPos.y+secondObjectAbsPos.height-diffY;
  
      // Second Layer Position End Point Position
      connectionPos.secondLayerPosX = firstObjectAbsPos.x+firstObjectAbsPos.width/2-diffX;
      connectionPos.secondLayerPosY = firstObjectAbsPos.y-diffY;
  
      // Middle Points
      connectionPos.middlePosX = (connectionPos.firstLayerPosX + connectionPos.secondLayerPosX)/2;
      connectionPos.middlePosY = (connectionPos.firstLayerPosY + connectionPos.secondLayerPosY)/2;
    }
  
    if(direction == "Left"){
      // First Layer Position Start Point Position
      connectionPos.firstLayerPosX = firstObjectAbsPos.x-diffX;
      connectionPos.firstLayerPosY = firstObjectAbsPos.y+firstObjectAbsPos.height/2-diffY;
  
      // Second Layer Position End Point Position
      connectionPos.secondLayerPosX = secondObjectAbsPos.x+secondObjectAbsPos.width-diffX;
      connectionPos.secondLayerPosY = secondObjectAbsPos.y+secondObjectAbsPos.height/2-diffY;
  
      // Middle Points
      connectionPos.middlePosX = (connectionPos.firstLayerPosX + connectionPos.secondLayerPosX)/2;
      connectionPos.middlePosY = (connectionPos.firstLayerPosY + connectionPos.secondLayerPosY)/2;
    }

    return connectionPos
}

// Drawing Types

function drawAngledLine(firstLayerPosX, firstLayerPosY, middlePosX, middlePosY, secondLayerPosX, secondLayerPosY, direction){ // Refactored
    let path = NSBezierPath.bezierPath();
  
    if(direction == "Up"){
      // Connecting points
      path.moveToPoint(NSMakePoint(firstLayerPosX, firstLayerPosY));
      path.lineToPoint(NSMakePoint(firstLayerPosX, middlePosY));
      path.lineToPoint(NSMakePoint(secondLayerPosX, middlePosY));
      path.lineToPoint(NSMakePoint(secondLayerPosX, secondLayerPosY));
    }
  
    if(direction == "Right"){
      // Connecting points
      path.moveToPoint(NSMakePoint(firstLayerPosX, firstLayerPosY));
      path.lineToPoint(NSMakePoint(middlePosX, firstLayerPosY));
      path.lineToPoint(NSMakePoint(middlePosX, secondLayerPosY));
      path.lineToPoint(NSMakePoint(secondLayerPosX, secondLayerPosY));
    }
  
    if(direction == "Down"){
      // Connecting points
      path.moveToPoint(NSMakePoint(firstLayerPosX, firstLayerPosY));
      path.lineToPoint(NSMakePoint(firstLayerPosX, middlePosY));
      path.lineToPoint(NSMakePoint(secondLayerPosX, middlePosY));
      path.lineToPoint(NSMakePoint(secondLayerPosX, secondLayerPosY));
    }
  
    if(direction == "Left"){
      // Connecting points
      path.moveToPoint(NSMakePoint(firstLayerPosX, firstLayerPosY));
      path.lineToPoint(NSMakePoint(middlePosX, firstLayerPosY));
      path.lineToPoint(NSMakePoint(middlePosX, secondLayerPosY));
      path.lineToPoint(NSMakePoint(secondLayerPosX, secondLayerPosY));
    }
  
    let line = MSShapeGroup.layerWithPath(MSPath.pathWithBezierPath(path));
    let points = line.layers().firstObject().points();
    points[1].cornerRadius = 20;
    points[2].cornerRadius = 20;
    line.setName("Angled Arrow");
  
    return line;
}

function drawStraightLine(firstLayerPosX, firstLayerPosY, secondLayerPosX, secondLayerPosY, direction){ // Refactored
    let path = NSBezierPath.bezierPath();
    
    if(direction == "Up"){
      path.moveToPoint(NSMakePoint(firstLayerPosX,firstLayerPosY));
      path.lineToPoint(NSMakePoint(secondLayerPosX,secondLayerPosY));
    }
  
    if(direction == "Right"){
      path.moveToPoint(NSMakePoint(firstLayerPosX,firstLayerPosY));
      path.lineToPoint(NSMakePoint(secondLayerPosX,secondLayerPosY));
    }
  
    if(direction == "Down"){
      path.moveToPoint(NSMakePoint(firstLayerPosX,firstLayerPosY));
      path.lineToPoint(NSMakePoint(secondLayerPosX,secondLayerPosY));
    }
  
    if(direction == "Left"){
      path.moveToPoint(NSMakePoint(firstLayerPosX,firstLayerPosY));
      path.lineToPoint(NSMakePoint(secondLayerPosX,secondLayerPosY));
    }
  
    let line = MSShapeGroup.layerWithPath(MSPath.pathWithBezierPath(path));
    line.setName("Straight Arrow");
  
    return line;
}

function drawCurvedLine(firstLayerPosX, firstLayerPosY, secondLayerPosX, secondLayerPosY, direction){ // Refactored
    let path = NSBezierPath.bezierPath();
    let line;
  
    if(direction == "Up"){
      // Connecting points
      path.moveToPoint(NSMakePoint(firstLayerPosX,firstLayerPosY));
      path.lineToPoint(NSMakePoint(secondLayerPosX,secondLayerPosY));
  
      // Painting the line
      line = MSShapeGroup.layerWithPath(MSPath.pathWithBezierPath(path));
      let points = line.layers().firstObject().points();
  
      points[0].curveMode = 4;
      points[1].curveMode = 4;
      points[0].hasCurveFrom = true;
      points[1].hasCurveTo = true;
  
      if(firstLayerPosX<secondLayerPosX){
        points[0].curveFrom = {x: 0, y: 0.5};
        points[0].curveTo = {x: -0.5, y: 1};
  
        points[1].curveFrom = {x: 1, y: 1};
        points[1].curveTo = {x: 1, y: 0.5};
      } else {
        points[0].curveFrom = {x: 1, y: 0.5};
        points[0].curveTo = {x: -0.5, y:1};
  
        points[1].curveFrom = {x: 1, y: 1};
        points[1].curveTo = {x: 0, y: 0.5};
      }
    }
  
    if(direction == "Right"){
      // Connecting points
      path.moveToPoint(NSMakePoint(firstLayerPosX,firstLayerPosY));
      path.lineToPoint(NSMakePoint(secondLayerPosX,secondLayerPosY));
  
      // Painting the line
      line = MSShapeGroup.layerWithPath(MSPath.pathWithBezierPath(path));
      let points = line.layers().firstObject().points();
  
      points[0].curveMode = 4;
      points[1].curveMode = 4;
      points[0].hasCurveFrom = true;
      points[1].hasCurveTo = true;
  
      if(firstLayerPosY<secondLayerPosY){
        points[0].curveFrom = {x: 0.5, y: 0};
        points[0].curveTo = {x: -0.5,y:1};
  
        points[1].curveFrom = {x: 1,y: 1};
        points[1].curveTo = {x: 0.5,y: 1};
      } else {
        points[0].curveFrom = {x: 0.5, y: 1};
        points[0].curveTo = {x: -0.5,y:1};
  
        points[1].curveFrom = {x: 1,y: 1};
        points[1].curveTo = {x: 0.5,y: 0};
      }
    }
  
    if(direction == "Down"){
      // Connecting points
      path.moveToPoint(NSMakePoint(firstLayerPosX,firstLayerPosY));
      path.lineToPoint(NSMakePoint(secondLayerPosX,secondLayerPosY));
  
      // Painting the line
      line = MSShapeGroup.layerWithPath(MSPath.pathWithBezierPath(path));
      let points = line.layers().firstObject().points();
  
      points[0].curveMode = 4;
      points[1].curveMode = 4;
      points[0].hasCurveFrom = true;
      points[1].hasCurveTo = true;
  
      if(firstLayerPosX<secondLayerPosX){
        points[0].curveFrom = {x: 0, y: 0.5};
        points[0].curveTo = {x: -0.5,y:1};
  
        points[1].curveFrom = {x: 1,y: 1};
        points[1].curveTo = {x: 1,y: 0.5};
      } else {
        points[0].curveFrom = {x: 1, y: 0.5};
        points[0].curveTo = {x: -0.5,y:1};
  
        points[1].curveFrom = {x: 1,y: 1};
        points[1].curveTo = {x: 0,y: 0.5};
      }
    }
  
    if(direction == "Left"){
      // Connecting points
      path.moveToPoint(NSMakePoint(firstLayerPosX,firstLayerPosY));
      path.lineToPoint(NSMakePoint(secondLayerPosX,secondLayerPosY));
  
      // Painting the line
      line = MSShapeGroup.layerWithPath(MSPath.pathWithBezierPath(path));
      let points = line.layers().firstObject().points();
  
      points[0].curveMode = 4;
      points[1].curveMode = 4;
      points[0].hasCurveFrom = true;
      points[1].hasCurveTo = true;
  
      if(firstLayerPosY<secondLayerPosY){
        points[0].curveFrom = {x: 0.5, y: 0};
        points[0].curveTo = {x: -0.5,y:1};
  
        points[1].curveFrom = {x: 1,y: 1};
        points[1].curveTo = {x: 0.5,y: 1};
      } else {
        points[0].curveFrom = {x: 0.5, y: 1};
        points[0].curveTo = {x: -0.5,y:1};
  
        points[1].curveFrom = {x: 1,y: 1};
        points[1].curveTo = {x: 0.5,y: 0};
      }
    }
  
    // Providing Settings for the arrow
    line.setName("Curved Arrow");
  
    return line;
}