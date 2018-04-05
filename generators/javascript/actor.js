Blockly.JavaScript['create_actor'] = function (block) {
    var img = Blockly.JavaScript.valueToCode(block, 'IMG', Blockly.JavaScript.ORDER_ATOMIC);
    var varName = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC);
    var y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC);

    var code = varName + ' = game.createActor(' + img + ', ' + x + ', ' + y + ');\n';
    return code;
};

/*
Blockly.JavaScript['create_actor'] = function (block) {
    var img = Blockly.JavaScript.valueToCode(block, 'IMG', Blockly.JavaScript.ORDER_ATOMIC);
    var x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC);
    var y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC);

    var code = 'game.createActor(' + img + ', ' + x + ', ' + y + ')';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};*/

Blockly.JavaScript['actor_get'] = function (block) {
    var varName = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var method = block.getFieldValue('PROPERTY');

    var code = varName + '.' + method;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['actor_get1'] = function (block) {
    var varName = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var method = block.getFieldValue('PROPERTY');
    var arg1 = Blockly.JavaScript.valueToCode(block, 'ARG1', Blockly.JavaScript.ORDER_ATOMIC);

    var code = varName + '.' + method + '(' + arg1 + ')';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['actor_set'] = function (block) {
    var varName = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var method = block.getFieldValue('PROPERTY');
    var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);

    var code = varName + '.' + method + ' = ' + value + ";\n";
    return code;
};

Blockly.JavaScript['actor_set1'] = function (block) {
    var varName = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var method = block.getFieldValue('METHOD');
    var arg1 = Blockly.JavaScript.valueToCode(block, 'ARG1', Blockly.JavaScript.ORDER_ATOMIC);
    var code = varName + '.' + method + ' (' + arg1 + ');\n';
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

Blockly.JavaScript['actor_every'] = function (block) {
    var varName = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var event = block.getFieldValue('EVENT');
    var time = Blockly.JavaScript.valueToCode(block, 'TIME', Blockly.JavaScript.ORDER_ATOMIC);
    var stmt = Blockly.JavaScript.statementToCode(block, 'STMT');

    var code = varName + '.onTime(new Error().lineNumber, ' + time + ', function (' + varName + ') {\n';
    code += stmt;
    code += '}, ' + event + ');\n';
    return code;
};

Blockly.JavaScript['actor_collide'] = function (block) {
    var obj1 = block.getFieldValue('OBJ1');
    var event = block.getFieldValue('EVENT');
    var obj2 = block.getFieldValue('OBJ2');
    var id1 = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('ID1'), Blockly.Variables.NAME_TYPE);
    var id2 = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('ID2'), Blockly.Variables.NAME_TYPE);
    var stmt = Blockly.JavaScript.statementToCode(block, 'STMT');
    var once = block.getFieldValue('ONCE') == 'TRUE';

    var code = 'game.' + event + '(\'' + obj1 + '\', \'' + obj2 + '\', function (' + id1 + ', ' + id2 + ') {\n';
    code += stmt;
    code += '}, ' + once + ');\n';
    return code;
};