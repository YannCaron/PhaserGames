// global
Blockly.Blocks.event = {};
Blockly.Blocks.event.HUE = Blockly.Msg.EVENT_HUE;

Blockly.Block.IMAGE_TYPE = 'Image';
Blockly.Block.ACTOR_TYPE = 'Actor';

Blockly.Block.prototype.getLastCreatedActor = function () {
    var variables = this.workspace.getVariablesOfType(Blockly.Block.ACTOR_TYPE);
    if (variables.length <= 0) {
        return null;
    }
    return variables[variables.length - 1].name;
}

String.prototype.format = function () {
    var result = '' + this;
    for (var i = 0; i < arguments.length; i++) {
        result = result.replace('%' + (i+1), arguments[i]);
    }
    return result;
}

Blockly.Block.optionList = function (options) {
    var result = [];
    for (var i in options) {
        result.push(' - ' + options[i][0]);
    }
    return result.join('\n');
}

Blockly.Xml.xmlToDom = function (xml) {
    return Blockly.Xml.textToDom('<xml>' + xml + '</xml>').firstChild;
}