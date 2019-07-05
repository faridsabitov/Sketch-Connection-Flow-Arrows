import sketch from "sketch";
import { getLayerStyles } from "./utilities/styling.js";

let UI = require("sketch/ui");
var Settings = require("sketch/settings");

const pluginKey = "flowArrows";

let docData, pluginData, currentParentGroup, newConnectionsData;

let document = sketch.fromNative(context.document);
docData = context.document.documentData();
pluginData = context.command.valueForKey_onLayer_forPluginIdentifier(
  "arrowConnections",
  docData,
  pluginKey
);

export function settings(context) {
  let alert = COSAlertWindow.new();
  const viewWidth = 300;
  const viewHeight = 450;

  // Alert window settings
  alert = alertSetup(alert, viewWidth, viewHeight);
  let view = NSView.alloc().initWithFrame(
    NSMakeRect(0, 0, viewWidth, viewHeight)
  );
  alert.addAccessoryView(view);

  // Label: Arrow Style
  let arrowStyleLabel = alertLabel(
    "Arrow Style",
    true,
    -1,
    viewHeight - 40,
    280,
    40
  );
  view.addSubview(arrowStyleLabel);

  // Select: Arrow Style
  let arrowStylingField = NSPopUpButton.alloc().initWithFrame(
    NSMakeRect(-2, viewHeight - 40, 300, 20)
  );
  setActiveStyleSetting(arrowStylingField);
  view.addSubview(arrowStylingField);

  // Label: Arrow Style Info
  let arrowStyleInfoLabel = alertLabel(
    "Add layer style to your document that will contain $arrow name and you will be able to specify it here ",
    false,
    -1,
    viewHeight - 80,
    300,
    40
  );
  view.addSubview(arrowStyleInfoLabel);

  // Label: Arrow Type
  let arrowTypeLabel = alertLabel(
    "Arrow Type",
    true,
    -1,
    viewHeight - 130,
    280,
    40
  );
  view.addSubview(arrowTypeLabel);

  // Select: Arrow Type
  let arrowTypeField = NSPopUpButton.alloc().initWithFrame(
    NSMakeRect(-2, viewHeight - 130, 300, 20)
  );
  setActiveTypeSetting(arrowTypeField);
  view.addSubview(arrowTypeField);

  // Label: Arrow Type Info
  let arrowTypeInfoLabel = alertLabel(
    "Select one of the arrow types. Angled is used by default",
    false,
    -1,
    viewHeight - 170,
    300,
    40
  );
  view.addSubview(arrowTypeInfoLabel);

  // Label: Arrow Spacing
  let arrowSpacingLabel = alertLabel(
    "Arrow Spacing",
    true,
    -1,
    viewHeight - 200,
    330,
    20
  );
  view.addSubview(arrowSpacingLabel);

  // Label: Arrow Spacing PX
  let arrowSpacingPxLabel = alertLabel(
    "px",
    true,
    90,
    viewHeight - 220,
    330,
    20
  );
  view.addSubview(arrowSpacingPxLabel);

  // Input: Arrow Spacing
  let arrowSpacingField = NSTextField.alloc().initWithFrame(
    NSMakeRect(-2, viewHeight - 220, 80, 20)
  );
  var formatter = NSNumberFormatter.alloc()
    .init()
    .autorelease();
  arrowSpacingField.setStringValue(
    String(Settings.settingForKey("arrowSpacing"))
  );
  arrowSpacingField.setFormatter(formatter);
  view.addSubview(arrowSpacingField);

  // Stepper: Arrow Spacing
  let arrowSpacingStepper = NSStepper.alloc().initWithFrame(
    NSMakeRect(70, viewHeight - 220, 20, 20)
  );
  arrowSpacingStepper.setMaxValue(1000);
  arrowSpacingStepper.setMinValue(0);
  arrowSpacingStepper.setValueWraps(false);
  arrowSpacingStepper.setAutorepeat(true);
  arrowSpacingStepper.setCOSJSTargetFunction(function(sender) {
    var value = 0 + sender.integerValue();
    arrowSpacingField.setStringValue(String(value));
  });

  view.addSubview(arrowSpacingStepper);
  // view.addSubview(formatter)

  // Label: Auto Spacing Info
  let arrowSpacingInfoLabel = alertLabel(
    "The second layer will be moved closer based on the value provided here. Keep it 0 if you don't want to have auto spacing feature ",
    false,
    -1,
    viewHeight - 285,
    300,
    60
  );
  view.addSubview(arrowSpacingInfoLabel);

  // Label: Other Settings
  let otherSettingsLabel = alertLabel(
    "Other Settings",
    true,
    -1,
    viewHeight - 330,
    280,
    40
  );
  view.addSubview(otherSettingsLabel);

  // Checkbox: Auto-Align
  let checkbox = alertCheckbox(
    "Second layer auto-align",
    false,
    -1,
    viewHeight - 340,
    260,
    40
  );
  view.addSubview(checkbox);

  // Label: Auto-Align Info
  let autoAlignInfoLabel = alertLabel(
    "Align the second layer for 5px misalignment with the first one",
    false,
    -1,
    viewHeight - 370,
    280,
    40
  );
  view.addSubview(autoAlignInfoLabel);

  // Label: Plugin Info
  let pluginInfoLabel = alertLabel(
    "Made by @faridSabitov with the support of EPAM.com ❤️",
    true,
    -1,
    viewHeight - 420,
    280,
    40
  );
  view.addSubview(pluginInfoLabel);

  // Need to check if style is still available

  // Show modal and get the results
  let modalResponse = alert.runModal();

  if (modalResponse == NSAlertFirstButtonReturn) {
    // When user clicks on "Update Settings"
    // Need to save all this results into the Plugin Settings
    context.command.setValue_forKey_onLayer_forPluginIdentifier(
      alert
        .views()[0]
        .subviews()[1]
        .title(),
      "arrowStyle",
      docData,
      pluginKey
    );
    Settings.setSettingForKey(
      "arrowType",
      alert
        .views()[0]
        .subviews()[4]
        .title()
    );
    Settings.setSettingForKey(
      "arrowSpacing",
      alert
        .views()[0]
        .subviews()[8]
        .intValue()
    );
    Settings.setSettingForKey(
      "autoAlign",
      alert
        .views()[0]
        .subviews()[12]
        .state()
    );
    UI.message("Settings are updated 🚀");
  }
}

