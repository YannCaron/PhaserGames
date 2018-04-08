// create namespace
Blockly.gameDynamic = Blockly.gameDynamic || {};

Blockly.gameDynamic.CREATE_GAME =
    '<block type="create_game">' +
    Blockly.dynamic.buildShadowBackground('IMG') +
    Blockly.dynamic.buildShadowNumber('W', Blockly.Block.GAME_WIDTH) +
    Blockly.dynamic.buildShadowNumber('H', Blockly.Block.GAME_HEIGHT) +
    '</block>';

Blockly.gameDynamic.GAME_GET =
    '<block type="game_get"></block>';

Blockly.gameDynamic.CAMERA_FOLLOW =
    '<block type="camera_follow">' +
    Blockly.dynamic.buildShadowObject('VAR') +
    '</block>';

Blockly.gameDynamic.buildGamePrint = function (value) {
    return '<block type="game_print">' +
        Blockly.dynamic.buildShadowNumber('X', 30) +
        Blockly.dynamic.buildShadowNumber('Y', 30) +
        '<value name="TEXT"><block type="text_join" inline="true">' +
        '<value name="ADD0"><shadow type="text"><field name="TEXT">' + value + ': </field></shadow></value>' +
        Blockly.dynamic.buildShadowVariable('ADD1', value) +
        '</block></value>' +
        '</block>';
}

Blockly.gameDynamic.GAME_DEBUG =
    '<block type="game_debug"></block>';

Blockly.gameDynamic.buildDebugVar = function (value) {
    return '<block type="debug_var">' +
        Blockly.dynamic.buildShadowVariable('VAR', value) +
        '</block>';
}

Blockly.gameDynamic.GAME_ALWAYS =
    '<block type="game_always"></block>';

Blockly.gameDynamic.GAME_EVERY =
    '<block type="game_every"></block>';

Blockly.gameDynamic.KEY_EVENT =
    '<block type="key_event"></block>';

Blockly.gameDynamic.MOUSE_EVENT =
    '<block type="mouse_event"></block>';

Blockly.gameDynamic.gameFlyoutCallback = function (workspace) {
    var xmlList = [];

    // variable sorted not type first
    var variables = workspace.getAllVariables().sort(function (a, b) {
        if (a.type) return 1;
        else if (b.type) -1;
        else 0;
    });
    var actorVariables = workspace.getVariablesOfType(Blockly.Block.ACTOR_TYPE);

    // debug
    xmlList.push(Blockly.Xml.xmlToDom(Blockly.dynamic.buildLabel(Blockly.Msg.BLOCK_DEBUG)));
    xmlList.push(Blockly.Xml.xmlToDom(Blockly.gameDynamic.GAME_DEBUG));

    if (variables.length > 0) {
        xmlList.push(Blockly.Xml.xmlToDom(Blockly.gameDynamic.buildDebugVar(variables[0].name)));
    }

    // properties
    xmlList.push(Blockly.Xml.xmlToDom(Blockly.dynamic.buildLabel(Blockly.Msg.OBJECT_PROPERTIES)));
    xmlList.push(Blockly.Xml.xmlToDom(Blockly.gameDynamic.GAME_GET));
    xmlList.push(Blockly.Xml.xmlToDom(Blockly.gameDynamic.CREATE_GAME));

    // methods
    xmlList.push(Blockly.Xml.xmlToDom(Blockly.dynamic.buildLabel(Blockly.Msg.OBJECT_METHODS)));

    if (actorVariables.length > 0) {
        xmlList.push(Blockly.Xml.xmlToDom(Blockly.gameDynamic.CAMERA_FOLLOW));
    }

    if (variables.length > 0) {
        xmlList.push(Blockly.Xml.xmlToDom(Blockly.gameDynamic.buildGamePrint(variables[0].name)));
    }

    // events
    xmlList.push(Blockly.Xml.xmlToDom(Blockly.dynamic.buildLabel(Blockly.Msg.OBJECT_EVENTS)));
    xmlList.push(Blockly.Xml.xmlToDom(Blockly.gameDynamic.GAME_ALWAYS));
    xmlList.push(Blockly.Xml.xmlToDom(Blockly.gameDynamic.GAME_EVERY));
    xmlList.push(Blockly.Xml.xmlToDom(Blockly.gameDynamic.KEY_EVENT));
    xmlList.push(Blockly.Xml.xmlToDom(Blockly.gameDynamic.MOUSE_EVENT));


    return xmlList;
};
