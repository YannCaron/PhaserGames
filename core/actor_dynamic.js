// create namespate
Blockly.actorDynamics = Blockly.actorDynamics || {};

Blockly.actorDynamics.BUTTON_CREATE = 
    '<button text="Create actor..." callbackKey="createActorButtonPressed"></button>';

Blockly.actorDynamics.buildLabel = function (name) {
    return '<label text="' + name + '"></label>';
}

Blockly.actorDynamics.buildShadowImage = function (name) {
    return '<value name="' + name + '">' +
    '<shadow type="game_image_PlanetCute"></shadow>' +
    '</value>';
}

Blockly.actorDynamics.buildShadowNumber = function (name, defaultValue) {
    return '<value name="' + name + '">' +
        '<shadow type="math_number">' +
        '<field name="NUM">' + defaultValue + '</field>' +
        '</shadow>' +
        '</value>';
};

Blockly.actorDynamics.CREATE_ACTOR =
    '<block type="create_actor">' +
    Blockly.actorDynamics.buildShadowImage('IMG') +
    Blockly.actorDynamics.buildShadowNumber('X', 100) +
    Blockly.actorDynamics.buildShadowNumber('Y', 100) +
    '</block>';

Blockly.actorDynamics.actorFlyoutCallback = function (workspace) {

    var xmlList = [];

    xmlList.push(Blockly.Xml.xmlToDom(Blockly.actorDynamics.BUTTON_CREATE));
    workspace.registerButtonCallback('createActorButtonPressed', Blockly.actorDynamics.createActorCallback);

    var actorVariables = workspace.getVariablesOfType(Blockly.Block.ACTOR_TYPE);

    if (actorVariables.length > 0) {
        xmlList.push(Blockly.Xml.xmlToDom(Blockly.actorDynamics.buildLabel('constructor')));
        xmlList.push(Blockly.Xml.xmlToDom(Blockly.actorDynamics.CREATE_ACTOR));
    }


    return xmlList;
};

Blockly.actorDynamics.createActorCallback = function (button) {
    Blockly.Variables.createVariableButtonHandler(button.getTargetWorkspace(), null, Blockly.Block.ACTOR_TYPE);
};
