Blockly.JavaScript['create_actor'] = function (block) {
    var img = Blockly.JavaScript.valueToCode(block, 'IMG', Blockly.JavaScript.ORDER_ATOMIC);
    var varName = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC);
    var y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC);

    var code = varName + ' = game.createActor(' + img + ', ' + x + ', ' + y + ');\n';
    return code;
};

Blockly.JavaScript['actor_object'] = function (block) {
    var variable_var = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var code = variable_var;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['actor_get'] = function (block) {
    var varName = Blockly.JavaScript.valueToCode(block, 'VAR', Blockly.JavaScript.ORDER_ATOMIC);
    var property = block.getFieldValue('PROPERTY');

    var code = varName + '.' + property;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['actor_get1'] = function (block) {
    var varName = Blockly.JavaScript.valueToCode(block, 'VAR', Blockly.JavaScript.ORDER_ATOMIC);
    var property = block.getFieldValue('PROPERTY');
    var arg1 = Blockly.JavaScript.valueToCode(block, 'ARG1', Blockly.JavaScript.ORDER_ATOMIC);

    var code = varName + '.' + property + '(' + arg1 + ')';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['actor_set'] = function (block) {
    var varName = Blockly.JavaScript.valueToCode(block, 'VAR', Blockly.JavaScript.ORDER_ATOMIC);
    var property = block.getFieldValue('PROPERTY');
    var arg1 = Blockly.JavaScript.valueToCode(block, 'ARG1', Blockly.JavaScript.ORDER_ATOMIC);

    var code = varName + '.' + property + ' = ' + arg1 + ";\n";
    return code;
};

Blockly.JavaScript['actor_set1'] = function (block) {
    var varName = Blockly.JavaScript.valueToCode(block, 'VAR', Blockly.JavaScript.ORDER_ATOMIC);
    var property = block.getFieldValue('PROPERTY');
    var arg1 = Blockly.JavaScript.valueToCode(block, 'ARG1', Blockly.JavaScript.ORDER_ATOMIC);
    var code = varName + '.' + property + ' (' + arg1 + ');\n';
    return code;
};

Blockly.JavaScript['actor_setXY'] = function (block) {
    var varName = Blockly.JavaScript.valueToCode(block, 'VAR', Blockly.JavaScript.ORDER_ATOMIC);
    var property = block.getFieldValue('PROPERTY');
    var x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC);
    var y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC);
    var code = varName + '.' + property + ' (' + x + ', ' + y + ');\n';
    return code;
};

Blockly.JavaScript['actor_action'] = function (block) {
    var varName = Blockly.JavaScript.valueToCode(block, 'VAR', Blockly.JavaScript.ORDER_ATOMIC);
    var method = block.getFieldValue('METHOD');
    var code = varName + '.' + method + ';\n';
    return code;
};

Blockly.JavaScript['actor_every'] = function (block) {
    var varName = Blockly.JavaScript.valueToCode(block, 'VAR', Blockly.JavaScript.ORDER_ATOMIC);
    var event = block.getFieldValue('EVENT');
    var time = Blockly.JavaScript.valueToCode(block, 'TIME', Blockly.JavaScript.ORDER_ATOMIC);
    var stmt = Blockly.JavaScript.statementToCode(block, 'STMT');

    var code = varName + '.onTime(new Error().lineNumber, ' + time + ', function (' + varName + ') {\n';
    code += stmt;
    code += '}, ' + event + ');\n';
    return code;
};

Blockly.JavaScript['actor_collide'] = function (block) {
    var img1 = Blockly.JavaScript.valueToCode(block, 'IMG1', Blockly.JavaScript.ORDER_ATOMIC);
    var event = block.getFieldValue('EVENT');
    var img2 = Blockly.JavaScript.valueToCode(block, 'IMG2', Blockly.JavaScript.ORDER_ATOMIC);
    var id1 = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('ID1'), Blockly.Variables.NAME_TYPE);
    var id2 = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('ID2'), Blockly.Variables.NAME_TYPE);
    var stmt = Blockly.JavaScript.statementToCode(block, 'STMT');
    var once = block.getFieldValue('ONCE') == 'TRUE';

    var code = 'game.' + event + '(' + img1 + ', ' + img2 + ', function (' + id1 + ', ' + id2 + ') {\n';
    code += stmt;
    code += '}, ' + once + ');\n';
    return code;
};