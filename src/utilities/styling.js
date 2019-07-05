import sketch from 'sketch';
const pluginKey = "flowArrows";
let document = sketch.fromNative(context.document);


let docData = context.document.documentData();

export function styleLine(line, style){ // Refactored
    let localStyle;
    
    if(style != null){ 
      // For updates
      if(getLayerStyles(style) != null && style != "Default Style"){
        // If style is specified
        localStyle = style;
        let ownStyle = getLayerStyles(style);
        line.sharedStyle = ownStyle[0];
      } else {
        // if there is no specific style
        localStyle = "Default Style";
        let border = line.style().addStylePartOfType(1);
        border.color = MSColor.colorWithRGBADictionary({r: 0.89, g: 0.89, b: 0.89, a: 1});
        border.thickness = 2;
        line.style().endMarkerType = 2;
      }
    } else {
      // For creating new
      if(context.command.valueForKey_onLayer_forPluginIdentifier("arrowStyle", docData, pluginKey) != null && context.command.valueForKey_onLayer_forPluginIdentifier("arrowStyle", docData, pluginKey) != "Default Style"){
        // we have settins almost all the time and it's not default
        localStyle = getLayerStyles(context.command.valueForKey_onLayer_forPluginIdentifier("arrowStyle", docData, pluginKey));
        line.sharedStyle = localStyle[0];
        localStyle = localStyle[0].name();
      } else {
        localStyle = "Default Style";
        let border = line.style().addStylePartOfType(1);
        border.color = MSColor.colorWithRGBADictionary({r: 0.89, g: 0.89, b: 0.89, a: 1});
        border.thickness = 2;
        line.style().endMarkerType = 2;
      } 
    }
  
    return localStyle;
}

export function getLayerStyles(name) { // Refactored
    let allStyles = docData.allLayerStyles();
    let keyword = "$arrow";
    let styles = [];
  
    for(let i = 0; i < allStyles.count(); i++){
      if(name == null) {
        if(allStyles[i].name().includes(keyword)){styles.push(allStyles[i]);}
      } else {
        if(allStyles[i].name() == name){styles.push(allStyles[i]);}
      }
    }
      return styles;
}