// global
Blockly.Blocks.game = {};
Blockly.Blocks.game.HUE = Blockly.Msg.GAME_HUE;

// Game
Blockly.Blocks['create_game'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('%1 %2 %3'.format(Blockly.Msg.BLOCK_WITH, Blockly.Msg.BLOCK_GAME, Blockly.Msg.BLOCK_SET))
    this.appendValueInput("IMG")
      .setCheck(Blockly.Block.IMAGE_TYPE)
    this.appendValueInput("W")
      .setCheck("Number")
      .appendField(Blockly.Msg.BLOCK_W_TO);
    this.appendValueInput("H")
      .setCheck("Number")
      .appendField(Blockly.Msg.BLOCK_H_TO);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.game.HUE);
    this.setTooltip(Blockly.Msg.TOOLTIP_GAME_CREATE);
    this.setHelpUrl("");
  },

  runIn: 'create'
};

Blockly.Blocks['game_get'] = {

  init: function () {
    this.OPTIONS = [
      [Blockly.Msg.BLOCK_WIDTH, "world.width"],
      [Blockly.Msg.BLOCK_HEIGHT, "world.height"],
      ["%1 x".format(Blockly.Msg.BLOCK_MOUSE_IN), "input.activePointer.x"],
      ["%1 y".format(Blockly.Msg.BLOCK_MOUSE_IN), "input.activePointer.y"],
    ];

    this.appendDummyInput()
      .appendField('%1 %2 %3'.format(Blockly.Msg.BLOCK_WITH, Blockly.Msg.BLOCK_GAME, Blockly.Msg.BLOCK_GET))
      .appendField(new Blockly.FieldDropdown(this.OPTIONS), "PROPERTY");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(Blockly.Blocks.game.HUE);
    this.setTooltip(Blockly.Msg.TOOLTIP_GAME_GET.format(Blockly.Block.optionList(this.OPTIONS)));
    this.setHelpUrl("");
  },

  runIn: 'create'

};


Blockly.Blocks['game_debug'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.BLOCK_DEBUG)
      .appendField(new Blockly.FieldCheckbox("TRUE"), "APPLY");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.game.HUE);
    this.setTooltip(Blockly.Msg.TOOLTIP_GAME_DEBUG);
    this.setHelpUrl("");
  },

  runIn: 'create'
};

Blockly.Blocks['debug_var'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("%1 %2".format(Blockly.Msg.BLOCK_DEBUG, Blockly.Msg.BLOCK_VALUE_OF))
    this.appendValueInput("VAR")
      .setCheck(null)
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.game.HUE);
    this.setTooltip(Blockly.Msg.TOOLTIP_GAME_DEBUG_VAR);
    this.setHelpUrl("");
  }
};

Blockly.Blocks['camera_follow'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.CAMERA_FOLLOW);
    this.appendValueInput("VAR")
      .setCheck(Blockly.Block.ACTOR_TYPE);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.game.HUE);
    this.setTooltip(Blockly.Msg.TOOLTIP_CAMERA_FOLLOW);
    this.setHelpUrl("");

    this.setOnChange(this.selectNearestVar);
  },

  runIn: 'create'
};

Blockly.Blocks['game_print'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('%1 %2'.format(Blockly.Msg.PRINT, Blockly.Msg.AT));
    this.appendValueInput("X")
      .setCheck("Number")
      .appendField("x");
    this.appendValueInput("Y")
      .setCheck("Number")
      .appendField("y");
    this.appendValueInput("TEXT")
      .setCheck("String")
      .appendField(Blockly.Msg.TEXT);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.texts.HUE);
    this.setTooltip(Blockly.Msg.TOOLTIP_PRINT);
    this.setHelpUrl("");
  }
};


// TODO here

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

