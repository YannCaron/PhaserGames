Blockly.Blocks['game_image'] = {
  init: function () {
    var options = [];
    for (var key in gameImgs) {
      options.push([{ 'src': gameImgs[key], 'width': 50, 'height': 50 }, key]);
    }
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown(options), 'IMG')
    this.setOutput(true, "Image");
    this.setColour(195);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

/*
Blockly.Blocks['create_actor'] = {

  init: function() {
    this.appendDummyInput()
      .appendField("create actor")
      .appendField(new Blockly.FieldVariable("actor"), "NAME")
    this.appendValueInput("IMG")
      .setCheck("Image")
    this.appendValueInput("X")
      .setCheck("Number")
      .appendField("x to");
    this.appendValueInput("Y")
      .setCheck("Number")
      .appendField("y to");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip("Create a new actor in the game.");
    this.setHelpUrl("");

    this.setOnChange(function (changeEvent) {
      this.setWarningText(this.getInput('NAME'));
    });

  }
};*/

Blockly.Blocks['create_actor'] = {
  init: function () {
    this.appendValueInput("IMG")
      .setCheck("Image")
      .appendField("create actor");
    this.appendValueInput("X")
      .setCheck("Number")
      .appendField("x to");
    this.appendValueInput("Y")
      .setCheck("Number")
      .appendField("y to");
    this.setInputsInline(true);
    this.setOutput(true, "Actor");
    this.setColour(195);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['camera_follow'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("follow")
      .appendField(new Blockly.FieldVariable("actor"), "NAME");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(195);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['actor_setNumber'] = {
  init: function () {
    var options = [
      ["bounce x", "body.bounce.x"], ["bounce y", "body.bounce.y"], 
      ["gravity x", "body.gravity.x"], ["gravity y", "body.gravity.y"]
    ];
    this.appendDummyInput()
      .appendField("with")
      .appendField(new Blockly.FieldVariable("actor"), "NAME");
    this.appendValueInput("VALUE")
      .setCheck("Number")
      .appendField("set")
      .appendField(new Blockly.FieldDropdown(options), "ACCESSOR")
      .appendField("to");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(195);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['actor_setBool'] = {
  init: function () {
    var options = [
      ["collide bounds", "body.collideWorldBounds"],
      ["enable body", "enableBody"],
      ["immovable", "body.immovable"]
    ];
    this.appendDummyInput()
      .appendField("with")
      .appendField(new Blockly.FieldVariable("actor"), "NAME");
    this.appendValueInput("VALUE")
      .setCheck("Boolean")
      .appendField("set")
      .appendField(new Blockly.FieldDropdown(options), "ACCESSOR")
      .appendField("to");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(195);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
