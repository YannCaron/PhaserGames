Blockly.Blocks['create_actor'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("create")
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/codesite/ph/images/star_on.gif", 64, 64, "*"))
        .appendField(new Blockly.FieldNumber(0, 0), "x")
        .appendField(new Blockly.FieldNumber(0, 0), "y");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
 this.setTooltip("loop");
 this.setHelpUrl("");
  }
};