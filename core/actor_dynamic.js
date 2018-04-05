// create namespate
Blockly.actorDynamics = Blockly.actorDynamics || {};

Blockly.actorDynamics.BUTTON_CREATE = 
    '<button text="Create actor..." callbackKey="createActorButtonPressed"></button>';

Blockly.actorDynamics.buildLabel = function (name) {
    return '<label text="' + name + '"></label>';
}

Blockly.actorDynamics.buildShadowObject = function (name) {
	return '<value name="' + name + '">' +
		'<shadow type="actor_object"></shadow>' +
		'</value>';
}

Blockly.actorDynamics.buildShadowImage = function (name) {
    return '<value name="' + name + '">' +
    '<shadow type="game_image_PlanetCute"></shadow>' +
    '</value>';
}

Blockly.actorDynamics.buildShadowNumber = function (name, defaultValue = 0) {
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

Blockly.actorDynamics.ACTOR_OBJECT =
	'<block type="actor_object"></block>';

Blockly.actorDynamics.ACTOR_GET = 
	'<block type="actor_get">' + 
	Blockly.actorDynamics.buildShadowObject('VAR') +
	'</block>';

Blockly.actorDynamics.ACTOR_GET_1 =
	'<block type="actor_get1">' +
	Blockly.actorDynamics.buildShadowObject('VAR') +
	Blockly.actorDynamics.buildShadowObject('ARG1') +
	'</block>';

Blockly.actorDynamics.ACTOR_SET =
	'<block type="actor_set">' + 
	Blockly.actorDynamics.buildShadowObject('VAR') +
	Blockly.actorDynamics.buildShadowNumber('ARG1', 100) +
	'</block>';

Blockly.actorDynamics.ACTOR_SET_1 =
	'<block type="actor_set1">' + 
	Blockly.actorDynamics.buildShadowObject('VAR') +
	Blockly.actorDynamics.buildShadowNumber('ARG1', 100) +
	'</block>';

Blockly.actorDynamics.ACTOR_SET_XY =
	'<block type="actor_setXY">' +
	Blockly.actorDynamics.buildShadowObject('VAR') +
	Blockly.actorDynamics.buildShadowNumber('X', 100) +
	Blockly.actorDynamics.buildShadowNumber('Y', 100) +
	'</block>';

Blockly.actorDynamics.ACTOR_ACTION =
	'<block type="actor_action">' +
	Blockly.actorDynamics.buildShadowObject('VAR') +
	'</block>';

Blockly.actorDynamics.ACTOR_EVERY =
	'<block type="actor_every">' +
	Blockly.actorDynamics.buildShadowObject('VAR') +
	Blockly.actorDynamics.buildShadowNumber('TIME', 0.75) +
	'</block>';

Blockly.actorDynamics.ACTOR_COLLIDE =
	'<block type="actor_collide">' +
	Blockly.actorDynamics.buildShadowImage('IMG1') +
	Blockly.actorDynamics.buildShadowImage('IMG2') +
	'</block>';

Blockly.actorDynamics.actorFlyoutCallback = function (workspace) {

    var xmlList = [];

    xmlList.push(Blockly.Xml.xmlToDom(Blockly.actorDynamics.BUTTON_CREATE));
    workspace.registerButtonCallback('createActorButtonPressed', Blockly.actorDynamics.createActorCallback);

    var actorVariables = workspace.getVariablesOfType(Blockly.Block.ACTOR_TYPE);

    if (actorVariables.length > 0) {
		xmlList.push(Blockly.Xml.xmlToDom(Blockly.actorDynamics.buildLabel(Blockly.Msg.OBJECT_CONSTRUCTOR)));
        xmlList.push(Blockly.Xml.xmlToDom(Blockly.actorDynamics.CREATE_ACTOR));

		xmlList.push(Blockly.Xml.xmlToDom(Blockly.actorDynamics.buildLabel(Blockly.Msg.OBJECT_PROPERTIES)));
		xmlList.push(Blockly.Xml.xmlToDom(Blockly.actorDynamics.ACTOR_OBJECT));
        xmlList.push(Blockly.Xml.xmlToDom(Blockly.actorDynamics.ACTOR_GET));
		xmlList.push(Blockly.Xml.xmlToDom(Blockly.actorDynamics.ACTOR_GET_1));
		xmlList.push(Blockly.Xml.xmlToDom(Blockly.actorDynamics.ACTOR_SET));
		xmlList.push(Blockly.Xml.xmlToDom(Blockly.actorDynamics.ACTOR_SET_1));
		xmlList.push(Blockly.Xml.xmlToDom(Blockly.actorDynamics.ACTOR_SET_XY));
        
		xmlList.push(Blockly.Xml.xmlToDom(Blockly.actorDynamics.buildLabel(Blockly.Msg.OBJECT_METHODS)));
		xmlList.push(Blockly.Xml.xmlToDom(Blockly.actorDynamics.ACTOR_ACTION));

		xmlList.push(Blockly.Xml.xmlToDom(Blockly.actorDynamics.buildLabel(Blockly.Msg.OBJECT_EVENTS)));
		xmlList.push(Blockly.Xml.xmlToDom(Blockly.actorDynamics.ACTOR_EVERY));
		xmlList.push(Blockly.Xml.xmlToDom(Blockly.actorDynamics.ACTOR_COLLIDE));
    }


    return xmlList;
};

Blockly.actorDynamics.createActorCallback = function (button) {
    Blockly.Variables.createVariableButtonHandler(button.getTargetWorkspace(), null, Blockly.Block.ACTOR_TYPE);
};
