// global
Blockly.Blocks.event = Blockly.Blocks.event || {};
Blockly.Blocks.event.HUE = Blockly.Msg.EVENT_HUE;

Blockly.Block.IMAGE_TYPE = 'Image';
Blockly.Block.ACTOR_TYPE = 'Actor';

Blockly.Block.GAME_WIDTH = 1024;
Blockly.Block.GAME_HEIGHT = 768;

Blockly.Block.BACKGROUND_CATEGORY = 'Background';

// dynamic
Blockly.dynamic = Blockly.dynamic || {};

Blockly.dynamic.buildLabel = function (name) {
    return '<label text="' + name + '"></label>';
}

Blockly.dynamic.buildShadowVariable = function (name, value = '') {
    return '<value name="' + name + '">' +
        '<shadow type="variables_get"><field name="VAR">' + value + '</field></shadow>' +
        '</value>';
}

Blockly.dynamic.buildShadowObject = function (name) {
    return '<value name="' + name + '">' +
        '<shadow type="actor_object"></shadow>' +
        '</value>';
}

Blockly.dynamic.buildShadowBackground = function (name) {
    return '<value name="' + name + '">' +
        '<shadow type="game_image_' + Blockly.Block.BACKGROUND_CATEGORY + '"></shadow>' +
        '</value>';
}

Blockly.dynamic.buildShadowImage = function (name) {
    return '<value name="' + name + '">' +
        '<shadow type="game_image_PlanetCute"></shadow>' +
        '</value>';
}

Blockly.dynamic.buildShadowNumber = function (name, defaultValue = 0) {
    return '<value name="' + name + '">' +
        '<shadow type="math_number">' +
        '<field name="NUM">' + defaultValue + '</field>' +
        '</shadow>' +
        '</value>';
};

// block
Blockly.Block.prototype.getLastCreatedActor = function () {
    var variables = this.workspace.getVariablesOfType(Blockly.Block.ACTOR_TYPE);
    if (variables.length <= 0) {
        return null;
    }
    return variables[variables.length - 1].name;
}

Blockly.Block.optionList = function (options) {
    var result = [];
    for (var i in options) {
        result.push(' - ' + options[i][0]);
    }
    return result.join('\n');
}

Blockly.Block.prototype.fieldActorFactory = function () {
    return new Blockly.FieldVariable(
        this.getLastCreatedActor(),
        null, [Blockly.Block.ACTOR_TYPE], Blockly.Block.ACTOR_TYPE);
}

// xml
Blockly.Xml.xmlToDom = function (xml) {
    return Blockly.Xml.textToDom('<xml>' + xml + '</xml>').firstChild;
}