import sketch from 'sketch';
import { addToConditionGroup } from "./groups.js";
let Settings = require('sketch/settings');
let UI = require('sketch/ui') ;

let document = sketch.fromNative(context.document);
let docData = context.document.documentData();
let currentParentGroup = docData.currentPage().currentArtboard() || docData.currentPage();

export function addCondition(keyword, x, y) {
  let libraries = sketch.getLibraries();
  let libraryObject, symbolReferences, symbol;

  for (let g = 0; g < libraries.length; g++) {
    symbolReferences = libraries[g].getImportableSymbolReferencesForDocument(
      document
    );
    for (let i = 0; i < symbolReferences.length; i++) {
      if (symbolReferences[i].name.includes(keyword)) {
        libraryObject = symbolReferences[i];
      }
    }
  }

  if (libraryObject == null) {
    symbol = null;
    UI.alert(
      "Condition symbol is not found",
      'If you would like to add arrows with specific conditions, you need to specify them in your libraries. You can download the library that works well with the plugin by going into Plugins -> Connection Arrows -> Get Free Library. Conditions are taken from the library based on their names. Make sure to name symbol as "#condition" so it will be added here'
    );
  } else {
    let symbolMaster = libraryObject.import();
    symbol = symbolMaster.createNewInstance();
    symbol = addToConditionGroup(symbol, x, y);
  }

  return symbol;
}

export function updateCondition(conditionID, x, y) {
  let condition = document.getLayerWithID(conditionID);
  let conGroup = checkForGroup("Conditions");
  let arGroup = checkForGroup("Arrows");
  let arGroupX = arGroup != null ? arGroup.frame().x() : 0;
  let arGroupY = arGroup != null ? arGroup.frame().y() : 0;

  if (conGroup) {
    condition.frame.x =
      x - condition.frame.width / 2 - (conGroup.frame().x() - arGroupX);
    condition.frame.y =
      y - condition.frame.height / 2 - (conGroup.frame().y() - arGroupY);
    conGroup.fixGeometryWithOptions(1);
  } else {
    condition.frame.x = x - condition.frame.width / 2;
    condition.frame.y = y - condition.frame.height / 2;
  }
  return condition.id;
}

export function deleteCondition(conditionID) {
    let conditionObject = document.getLayerWithID(conditionID);
    let selectedGroup;
    if(conditionObject){
      selectedGroup = conditionObject.parent;
      conditionObject.remove();
      if(selectedGroup.layers.length == 0){
        selectedGroup.remove();
      }
    }

  }
  
