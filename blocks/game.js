// Global
Blockly.Block.DEFAULT_VAR = 'actor';

Blockly.Block.prototype.findParentVariable = function () {
  var parent = this.getParent();

  while (parent != undefined) {
    if (parent.type === 'variables_set') {
      parentVariable = parent.getField('VAR').getVariable();
      return parentVariable;
    }

    parent = parent.getParent();
  }

  return null;
}

Blockly.Block.prototype.selectNearestVar = function (change) {
  this.findParentVariable();
  var variable = this.getField('VAR').getVariable();
  if (change.newParentId != undefined && variable.name == Blockly.Block.DEFAULT_VAR) {
    var parentVariable = this.findParentVariable();

    if (parentVariable != null) {
      this.getField('VAR').setValue(parentVariable.getId());
    }
  }
}

// Game
Blockly.Blocks['create_game'] = {
  init: function () {
    this.appendValueInput("IMG")
      .setCheck("Image")
      .appendField("create game");
    this.appendValueInput("W")
      .setCheck("Number")
      .appendField("width to");
    this.appendValueInput("H")
      .setCheck("Number")
      .appendField("height to");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(195);
    this.setTooltip("");
    this.setHelpUrl("");
  },

  runIn: 'create'
};

Blockly.Blocks['game_get'] = {

  init: function () {
    var options = [
      ["width", "world.width"],
      ["height", "world.height"],
    ];

    this.appendDummyInput()
      .appendField("with game get")
      .appendField(new Blockly.FieldDropdown(options), "PROPERTY");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(195);
    this.setTooltip("");
    this.setHelpUrl("");
  },

  runIn: 'create'

};

Blockly.Blocks['game_debug'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("debug")
      .appendField(new Blockly.FieldCheckbox("TRUE"), "APPLY");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(195);
    this.setTooltip("");
    this.setHelpUrl("");
  },

  runIn: 'create'
};

Blockly.Blocks['camera_follow'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("camera follow")
      .appendField(new Blockly.FieldVariable("actor"), "VAR");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(195);
    this.setTooltip("");
    this.setHelpUrl("");

    this.setOnChange(this.selectNearestVar);
  },

  runIn: 'create'
};

// Game::event
Blockly.Blocks['key_down'] = {
  init: function () {
    var options = [
      ["← left", "LEFT"], // ↺ ↻ found on https://fr.wikipedia.org/wiki/Wikip%C3%A9dia:Caract%C3%A8res_sp%C3%A9ciaux/Fl%C3%A8ches
      ["→ right", "RIGHT"],
      ["↑ up", "UP"],
      ["↓ down", "DOWN"],
      ["↲ enter", "ENTER"],
      ["  space", "SPACEBAR"]
    ];

    this.appendDummyInput()
      .appendField("when key")
      .appendField(new Blockly.FieldDropdown(options), "EVENT")
      .appendField("down")
      .appendField("once")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "ONCE");
    this.appendStatementInput("STMT")
      .setCheck(null)
    this.setInputsInline(false);
    this.setColour(65);
    this.setTooltip("");
    this.setHelpUrl("");
  },

  runIn: 'update'
};

Blockly.Blocks['mouse_down'] = {
  init: function () {
    var options = [
      ["left", "onMouseLeftDowm"],
      ["middle", "onMouseMiddleDowm"],
      ["right", "onMouseRightDowm"],
    ];

    this.appendDummyInput()
      .appendField("when mouse")
      .appendField(new Blockly.FieldDropdown(options), "EVENT")
      .appendField("down")
      .appendField("once")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "ONCE");
    this.appendStatementInput("STMT")
      .setCheck(null)
    this.setInputsInline(false);
    this.setColour(65);
    this.setTooltip("");
    this.setHelpUrl("");
  },

  runIn: 'update'
};

// Actor
Blockly.images = [];
for (var key in gameImgs) {
  Blockly.images.push([{ 'src': gameImgs[key], 'width': 50, 'height': 50 }, key]);
}

