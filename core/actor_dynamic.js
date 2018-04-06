// create namespate
Blockly.actorDynamic = Blockly.actorDynamic || {};

Blockly.actorDynamic.BUTTON_CREATE = 
    '<button text="Create actor..." callbackKey="createActorButtonPressed"></button>';

Blockly.actorDynamic.CREATE_ACTOR =
    '<block type="create_actor">' +
	Blockly.dynamic.buildShadowImage('IMG') +
	Blockly.dynamic.buildShadowNumber('X', 100) +
	Blockly.dynamic.buildShadowNumber('Y', 100) +
    '</block>';

Blockly.actorDynamic.ACTOR_OBJECT =
	'<block type="actor_object"></block>';

Blockly.actorDynamic.ACTOR_GET = 
	'<block type="actor_get">' + 
	Blockly.dynamic.buildShadowObject('VAR') +
	'</block>';

Blockly.actorDynamic.ACTOR_GET_1 =
	'<block type="actor_get1">' +
	Blockly.dynamic.buildShadowObject('VAR') +
	Blockly.dynamic.buildShadowObject('ARG1') +
	'</block>';

Blockly.actorDynamic.ACTOR_SET =
	'<block type="actor_set">' + 
	Blockly.dynamic.buildShadowObject('VAR') +
	Blockly.dynamic.buildShadowNumber('ARG1', 100) +
	'</block>';

Blockly.actorDynamic.ACTOR_SET_1 =
	'<block type="actor_set1">' + 
	Blockly.dynamic.buildShadowObject('VAR') +
	Blockly.dynamic.buildShadowNumber('ARG1', 100) +
	'</block>';

Blockly.actorDynamic.ACTOR_SET_XY =
	'<block type="actor_setXY">' +
	Blockly.dynamic.buildShadowObject('VAR') +
	Blockly.dynamic.buildShadowNumber('X', 100) +
	Blockly.dynamic.buildShadowNumber('Y', 100) +
	'</block>';

Blockly.actorDynamic.ACTOR_ACTION =
	'<block type="actor_action">' +
	Blockly.dynamic.buildShadowObject('VAR') +
	'</block>';

Blockly.actorDynamic.ACTOR_EVERY =
	'<block type="actor_every">' +
	Blockly.dynamic.buildShadowObject('VAR') +
	Blockly.dynamic.buildShadowNumber('TIME', 0.75) +
	'</block>';

Blockly.actorDynamic.ACTOR_COLLIDE =
	'<block type="actor_collide">' +
	Blockly.dynamic.buildShadowImage('IMG1') +
	Blockly.dynamic.buildShadowImage('IMG2') +
	'</block>';

Blockly.actorDynamic.actorFlyoutCallback = function (workspace) {

    var xmlList = [];

    xmlList.push(Blockly.Xml.xmlToDom(Blockly.actorDynamic.BUTTON_CREATE));
    workspace.registerButtonCallback('createActorButtonPressed', Blockly.actorDynamic.createActorCallback);

    var actorVariables = workspace.getVariablesOfType(Blockly.Block.ACTOR_TYPE);

    if (actorVariables.length > 0) {
		xmlList.push(Blockly.Xml.xmlToDom(Blockly.dynamic.buildLabel(Blockly.Msg.OBJECT_CONSTRUCTOR)));
        xmlList.push(Blockly.Xml.xmlToDom(Blockly.actorDynamic.CREATE_ACTOR));

		xmlList.push(Blockly.Xml.xmlToDom(Blockly.dynamic.buildLabel(Blockly.Msg.OBJECT_PROPERTIES)));
		xmlList.push(Blockly.Xml.xmlToDom(Blockly.actorDynamic.ACTOR_OBJECT));
        xmlList.push(Blockly.Xml.xmlToDom(Blockly.actorDynamic.ACTOR_GET));
		xmlList.push(Blockly.Xml.xmlToDom(Blockly.actorDynamic.ACTOR_GET_1));
		xmlList.push(Blockly.Xml.xmlToDom(Blockly.actorDynamic.ACTOR_SET));
		xmlList.push(Blockly.Xml.xmlToDom(Blockly.actorDynamic.ACTOR_SET_1));
		xmlList.push(Blockly.Xml.xmlToDom(Blockly.actorDynamic.ACTOR_SET_XY));
        
		xmlList.push(Blockly.Xml.xmlToDom(Blockly.dynamic.buildLabel(Blockly.Msg.OBJECT_METHODS)));
		xmlList.push(Blockly.Xml.xmlToDom(Blockly.actorDynamic.ACTOR_ACTION));

		xmlList.push(Blockly.Xml.xmlToDom(Blockly.dynamic.buildLabel(Blockly.Msg.OBJECT_EVENTS)));
		xmlList.push(Blockly.Xml.xmlToDom(Blockly.actorDynamic.ACTOR_EVERY));
		xmlList.push(Blockly.Xml.xmlToDom(Blockly.actorDynamic.ACTOR_COLLIDE));
    }


    return xmlList;
};

Blockly.actorDynamic.createActorCallback = function (button) {
    Blockly.Variables.createVariableButtonHandler(button.getTargetWorkspace(), null, Blockly.Block.ACTOR_TYPE);
};
