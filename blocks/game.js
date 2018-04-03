// Global
Blockly.Block.ACTOR_TYPE = 'Actor';
Blockly.Block.DEFAULT_VAR = 'actor';

Blockly.Blocks.game = {};
Blockly.Blocks.game.HUE = Blockly.Msg.ACTOR_HUE;
Blockly.Blocks.event = {};
Blockly.Blocks.event.HUE = Blockly.Msg.EVENT_HUE;

Blockly.gameImages = [];
for (var key in gameImages) {
  Blockly.gameImages.push([{ 'src': gameImages[key], 'width': 50, 'height': 50 }, key]);
}

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
    var options = [];
    for (var key in gameBackgrounds) {
      options.push([{ 'src': gameBackgrounds[key], 'width': 50, 'height': 50 }, key]);
    }

    this.appendDummyInput()
      .appendField("create game")
      .appendField(new Blockly.FieldDropdown(options), 'IMG')
    this.appendValueInput("W")
      .setCheck("Number")
      .appendField("width to");
    this.appendValueInput("H")
      .setCheck("Number")
      .appendField("height to");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.game.HUE);
    this.setTooltip("");
    this.setHelpUrl("");
  },

  getImage: function () {
    var key = this.getFieldValue('IMG');
    return { 'key': key, 'url': gameBackgrounds[key] };
  },

  runIn: 'create'
};

Blockly.Blocks['game_get'] = {

  init: function () {
    var options = [
      ["width", "world.width"],
      ["height", "world.height"],
      ["mouse x", "input.activePointer.x"],
      ["mouse y", "input.activePointer.y"],
    ];

    this.appendDummyInput()
      .appendField("with game get")
      .appendField(new Blockly.FieldDropdown(options), "PROPERTY");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(Blockly.Blocks.game.HUE);
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
    this.setColour(Blockly.Blocks.game.HUE);
    this.setTooltip("");
    this.setHelpUrl("");
  },

  runIn: 'create'
};

Blockly.Blocks['debug_var'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("debug")
      .appendField("value of")
      .appendField(new Blockly.FieldVariable(), "VAR");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.game.HUE);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['camera_follow'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("camera follow")
      .appendField(new Blockly.FieldVariable("actor"), "VAR");
      // TODO check types and create variables
      //.appendField(new Blockly.FieldVariable("actor", null, [Blockly.Block.ACTOR_TYPE], Blockly.Block.ACTOR_TYPE), "VAR");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.game.HUE);
    this.setTooltip("");
    this.setHelpUrl("");

    this.setOnChange(this.selectNearestVar);
  },

  runIn: 'create'
};

Blockly.Blocks['game_print'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("print at");
    this.appendValueInput("X")
      .setCheck("Number")
      .appendField("x");
    this.appendValueInput("Y")
      .setCheck("Number")
      .appendField("y");
    this.appendValueInput("TEXT")
      .setCheck("String")
      .appendField("the text");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.texts.HUE);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

// Game::event
Blockly.Blocks['game_always'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("always")
    this.appendStatementInput("STMT")
      .setCheck(null)
    this.setInputsInline(false);
    this.setColour(Blockly.Blocks.event.HUE);
    this.setTooltip("");
    this.setHelpUrl("");
  },

  runIn: 'update'
};

Blockly.Blocks['game_every'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("every")
      .appendField(new Blockly.FieldNumber(0.75, 0, 3600, 0.01), "TIME")
      .appendField("seconds")
      .appendField("first")
      .appendField(new Blockly.FieldCheckbox("TRUE"), "FIRST");
    this.appendStatementInput("STMT")
      .setCheck(null)
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.event.HUE);
    this.setTooltip("");
    this.setHelpUrl("");
  },

  runIn: 'update'
};

Blockly.Blocks['key_event'] = {
  init: function () {
    var key = [
      ["← left", "LEFT"], // ↺ ↻ found on https://fr.wikipedia.org/wiki/Wikip%C3%A9dia:Caract%C3%A8res_sp%C3%A9ciaux/Fl%C3%A8ches
      ["→ right", "RIGHT"],
      ["↑ up", "UP"],
      ["↓ down", "DOWN"],
      ["↲ enter", "ENTER"],
      ["  space", "SPACEBAR"]
    ];

    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (var i = 0; i < chars.length; i++) {
      key.push([chars.charAt(i), chars.charAt(i)]);
    }

    var event = [
      ['pressed', 'onKeyDown'],
      ['released', 'onKeyUp']
    ];

    this.appendDummyInput()
      .appendField("when key")
      .appendField(new Blockly.FieldDropdown(key), "KEY")
      .appendField(new Blockly.FieldDropdown(event), "EVENT")
      .appendField("once")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "ONCE");
    this.appendStatementInput("STMT")
      .setCheck(null)
    this.setInputsInline(false);
    this.setColour(Blockly.Blocks.event.HUE);
    this.setTooltip("");
    this.setHelpUrl("");
  },

  runIn: 'update'
};