Blockly.Blocks['game_image'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown(Blockly.images), 'IMG')
    this.setOutput(true, "Image");
    this.setColour(195);
    this.setTooltip("");
    this.setHelpUrl("");
  },

  getImage: function () {
    var key = this.getFieldValue('IMG');
    return {'key': key, 'url': gameImgs[key]};
  },

  runIn: 'create'
};

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
  },

  runIn: 'create'
};

Blockly.Block.actorProperties = [
  ["x", "x"],
  ["y", "y"],
  ["velocity x", "body.velocity.x"],
  ["velocity y", "body.velocity.y"],
];

Blockly.Blocks['actor_get'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("with")
      .appendField(new Blockly.FieldVariable(Blockly.Block.DEFAULT_VAR), "VAR")
      .appendField("get")
      .appendField(new Blockly.FieldDropdown(Blockly.Block.actorProperties), "PROPERTY");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(195);
    this.setTooltip("");
    this.setHelpUrl("");

    this.setOnChange(this.selectNearestVar);

  },

  runIn: 'create'

};

Blockly.Blocks['actor_set'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("with")
      .appendField(new Blockly.FieldVariable(Blockly.Block.DEFAULT_VAR), "VAR")
      .appendField("set")
      .appendField(new Blockly.FieldDropdown(Blockly.Block.actorProperties), "PROPERTY");
    this.appendValueInput("VALUE")
      .appendField("to")
      .setCheck("Number")
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(195);
    this.setTooltip("");
    this.setHelpUrl("");

    this.setOnChange(this.selectNearestVar);

  },

  runIn: 'create'

};

Blockly.Blocks['actor_setXY'] = {
  init: function () {
    var options = [
      ["scale", "scaleTo"],
      ["gravity", "setGravity"],
      ["bounce", "setBounce"],
      ["friction", "setFriction"],
    ];
    var units = {
      "scaleTo": "%",
      "setGravity": "px",
      "setBounce": "%",
      "setFriction": "%",
    }
    this.appendDummyInput()
      .appendField("with")
      .appendField(new Blockly.FieldVariable(Blockly.Block.DEFAULT_VAR), "VAR")
      .appendField("set")
      .appendField(new Blockly.FieldDropdown(options, function (value) {
        this.sourceBlock_.getInput('UNIT').fieldRow[1].setText(units[value]);
      }), "METHOD");
    this.appendValueInput("X")
      .setCheck("Number")
      .appendField("x to");
    this.appendValueInput("Y")
      .setCheck("Number")
      .appendField("and y to");
    this.appendDummyInput('UNIT')
      .appendField("in")
      .appendField(Object.values(units)[0]);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(195);
    this.setTooltip("");
    this.setHelpUrl("");

    this.setOnChange(this.selectNearestVar);
    
  },

  runIn: 'create'

};

Blockly.Blocks['actor_action'] = {
  init: function () {
    var options = [
      ["collide bounds", "body.collideWorldBounds = true"],
      ["immovable", "body.immovable = true"],
      ["rotate when collide", "rotateOnCollide()"],
      ["destroy", "kill()"],
    ];
    this.appendDummyInput()
      .appendField("with")
      .appendField(new Blockly.FieldVariable("actor"), "VAR")
      .appendField("do")
      .appendField(new Blockly.FieldDropdown(options), "ACTION")
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(195);
    this.setTooltip("");
    this.setHelpUrl("");

    this.setOnChange(this.selectNearestVar);
  },

  runIn: 'create'
};

Blockly.Blocks['actor_collide'] = {
  init: function () {
    var options = [
      ["collide", "onCollide"], 
      ["overlap", "onOverlap"]    
    ];
    this.appendDummyInput()
      .appendField("when")
      .appendField(new Blockly.FieldDropdown(Blockly.images), 'OBJ1')
      .appendField(new Blockly.FieldDropdown(options), "EVENT")
      .appendField("with")
      .appendField(new Blockly.FieldDropdown(Blockly.images), 'OBJ2')
    this.appendStatementInput("STMT")
      .setCheck(null)
      .appendField(new Blockly.FieldVariable("actor1"), "ID1")
      .appendField(new Blockly.FieldVariable("actor2"), "ID2");
    this.setInputsInline(false);
    this.setColour(65);
    this.setTooltip("");
    this.setHelpUrl("");
  },

  runIn: 'update'
};