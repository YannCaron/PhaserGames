// Game
Blockly.JavaScript['game_debug'] = function (block) {
  var code = 'game.debugGame();\n';
  return code;
};

Blockly.JavaScript['camera_follow'] = function (block) {
  var name = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  var code = 'game.camera.follow(' + name + ', Phaser.Camera.FOLLOW_LOCKON, 1, 0.1);\n';
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

  console.log(block);
  //console.log(block.getParent());

  var code = 'game.createActor(' + img + ', ' + x + ', ' + y + ')';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

/*
Blockly.JavaScript['actor_setNumber'] = function (block) {
  var name = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  var accessor = block.getFieldValue('ACCESSOR');
  var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);
  var code = name + '.' + accessor + ' = ' + value + ';\n';
  return code;
};*/

Blockly.JavaScript['actor_setXY'] = function (block) {
  var name = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  var method = block.getFieldValue('METHOD');
  var x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC);
  var y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC);
  var code = name + '.' + method + ' (' + x + ', ' + y + ');\n';
  return code;
};
Blockly.JavaScript['actor_action'] = function (block) {
  var name = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  var action = block.getFieldValue('ACTION');
  var code = name + '.' + action + ';\n';
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