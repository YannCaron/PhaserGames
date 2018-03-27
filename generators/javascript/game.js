Blockly.JavaScript['create_actor'] = function(block) {
  var img = block.getFieldValue('IMG');
  var x = block.getFieldValue('x');
  var y = block.getFieldValue('y');
  // TODO: Assemble JavaScript into code variable.
  var code = 'var myActor = createActor(\'' + img + '\', ' + x + ', ' + y + ');\n';
  return code;
};
