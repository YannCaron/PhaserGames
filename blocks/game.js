// Game
Blockly.Blocks['game_debug'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("debug")
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
      .appendField(new Blockly.FieldVariable("actor"), "NAME");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(195);
    this.setTooltip("");
    this.setHelpUrl("");
  },

  runIn: 'create'
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

/*
Blockly.Blocks['actor_setNumber'] = {
  init: function () {
    var options = [
      ["velocity x", "body.velocity.x"], ["velocity y", "body.velocity.y"],
      ["bounce x", "body.bounce.x"], ["bounce y", "body.bounce.y"], 
      ["gravity x", "body.gravity.x"], ["gravity y", "body.gravity.y"],
      ["friction x", "body.friction.x"], ["friction y", "body.friction.y"],
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
  },

  runIn: 'create'
};*/

Blockly.Blocks['actor_setXY'] = {
  init: function () {
    var options = [
      ["scale", "scale"],
      ["velocity", "setVelocity"],
      ["gravity", "setGravity"],
      ["bounce", "setBounce"],
      ["friction", "setFriction"],
    ];
    var units = {
      "scale": "%",
      "setVelocity": "px",
      "setGravity": "px",
      "setBounce": "%",
      "setFriction": "%",
    }
    this.appendDummyInput()
      .appendField("with")
      .appendField(new Blockly.FieldVariable("actor"), "NAME")
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
  },

  runIn: 'create'


};

Blockly.Blocks['actor_action'] = {
  init: function () {
    var options = [
      ["collide bounds", "body.collideWorldBounds = true"],
      ["immovable", "body.immovable = true"],
      ["rotate when collide", "rotateOnCollide()"],
    ];
    this.appendDummyInput()
      .appendField("with")
      .appendField(new Blockly.FieldVariable("actor"), "NAME")
      .appendField("do")
      .appendField(new Blockly.FieldDropdown(options), "ACTION")
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(195);
    this.setTooltip("");
    this.setHelpUrl("");
  },

  runIn: 'create'
};

Blockly.Blocks['actor_collide'] = {
  init: function () {
    var options = [
      ["collide", "onCollide"], 
      ["intersects", "onIntersects"], 
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