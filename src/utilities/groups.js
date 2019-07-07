import sketch from 'sketch';
let Settings = require('sketch/settings');
let UI = require('sketch/ui') ;

let document = sketch.fromNative(context.document);
let docData = context.document.documentData();
let currentParentGroup = docData.currentPage().currentArtboard() || docData.currentPage();


export function checkForGroup(groupName) { // refactored
    let currentGroup = null;
  
    // Checking all the groups that we have
    for(let i = 0; i < currentParentGroup.layers().count(); i++){
      if(currentParentGroup.layers()[i].name() == groupName) {
        currentGroup = currentParentGroup.layers()[i];
      } 
    }
  
    return currentGroup;
}

export function addToArrowsGroup(line){
    let currentGroup = checkForGroup("Arrows");
    if(currentGroup){
      currentGroup.addLayers([line]);
      currentGroup.fixGeometryWithOptions(1);
    } else {
      let Group = require('sketch/dom').Group;
      let group = new Group({
        parent: currentParentGroup,
        name: 'Arrows',
        locked: true,
        layers: [line]
      });
      group.moveToBack();
      group.adjustToFit();
    }
}

export function addToConditionGroup(condition, x, y) {
    let conGroup = checkForGroup("Conditions");
    let arGroup = checkForGroup("Arrows");
    
    let arGroupX = arGroup != null ? arGroup.frame().x() : 0;
    let arGroupY = arGroup != null ? arGroup.frame().y() : 0;

    if (conGroup) {
      condition.frame.x =
        x - condition.frame.width / 2 - (conGroup.frame().x() - arGroupX);
      condition.frame.y =
        y - condition.frame.height / 2 - (conGroup.frame().y() - arGroupY);
      condition.parent = conGroup;
      conGroup.fixGeometryWithOptions(1);
    } else {
      condition.frame.x = x - condition.frame.width / 2 + arGroupX;
      condition.frame.y = y - condition.frame.height / 2 + arGroupY;
      let Group = require("sketch/dom").Group;
      let group = new Group({
        parent: currentParentGroup,
        name: "Conditions",
        layers: [condition]
      });
      group.moveToBack();
      group.adjustToFit();
    }
    return condition.id;
  }