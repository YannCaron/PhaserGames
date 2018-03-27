var gameImgs = {};
gameImgs["PlanetCute-Character-Boy"] = 'assets/img/PlanetCute/Character Boy.png';
gameImgs["PlanetCute-Character-Cat-Girl"] = 'assets/img/PlanetCute/Character Cat Girl.png';
gameImgs["PlanetCute-Character-Horn-Girl"] = 'assets/img/PlanetCute/Character Horn Girl.png';


Blockly.Blocks['create_actor'] = {

  init: function() {
    var options = [];
    for (var key in gameImgs) {
      options.push([{ 'src': gameImgs[key], 'width': 50, 'height': 50 }, key]);
    }

    this.appendDummyInput()
        .appendField("create")
        .appendField(new Blockly.FieldDropdown(options), 'IMG')
        .appendField(new Blockly.FieldNumber(0, 0), "x")
        .appendField(new Blockly.FieldNumber(0, 0), "y");
    this.setOutput(true, "actor");
    this.setColour(210);
 this.setTooltip("Create a new actor in the game.");
 this.setHelpUrl("");
  }
};