// Functions

function setActiveStyleSetting(arrowStylingField) {
  let docSettings = context.command.valueForKey_onLayer_forPluginIdentifier(
    "arrowStyle",
    docData,
    pluginKey
  );
  let styles = getLayerStyles(null);

  if (docSettings) {
    // We have info about the settings in the current document

    if (docSettings != "Default Style") {
      // if user specified own option
      arrowStylingField.addItemWithTitle(docSettings);
      arrowStylingField.addItemWithTitle("Default Style");
      for (let i = 0; i < styles.length; i++) {
        if (styles[i].name() != docSettings) {
          arrowStylingField.addItemWithTitle(styles[i].name());
        }
      }
    } else {
      // Need to show the default first
      arrowStylingField.addItemWithTitle("Default Style");
      for (let i = 0; i < styles.length; i++) {
        arrowStylingField.addItemWithTitle(styles[i].name());
      }
    }
  } else {
    arrowStylingField.addItemWithTitle("Default Style");
    for (let i = 0; i < styles.length; i++) {
      arrowStylingField.addItemWithTitle(styles[i].name());
    }
  }
}

function setActiveTypeSetting(arrowTypeField) {
  let docTypeSettings = Settings.settingForKey("arrowType");

  if (docTypeSettings) {
    // We have info about the settings in the current document

    if (docTypeSettings == "Angled") {
      arrowTypeField.addItemWithTitle("Angled");
      arrowTypeField.lastItem().setState(1);
      arrowTypeField.addItemWithTitle("Curved");
      arrowTypeField.lastItem().setState(0);
      arrowTypeField.addItemWithTitle("Straight");
      arrowTypeField.lastItem().setState(0);
    }

    if (docTypeSettings == "Curved") {
      arrowTypeField.addItemWithTitle("Curved");
      arrowTypeField.lastItem().setState(1);
      arrowTypeField.addItemWithTitle("Straight");
      arrowTypeField.lastItem().setState(0);
      arrowTypeField.addItemWithTitle("Angled");
      arrowTypeField.lastItem().setState(0);
    }

    if (docTypeSettings == "Straight") {
      arrowTypeField.addItemWithTitle("Straight");
      arrowTypeField.lastItem().setState(1);
      arrowTypeField.addItemWithTitle("Angled");
      arrowTypeField.lastItem().setState(0);
      arrowTypeField.addItemWithTitle("Curved");
      arrowTypeField.lastItem().setState(0);
    }
  } else {
    // Show default
    arrowTypeField.addItemWithTitle("Angled");
    arrowTypeField.addItemWithTitle("Curved");
    arrowTypeField.addItemWithTitle("Straight");
  }
}

function alertSetup(alert, viewWidth, viewHeight) {
  // Title
  alert.setMessageText("Arrow Plugin Settings");

  // Creating dialog buttons
  alert.addButtonWithTitle("Update Settings");
  alert.addButtonWithTitle("Cancel");

  return alert;
}

function alertLabel(message, state, x, y, width, height) {
  let infoLabel = NSTextField.alloc().initWithFrame(
    NSMakeRect(x, y, width, height)
  );

  infoLabel.setStringValue(message);
  infoLabel.setSelectable(false);
  infoLabel.setDrawsBackground(false);
  infoLabel.setBezeled(false);

  if (state == false) {
    infoLabel.textColor = NSColor.disabledControlTextColor();
  }

  return infoLabel;
}

function alertCheckbox(message, state, x, y, width, height) {
  let checkbox = NSButton.alloc().initWithFrame(
    NSMakeRect(x, y, width, height)
  );

  checkbox.setButtonType(NSSwitchButton);
  checkbox.setBezelStyle(0);
  checkbox.setTitle(message);
  if (Settings.settingForKey("autoAlign")) {
    let currentState = Settings.settingForKey("autoAlign");
    checkbox.setState(currentState);
  } else {
    checkbox.setState(state);
  }

  return checkbox;
}


