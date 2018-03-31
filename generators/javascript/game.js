// Game
Blockly.JavaScript['create_game'] = function (block) {
  var img = Blockly.JavaScript.valueToCode(block, 'IMG', Blockly.JavaScript.ORDER_ATOMIC);
  var w = Blockly.JavaScript.valueToCode(block, 'W', Blockly.JavaScript.ORDER_ATOMIC);
  var h = Blockly.JavaScript.valueToCode(block, 'H', Blockly.JavaScript.ORDER_ATOMIC);

  var code = 'game.initGame(' + w + ', ' + h + ', ' + img + ');\n';
  return code;
};

Blockly.JavaScript['game_get'] = function (block) {
  var method = block.getFieldValue('PROPERTY');

  var code = 'game.' + method;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['game_debug'] = function (block) {
  var apply = block.getFieldValue('APPLY') == 'TRUE';

  var code = '';
  if (apply) {
    code += 'game.debugGame();\n';
  }
  return code;
};

Blockly.JavaScript['camera_follow'] = function (block) {
  var varName = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var code = 'game.camera.follow(' + varName + ', Phaser.Camera.FOLLOW_LOCKON, 1, 0.1);\n';
  return code;
};

Blockly.JavaScript['key_down'] = function (block) {
  var event = block.getFieldValue('EVENT');
  var stmt = Blockly.JavaScript.statementToCode(block, 'STMT');
  var once = block.getFieldValue('ONCE') == 'TRUE';

  var code = 'game.onKeyDown(Phaser.Keyboard.' + event + ', ' + once + ', function () {\n';
  code += stmt;
  code += '});\n';
  return code;
};

Blockly.JavaScript['mouse_down'] = function (block) {
  var event = block.getFieldValue('EVENT');
  var stmt = Blockly.JavaScript.statementToCode(block, 'STMT');
  var once = block.getFieldValue('ONCE') == 'TRUE';

  var code = 'game.' + event + '(' + once + ', function () {\n';
  code += stmt;
  code += '});\n';
  return code;
};

// Actor
Blockly.JavaScript['game_image'] = function (block) {
  var img = block.getFieldValue('IMG');
  var code = '\'' + img + '\'';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['create_actor'] = function (block) {
  var img = Blockly.JavaScript.valueToCode(block, 'IMG', Blockly.JavaScript.ORDER_ATOMIC);
  var x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC);
  var y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC);

  var code = 'game.createActor(' + img + ', ' + x + ', ' + y + ')';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['actor_get'] = function (block) {
  var varName = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var method = block.getFieldValue('PROPERTY');

  var code = varName + '.' + method;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['actor_set'] = function (block) {
  var varName = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var method = block.getFieldValue('PROPERTY');
  var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);

  var code = varName + '.' + method + ' = ' + value + ";\n";
  return code;
};

Blockly.JavaScript['actor_setXY'] = function (block) {
  var varName = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var method = block.getFieldValue('METHOD');
  var x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC);
  var y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC);
  var code = varName + '.' + method + ' (' + x + ', ' + y + ');\n';
  return code;
};

Blockly.JavaScript['actor_action'] = function (block) {
  var varName = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var action = block.getFieldValue('ACTION');
  var code = varName + '.' + action + ';\n';
  return code;
};

Blockly.JavaScript['actor_collide'] = function (block) {
  var obj1 = block.getFieldValue('OBJ1');
  var event = block.getFieldValue('EVENT');
  var obj2 = block.getFieldValue('OBJ2');
  var id1 = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('ID1'), Blockly.Variables.NAME_TYPE);
  var id2 = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('ID2'), Blockly.Variables.NAME_TYPE);
  var stmt = Blockly.JavaScript.statementToCode(block, 'STMT');

  var code = 'game.' + event + '(\'' + obj1 + '\', \'' + obj2 + '\', function (' + id1 + ', ' +id2 + ') {\n';
  code += stmt;
  code += '}, null, this);\n';
  return code;
};