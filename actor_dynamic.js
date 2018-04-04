// create namespate
Blockly.actorDynamics = Blockly.actorDynamics || {};

Blockly.actorDynamics.BUTTON_CREATE = 
    '<button text="Create actor..." callbackKey="createActorButtonPressed"></button>';

Blockly.actorDynamics.buildLabel = function (name) {
    return '<label text="' + name + '"></label>';
}

Blockly.actorDynamics.buildShadowImage = function (name) {
    return '<value name="' + name + '">' +
    '<shadow type="game_image"></shadow>' +
    '</value>';
}

Blockly.actorDynamics.buildShadowNumber = function (name, defaultValue) {
    return '<value name="' + name + '">' +
        '<shadow type="math_number">' +
        '<field name="NUM">' + defaultValue + '</field>' +
        '</shadow>' +
        '</value>';
};

Blockly.actorDynamics.CREATE_BUTTON =
    '<block type="create_actor">' +
    Blockly.actorDynamics.buildShadowImage('IMG') +
    Blockly.actorDynamics.buildShadowNumber('X', 100) +
    Blockly.actorDynamics.buildShadowNumber('Y', 100) +
    '</block>';

Blockly.actorDynamics.buildXml = function (xml) {
    return Blockly.Xml.textToDom('<xml>' + xml + '</xml>').firstChild;
}

Blockly.actorDynamics.actorFlyoutCallback = function (workspace) {

    var xmlList = [];

    if (true) {
        xmlList.push(Blockly.actorDynamics.buildXml(Blockly.actorDynamics.BUTTON_CREATE));
        xmlList.push(Blockly.actorDynamics.buildXml(Blockly.actorDynamics.buildLabel('constructor')));
        xmlList.push(Blockly.actorDynamics.buildXml(Blockly.actorDynamics.CREATE_BUTTON));
    }

    workspace.registerButtonCallback('createActorButtonPressed', Blockly.actorDynamics.createActorCallback);

    return xmlList;
};

Blockly.actorDynamics.createActorCallback = function () {
    alert('create actor');
};