Blockly.Blocks['mouse_event'] = {
  init: function () {
    var options = [
      ["left pressed", "onMouseLeftDowm"],
      ["middle pressed", "onMouseMiddleDowm"],
      ["right pressed", "onMouseRightDowm"],
      ["left released", "onMouseLeftUp"],
      ["middle released", "onMouseMiddleUp"],
      ["right released", "onMouseRightUp"],
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
    this.setColour(Blockly.Blocks.event.HUE);
    this.setTooltip("");
    this.setHelpUrl("");
  },

  runIn: 'update'
};

// Actor
Blockly.Blocks['game_image'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown(Blockly.gameImages), 'IMG')
    this.setOutput(true, "Image");
    this.setColour(Blockly.Blocks.game.HUE);
    this.setTooltip("");
    this.setHelpUrl("");
  },

  getImage: function () {
    var key = this.getFieldValue('IMG');
    return { 'key': key, 'url': gameImages[key] };
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
    this.setColour(Blockly.Blocks.game.HUE);
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
  ["gravity x", "body.gravity.x"],
  ["gravity y", "body.gravity.y"],
  ["angle", "angle"],
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
    this.setColour(Blockly.Blocks.game.HUE);
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
    this.setColour(Blockly.Blocks.game.HUE);
    this.setTooltip("");
    this.setHelpUrl("");

    this.setOnChange(this.selectNearestVar);

  },

  runIn: 'create'

};

Blockly.Blocks['actor_get1'] = {
  init: function () {
    var options = [
      ["angle with", "getAngleWith"],
      ["distance with", "getDistanceWith"]
    ];
    this.appendDummyInput()
      .appendField("with")
      .appendField(new Blockly.FieldVariable(Blockly.Block.DEFAULT_VAR), "VAR")
      .appendField("get")
      .appendField(new Blockly.FieldDropdown(options), "PROPERTY");
    this.appendValueInput("ARG1")
      .setCheck("Actor")
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(Blockly.Blocks.game.HUE);
    this.setTooltip("");
    this.setHelpUrl("");

    this.setOnChange(this.selectNearestVar);

  },

  runIn: 'create'

};

Blockly.Blocks['actor_set1'] = {
  init: function () {
    var options = [
      ["velocity from angle", "VelocityFromAngle"],
    ];
    var units = {
      "VelocityFromAngle": "px",
    }
    this.appendDummyInput()
      .appendField("with")
      .appendField(new Blockly.FieldVariable(Blockly.Block.DEFAULT_VAR), "VAR")
      .appendField("set")
      .appendField(new Blockly.FieldDropdown(options, function (value) {
        this.sourceBlock_.getInput('UNIT').fieldRow[1].setText(units[value]);
      }), "METHOD");
    this.appendValueInput("ARG1")
      .setCheck("Number")
      .appendField("to");
    this.appendDummyInput('UNIT')
      .appendField("in")
      .appendField(Object.values(units)[0]);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.game.HUE);
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
      ["bounce", "setBounce"],
      ["friction", "setFriction"],
    ];
    var units = {
      "scaleTo": "%",
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
    this.setColour(Blockly.Blocks.game.HUE);
    this.setTooltip("");
    this.setHelpUrl("");

    this.setOnChange(this.selectNearestVar);
    
  },

  runIn: 'create'

};

Blockly.Blocks['actor_action'] = {
  init: function () {
    var self = this;
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
    this.setColour(Blockly.Blocks.game.HUE);
    this.setTooltip("");
    this.setHelpUrl("");

    this.setOnChange(this.selectNearestVar);
  },

  runIn: 'create'
};

Blockly.Blocks['actor_every'] = {
  init: function () {
    var options = [
      ["in", "Phaser.Sprite.TimeMode.IN"],
      ["in and every other", "Phaser.Sprite.TimeMode.IN_AND_AFTER"],
      ["every", "Phaser.Sprite.TimeMode.EVERY"]
    ];
    this.appendDummyInput()
      .appendField("with")
      .appendField(new Blockly.FieldVariable("actor"), "VAR")
      .appendField(new Blockly.FieldDropdown(options), "EVENT")
    this.appendValueInput("TIME")
      .setCheck("Number");
    this.appendDummyInput()
      .appendField("seconds");
    this.appendStatementInput("STMT")
      .setCheck(null)
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.event.HUE);
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
      .appendField(new Blockly.FieldDropdown(Blockly.gameImages), 'OBJ1')
      .appendField(new Blockly.FieldDropdown(options), "EVENT")
      .appendField("with")
      .appendField(new Blockly.FieldDropdown(Blockly.gameImages), 'OBJ2')
      .appendField("once")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "ONCE");
    this.appendStatementInput("STMT")
      .setCheck(null)
      .appendField(new Blockly.FieldVariable("actor1"), "ID1")
      .appendField(new Blockly.FieldVariable("actor2"), "ID2");
    this.setInputsInline(false);
    this.setColour(Blockly.Blocks.event.HUE);
    this.setTooltip("");
    this.setHelpUrl("");
  },

  runIn: 'update'
};
