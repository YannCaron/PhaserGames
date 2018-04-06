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

Blockly.gameDynamic.DEBUG_VAR =
    '<block type="debug_var">' +
    Blockly.dynamic.buildShadowObject('VAR') +
    '</block>';

Blockly.gameDynamic.gameFlyoutCallback = function (workspace) {
    var xmlList = [];

    // variable sorted not type first
    var variables = workspace.getAllVariables().sort(function (a, b) {
        if (a.type) return 1;
        else if (b.type) -1;
        else 0;
    });
    console.log(variables);
    var actorVariables = workspace.getVariablesOfType(Blockly.Block.ACTOR_TYPE);

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

    // debug
    xmlList.push(Blockly.Xml.xmlToDom(Blockly.dynamic.buildLabel(Blockly.Msg.BLOCK_DEBUG)));
    xmlList.push(Blockly.Xml.xmlToDom(Blockly.gameDynamic.GAME_DEBUG));

    xmlList.push(Blockly.Xml.xmlToDom(Blockly.gameDynamic.DEBUG_VAR));

    return xmlList;
};

/*
			<block type="game_print">
				<value name="X">
					<shadow type="math_number">
						<field name="NUM">30</field>
					</shadow>
				</value>
				<value name="Y">
					<shadow type="math_number">
						<field name="NUM">30</field>
					</shadow>
				</value>
				<value name="TEXT"><shadow type="text"><field name="TEXT">Hi Code4Kids !</field>/shadow></value>
			</block>
			<label text="Events"></label>
			<block type="game_always"></block>
			<block type="game_every"></block>
			<block type="key_event"></block>
			<block type="mouse_event"></block>
*/