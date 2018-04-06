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

Blockly.JavaScript['debug_var'] = function (block) {
  var varName = Blockly.JavaScript.valueToCode(block, 'VAR', Blockly.JavaScript.ORDER_ATOMIC);

  var code = 'game.logVar(\'' + varName + '\', function () {\n';
  code += 'return ' + varName + ';\n';
  code += '});\n';
  return code;
};

Blockly.JavaScript['camera_follow'] = function (block) {
  var varName = Blockly.JavaScript.valueToCode(block, 'VAR', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'game.camera.follow(' + varName + ', Phaser.Camera.FOLLOW_LOCKON, 1, 0.1);\n';
  return code;
};

Blockly.JavaScript['game_print'] = function (block) {
  var x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC);
  var y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC);
  var text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_ATOMIC);

  var code = 'game.addText(' + x + ', ' + y + ', function () {\n';
  code += 'return ' + text + ';\n';
  code += '});\n';
  return code;
};

Blockly.JavaScript['game_always'] = function (block) {
  var stmt = Blockly.JavaScript.statementToCode(block, 'STMT');
  var code = stmt;
  return code;
};

Blockly.JavaScript['game_every'] = function (block) {
  var time = block.getFieldValue('TIME');
  var stmt = Blockly.JavaScript.statementToCode(block, 'STMT');
  var first = block.getFieldValue('FIRST') == 'TRUE';

  var code = 'game.every(new Error().lineNumber, ' + time + ', function () {\n';
  code += stmt;
  code += '}, ' + first + ');\n';
  return code;
};

Blockly.JavaScript['key_event'] = function (block) {
  var key = block.getFieldValue('KEY');
  var event = block.getFieldValue('EVENT');
  var stmt = Blockly.JavaScript.statementToCode(block, 'STMT');
  var once = block.getFieldValue('ONCE') == 'TRUE';

  var code = 'game.' + event + '(Phaser.Keyboard.' + key + ', function () {\n';
  code += stmt;
  code += '}, ' + once + ');\n';
  return code;
};

Blockly.JavaScript['mouse_event'] = function (block) {
  var event = block.getFieldValue('EVENT');
  var stmt = Blockly.JavaScript.statementToCode(block, 'STMT');
  var once = block.getFieldValue('ONCE') == 'TRUE';

  var code = 'game.' + event + '(function () {\n';
  code += stmt;
  code += '}, ' + once + ');\n';
  return code;
};
