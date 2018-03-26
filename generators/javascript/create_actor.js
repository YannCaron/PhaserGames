Blockly.JavaScript['create_actor'] = function(block) {
  var number_x = block.getFieldValue('x');
  var number_y = block.getFieldValue('y');
  // TODO: Assemble JavaScript into code variable.
  var code = 'var myActor = createActor(\'myImage.png\');\n';
  return code;
};
