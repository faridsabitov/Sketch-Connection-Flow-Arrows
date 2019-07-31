var that=this;function __skpm_run(e,t){that.context=t;var r=function(e){var t={};function r(o){if(t[o])return t[o].exports;var n=t[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=e,r.c=t,r.d=function(e,t,o){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(o,n,function(t){return e[t]}.bind(null,n));return o},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s="./src/autoUpdate.js")}({"./src/autoUpdate.js":
/*!***************************!*\
  !*** ./src/autoUpdate.js ***!
  \***************************/
/*! exports provided: autoUpdateSelectedArrows */function(e,t,r){"use strict";r.r(t),r.d(t,"autoUpdateSelectedArrows",function(){return l});var o=r(/*! sketch */"sketch"),n=r.n(o),i=r(/*! ./utilities/lines.js */"./src/utilities/lines.js"),a=r(/*! ./createArrow.js */"./src/createArrow.js"),s=r(/*! ./utilities/data.js */"./src/utilities/data.js"),c=(r(/*! sketch/ui */"sketch/ui"),"flowArrows"),u=r(/*! sketch/settings */"sketch/settings");function l(e){if(0!=u.settingForKey("autoDraw")){var t,r=n.a.fromNative(e.actionContext.document),o=e.actionContext.document.documentData(),l=Object(s.getConnectionsData)(o),d=Array.from(e.actionContext.layers).map(function(e){return n.a.fromNative(e)});if((t=function(e,t){var r=[];if(e.length>0)for(var o=0;o<e.length;o++)t!=e[o].firstObject&&t!=e[o].secondObject||r.push(o);return r}(l,String(d[0].id))).length>0){for(var f=0;f<t.length;f++){Object(i.deleteLine)(l[t[f]].line,r);var y=Object(a.createArrow)(l[t[f]].firstObject,l[t[f]].secondObject,l[t[f]].style,l[t[f]].type,l[t[f]].direction,l[t[f]].condition,l[t[f]].isCondition,r,o);l.push(y)}l=Object(s.deleteConnectionFromData)(t,l)}e.command.setValue_forKey_onLayer_forPluginIdentifier(l,"arrowConnections",o,c)}}},"./src/createArrow.js":
/*!****************************!*\
  !*** ./src/createArrow.js ***!
  \****************************/
/*! exports provided: createArrow */function(e,t,r){"use strict";r.r(t),r.d(t,"createArrow",function(){return i});r(/*! sketch */"sketch");var o=r(/*! ./draw.js */"./src/draw.js"),n=r(/*! sketch/settings */"sketch/settings");function i(e,t,r,i,a,s,c,u,l){var d="Auto"==a?function(e,t,r){var o,n=r.getLayerWithID(e),i=r.getLayerWithID(t),a=n.frame.x+n.frame.width/2,s=n.frame.y+n.frame.height/2,c=i.frame.x+i.frame.width/2,u=i.frame.y+i.frame.height/2,l=a-c,d=s-u,f=Math.abs(l),y=Math.abs(d);o=c>a?u>s?l>d?"Down":"Right":f>y?"Right":"Up":u>s?f>y?"Left":"Down":l>d?"Left":"Up";return o}(e,t,u):a;!function(e,t,r,o){var i=o.getLayerWithID(e),a=o.getLayerWithID(t);if(n.settingForKey("arrowSpacing")&&0!=n.settingForKey("arrowSpacing")){var s=n.settingForKey("arrowSpacing");"Right"==r&&(a.frame.x=i.frame.x+i.frame.width+s),"Down"==r&&(a.frame.y=i.frame.y+i.frame.height+s),"Left"==r&&(a.frame.x=i.frame.x-a.frame.width-s),"Up"==r&&(a.frame.y=i.frame.y-a.frame.height-s)}}(e,t,d,u),function(e,t,r,o){var i,a,s,c,u,l=o.getLayerWithID(e),d=o.getLayerWithID(t);n.settingForKey("autoAlign")&&1==n.settingForKey("autoAlign")&&("Right"!=r&&"Left"!=r||(i=l.frame.y+l.frame.height/2,a=d.frame.y+d.frame.height/2,(u=i-a)>-6&&u<6&&(d.frame.y=d.frame.y+u)),"Down"!=r&&"Up"!=r||(s=l.frame.x+l.frame.width/2,c=d.frame.x+d.frame.width/2,(u=s-c)>-6&&u<6&&(d.frame.x=d.frame.x+u)))}(e,t,d,u);var f=Object(o.drawConnection)(e,t,r,i,d,s,c,u,l);return{firstObject:e,secondObject:t,style:f.style,condition:f.conditionID,isCondition:c,type:f.type,direction:d,line:f.line.objectID()}}},"./src/draw.js":
/*!*********************!*\
  !*** ./src/draw.js ***!
  \*********************/
/*! exports provided: drawConnection */function(e,t,r){"use strict";r.r(t),r.d(t,"drawConnection",function(){return s});r(/*! sketch */"sketch");var o=r(/*! ./utilities/styling.js */"./src/utilities/styling.js"),n=r(/*! ./utilities/conditions.js */"./src/utilities/conditions.js"),i=r(/*! ./utilities/groups.js */"./src/utilities/groups.js"),a=r(/*! sketch/settings */"sketch/settings");r(/*! sketch/ui */"sketch/ui");function s(e,t,r,s,c,u,l,d,f){var y=f.currentPage().currentArtboard()||f.currentPage(),h=function(e,t,r,o){var n,a,s=e.frame.changeBasis({from:e.parent,to:o}),c=t.frame.changeBasis({from:t.parent,to:o}),u=Object(i.checkForGroup)("Arrows",o);u?(n=u.frame().x(),a=u.frame().y()):(n=0,a=0);var l={firstLayerPosX:null,firstLayerPosY:null,secondLayerPosX:null,secondLayerPosY:null,middlePosX:null,middlePosY:null};"Up"==r&&(l.firstLayerPosX=s.x+s.width/2-n,l.firstLayerPosY=s.y-a,l.secondLayerPosX=c.x+c.width/2-n,l.secondLayerPosY=c.y+c.height-a,l.middlePosX=(l.firstLayerPosX+l.secondLayerPosX)/2,l.middlePosY=(l.firstLayerPosY+l.secondLayerPosY)/2);"Right"==r&&(l.firstLayerPosX=s.x+s.width-n,l.firstLayerPosY=s.y+s.height/2-a,l.secondLayerPosX=c.x-n,l.secondLayerPosY=c.y+c.height/2-a,l.middlePosX=(l.firstLayerPosX+l.secondLayerPosX)/2,l.middlePosY=(l.firstLayerPosY+l.secondLayerPosY)/2);"Down"==r&&(l.firstLayerPosX=s.x+s.width/2-n,l.firstLayerPosY=s.y+s.height-a,l.secondLayerPosX=c.x+c.width/2-n,l.secondLayerPosY=c.y-a,l.middlePosX=(l.firstLayerPosX+l.secondLayerPosX)/2,l.middlePosY=(l.firstLayerPosY+l.secondLayerPosY)/2);"Left"==r&&(l.firstLayerPosX=s.x-n,l.firstLayerPosY=s.y+s.height/2-a,l.secondLayerPosX=c.x+c.width-n,l.secondLayerPosY=c.y+c.height/2-a,l.middlePosX=(l.firstLayerPosX+l.secondLayerPosX)/2,l.middlePosY=(l.firstLayerPosY+l.secondLayerPosY)/2);return l}(d.getLayerWithID(e),d.getLayerWithID(t),c,y),m={line:[],conditionID:[],type:[],style:[]};return m.type=null==s?a.settingForKey("arrowType"):s,"Angled"!=m.type&&null!=m.type||(m.line=function(e,t,r,o,n,i,a){var s=NSBezierPath.bezierPath();"Up"==a&&(s.moveToPoint(NSMakePoint(e,t)),s.lineToPoint(NSMakePoint(e,o)),s.lineToPoint(NSMakePoint(n,o)),s.lineToPoint(NSMakePoint(n,i)));"Right"==a&&(s.moveToPoint(NSMakePoint(e,t)),s.lineToPoint(NSMakePoint(r,t)),s.lineToPoint(NSMakePoint(r,i)),s.lineToPoint(NSMakePoint(n,i)));"Down"==a&&(s.moveToPoint(NSMakePoint(e,t)),s.lineToPoint(NSMakePoint(e,o)),s.lineToPoint(NSMakePoint(n,o)),s.lineToPoint(NSMakePoint(n,i)));"Left"==a&&(s.moveToPoint(NSMakePoint(e,t)),s.lineToPoint(NSMakePoint(r,t)),s.lineToPoint(NSMakePoint(r,i)),s.lineToPoint(NSMakePoint(n,i)));var c=MSShapeGroup.layerWithPath(MSPath.pathWithBezierPath(s)),u=c.layers().firstObject().points();return u[1].cornerRadius=20,u[2].cornerRadius=20,c.setName("Angled Arrow"),c}(h.firstLayerPosX,h.firstLayerPosY,h.middlePosX,h.middlePosY,h.secondLayerPosX,h.secondLayerPosY,c)),"Straight"==m.type&&(m.line=function(e,t,r,o,n){var i=NSBezierPath.bezierPath();"Up"==n&&(i.moveToPoint(NSMakePoint(e,t)),i.lineToPoint(NSMakePoint(r,o)));"Right"==n&&(i.moveToPoint(NSMakePoint(e,t)),i.lineToPoint(NSMakePoint(r,o)));"Down"==n&&(i.moveToPoint(NSMakePoint(e,t)),i.lineToPoint(NSMakePoint(r,o)));"Left"==n&&(i.moveToPoint(NSMakePoint(e,t)),i.lineToPoint(NSMakePoint(r,o)));var a=MSShapeGroup.layerWithPath(MSPath.pathWithBezierPath(i));return a.setName("Straight Arrow"),a}(h.firstLayerPosX,h.firstLayerPosY,h.secondLayerPosX,h.secondLayerPosY,c)),"Curved"==m.type&&(m.line=function(e,t,r,o,n){var i,a=NSBezierPath.bezierPath();if("Up"==n){a.moveToPoint(NSMakePoint(e,t)),a.lineToPoint(NSMakePoint(r,o));var s=(i=MSShapeGroup.layerWithPath(MSPath.pathWithBezierPath(a))).layers().firstObject().points();s[0].curveMode=4,s[1].curveMode=4,s[0].hasCurveFrom=!0,s[1].hasCurveTo=!0,e<r?(s[0].curveFrom={x:0,y:.5},s[0].curveTo={x:-.5,y:1},s[1].curveFrom={x:1,y:1},s[1].curveTo={x:1,y:.5}):(s[0].curveFrom={x:1,y:.5},s[0].curveTo={x:-.5,y:1},s[1].curveFrom={x:1,y:1},s[1].curveTo={x:0,y:.5})}if("Right"==n){a.moveToPoint(NSMakePoint(e,t)),a.lineToPoint(NSMakePoint(r,o));var c=(i=MSShapeGroup.layerWithPath(MSPath.pathWithBezierPath(a))).layers().firstObject().points();c[0].curveMode=4,c[1].curveMode=4,c[0].hasCurveFrom=!0,c[1].hasCurveTo=!0,t<o?(c[0].curveFrom={x:.5,y:0},c[0].curveTo={x:-.5,y:1},c[1].curveFrom={x:1,y:1},c[1].curveTo={x:.5,y:1}):(c[0].curveFrom={x:.5,y:1},c[0].curveTo={x:-.5,y:1},c[1].curveFrom={x:1,y:1},c[1].curveTo={x:.5,y:0})}if("Down"==n){a.moveToPoint(NSMakePoint(e,t)),a.lineToPoint(NSMakePoint(r,o));var u=(i=MSShapeGroup.layerWithPath(MSPath.pathWithBezierPath(a))).layers().firstObject().points();u[0].curveMode=4,u[1].curveMode=4,u[0].hasCurveFrom=!0,u[1].hasCurveTo=!0,e<r?(u[0].curveFrom={x:0,y:.5},u[0].curveTo={x:-.5,y:1},u[1].curveFrom={x:1,y:1},u[1].curveTo={x:1,y:.5}):(u[0].curveFrom={x:1,y:.5},u[0].curveTo={x:-.5,y:1},u[1].curveFrom={x:1,y:1},u[1].curveTo={x:0,y:.5})}if("Left"==n){a.moveToPoint(NSMakePoint(e,t)),a.lineToPoint(NSMakePoint(r,o));var l=(i=MSShapeGroup.layerWithPath(MSPath.pathWithBezierPath(a))).layers().firstObject().points();l[0].curveMode=4,l[1].curveMode=4,l[0].hasCurveFrom=!0,l[1].hasCurveTo=!0,t<o?(l[0].curveFrom={x:.5,y:0},l[0].curveTo={x:-.5,y:1},l[1].curveFrom={x:1,y:1},l[1].curveTo={x:.5,y:1}):(l[0].curveFrom={x:.5,y:1},l[0].curveTo={x:-.5,y:1},l[1].curveFrom={x:1,y:1},l[1].curveTo={x:.5,y:0})}return i.setName("Curved Arrow"),i}(h.firstLayerPosX,h.firstLayerPosY,h.secondLayerPosX,h.secondLayerPosY,c)),1==l?d.getLayerWithID(u)?m.conditionID=Object(n.updateCondition)(u,h.middlePosX,h.middlePosY,d,f):m.conditionID=Object(n.addCondition)("#con",h.middlePosX,h.middlePosY,d,f):m.conditionID=null,m.style=Object(o.styleLine)(m.line,r,f),Object(i.addToArrowsGroup)(m.line,y),m}},"./src/utilities/conditions.js":
/*!*************************************!*\
  !*** ./src/utilities/conditions.js ***!
  \*************************************/
/*! exports provided: addCondition, updateCondition, deleteCondition */function(e,t,r){"use strict";r.r(t),r.d(t,"addCondition",function(){return s}),r.d(t,"updateCondition",function(){return c}),r.d(t,"deleteCondition",function(){return u});var o=r(/*! sketch */"sketch"),n=r.n(o),i=r(/*! ./groups.js */"./src/utilities/groups.js"),a=(r(/*! sketch/settings */"sketch/settings"),r(/*! sketch/ui */"sketch/ui"));function s(e,t,r,o,s){for(var c,u,l,d=n.a.getLibraries(),f=s.currentPage().currentArtboard()||s.currentPage(),y=0;y<d.length;y++){u=d[y].getImportableSymbolReferencesForDocument(o);for(var h=0;h<u.length;h++)u[h].name.includes(e)&&(c=u[h])}null==c?(l=null,a.alert("Condition symbol is not found",'If you would like to add arrows with specific conditions, you need to specify them in your libraries. You can download the library that works well with the plugin by going into Plugins -> Connection Arrows -> Get Free Library. Conditions are taken from the library based on their names. Make sure to name symbol as "#condition" so it will be added here')):(l=c.import().createNewInstance(),l=Object(i.addToConditionGroup)(l,t,r,f));return l}function c(e,t,r,o,n){var a=n.currentPage().currentArtboard()||n.currentPage(),s=o.getLayerWithID(e),c=Object(i.checkForGroup)("Conditions",a),u=Object(i.checkForGroup)("Arrows",a),l=null!=u?u.frame().x():0,d=null!=u?u.frame().y():0;return c?(s.frame.x=t-s.frame.width/2-(c.frame().x()-l),s.frame.y=r-s.frame.height/2-(c.frame().y()-d),c.fixGeometryWithOptions(1)):(s.frame.x=t-s.frame.width/2,s.frame.y=r-s.frame.height/2),s.id}function u(e,t){var r,o=t.getLayerWithID(e);o&&(r=o.parent,o.remove(),0==r.layers.length&&r.remove())}},"./src/utilities/data.js":
/*!*******************************!*\
  !*** ./src/utilities/data.js ***!
  \*******************************/
/*! exports provided: getConnectionsData, deleteConnectionFromData */function(e,r,o){"use strict";o.r(r),o.d(r,"getConnectionsData",function(){return i}),o.d(r,"deleteConnectionFromData",function(){return a});o(/*! sketch */"sketch"),o(/*! sketch/ui */"sketch/ui"),o(/*! sketch/settings */"sketch/settings");var n="flowArrows";function i(e){var r=t.command.valueForKey_onLayer_forPluginIdentifier("arrowConnections",e,n),o=[];if(r)for(var i=0;i<r.length;i++)o.push(r[i]);return o}function a(e,t){if(t)for(var r=e.length-1;r>=0;r--)t.splice(e[r],1);return t}},"./src/utilities/groups.js":
/*!*********************************!*\
  !*** ./src/utilities/groups.js ***!
  \*********************************/
/*! exports provided: checkForGroup, addToArrowsGroup, addToConditionGroup */function(e,t,r){"use strict";r.r(t),r.d(t,"checkForGroup",function(){return o}),r.d(t,"addToArrowsGroup",function(){return n}),r.d(t,"addToConditionGroup",function(){return i});r(/*! sketch */"sketch"),r(/*! sketch/settings */"sketch/settings"),r(/*! sketch/ui */"sketch/ui");function o(e,t){for(var r=null,o=0;o<t.layers().count();o++)t.layers()[o].name()==e&&(r=t.layers()[o]);return r}function n(e,t){var n=o("Arrows",t);if(n)n.addLayers([e]),n.fixGeometryWithOptions(1);else{var i=new(0,r(/*! sketch/dom */"sketch/dom").Group)({parent:t,name:"Arrows",locked:!0,layers:[e]});i.moveToBack(),i.adjustToFit()}}function i(e,t,n,i){var a=o("Conditions",i),s=o("Arrows",i),c=null!=s?s.frame().x():0,u=null!=s?s.frame().y():0;if(a)e.frame.x=t-e.frame.width/2-(a.frame().x()-c),e.frame.y=n-e.frame.height/2-(a.frame().y()-u),e.parent=a,a.fixGeometryWithOptions(1);else{e.frame.x=t-e.frame.width/2+c,e.frame.y=n-e.frame.height/2+u;var l=new(0,r(/*! sketch/dom */"sketch/dom").Group)({parent:i,name:"Conditions",layers:[e]});l.moveToBack(),l.adjustToFit()}return e.id}},"./src/utilities/lines.js":
/*!********************************!*\
  !*** ./src/utilities/lines.js ***!
  \********************************/
/*! exports provided: deleteLine */function(e,t,r){"use strict";r.r(t),r.d(t,"deleteLine",function(){return o});r(/*! sketch */"sketch"),r(/*! sketch/ui */"sketch/ui");function o(e,t){var r,o=t.getLayerWithID(e);o&&(r=o.parent,o.remove(),0==r.layers.length&&r.remove())}},"./src/utilities/styling.js":
/*!**********************************!*\
  !*** ./src/utilities/styling.js ***!
  \**********************************/
/*! exports provided: styleLine, getLayerStyles */function(e,r,o){"use strict";o.r(r),o.d(r,"styleLine",function(){return i}),o.d(r,"getLayerStyles",function(){return a});o(/*! sketch */"sketch");var n="flowArrows";function i(e,r,o){var i;if(null!=r)if(null!=a(r,o)&&"Default Style"!=r){i=r;var s=a(r,o);e.sharedStyle=s[0]}else{i="Default Style";var c=e.style().addStylePartOfType(1);c.color=MSColor.colorWithRGBADictionary({r:.89,g:.89,b:.89,a:1}),c.thickness=2,e.style().endMarkerType=2}else if(null!=t.command.valueForKey_onLayer_forPluginIdentifier("arrowStyle",o,n)&&"Default Style"!=t.command.valueForKey_onLayer_forPluginIdentifier("arrowStyle",o,n))i=a(t.command.valueForKey_onLayer_forPluginIdentifier("arrowStyle",o,n),o),e.sharedStyle=i[0],i=i[0].name();else{i="Default Style";var u=e.style().addStylePartOfType(1);u.color=MSColor.colorWithRGBADictionary({r:.89,g:.89,b:.89,a:1}),u.thickness=2,e.style().endMarkerType=2}return i}function a(e,t){for(var r=t.allLayerStyles(),o=[],n=0;n<r.count();n++)null==e?r[n].name().includes("$arrow")&&o.push(r[n]):r[n].name()==e&&o.push(r[n]);return o}},sketch:
/*!*************************!*\
  !*** external "sketch" ***!
  \*************************/
/*! no static exports found */function(e,t){e.exports=require("sketch")},"sketch/dom":
/*!*****************************!*\
  !*** external "sketch/dom" ***!
  \*****************************/
/*! no static exports found */function(e,t){e.exports=require("sketch/dom")},"sketch/settings":
/*!**********************************!*\
  !*** external "sketch/settings" ***!
  \**********************************/
/*! no static exports found */function(e,t){e.exports=require("sketch/settings")},"sketch/ui":
/*!****************************!*\
  !*** external "sketch/ui" ***!
  \****************************/
/*! no static exports found */function(e,t){e.exports=require("sketch/ui")}});"default"===e&&"function"==typeof r?r(t):r[e](t)}that.autoUpdateSelectedArrows=__skpm_run.bind(this,"autoUpdateSelectedArrows"),that.autoUpdateSelectedArrows=__skpm_run.bind(this,"autoUpdateSelectedArrows"),that.onRun=__skpm_run.bind(this,"default");