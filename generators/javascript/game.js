Blockly.JavaScript['game_image'] = function (block) {
  var img = block.getFieldValue('IMG');
  var code = '\'' + img + '\'';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

/*
Blockly.JavaScript['create_actor'] = function(block) {
  var name = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  var img = Blockly.JavaScript.valueToCode(block, 'IMG', Blockly.JavaScript.ORDER_ATOMIC);
  var x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC);
  var y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC);
  var code = name + ' = game.add.sprite(' + x + ', ' + y + ', ' + img + ');\n';
  code += 'game.physics.arcade.enable(' + name + ');\n';
  return code;
};*/
Blockly.JavaScript['create_actor'] = function (block) {
  var img = Blockly.JavaScript.valueToCode(block, 'IMG', Blockly.JavaScript.ORDER_ATOMIC);
  var x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC);
  var y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'game.add.sprite(' + x + ', ' + y + ', ' + img + ')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['camera_follow'] = function (block) {
  var name = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  var code = 'game.camera.follow(' + name + ', Phaser.Camera.FOLLOW_LOCKON, 1, 0.1);\n';
  return code;
};

Blockly.JavaScript['actor_setNumber'] = function (block) {
  var name = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  var accessor = block.getFieldValue('ACCESSOR');
  var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);
  var code = name + '.' + accessor + ' = ' + value + ';\n';
  return code;
};

Blockly.JavaScript['actor_setBool'] = function (block) {
  var name = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  var accessor = block.getFieldValue('ACCESSOR');
  var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);
  var code = name + '.' + accessor + ' = ' + value + ';\n';
  return code;
};
