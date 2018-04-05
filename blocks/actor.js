// Global
Blockly.Blocks.actor = {};
Blockly.Blocks.actor.HUE = Blockly.Msg.ACTOR_HUE;

Blockly.Block.ACTOR_TYPE = 'Actor';

Blockly.Block.prototype.getLastCreatedActor = function() {
    var variables = this.workspace.getVariablesOfType(Blockly.Block.ACTOR_TYPE);
    if (variables.length <= 0) {
        return null;
    }
    return variables[variables.length-1].name;
}

Blockly.Block.prototype.fieldActorFactory = function () {
    return new Blockly.FieldVariable(
        this.getLastCreatedActor(),
        null, [Blockly.Block.ACTOR_TYPE], Blockly.Block.ACTOR_TYPE);
}

// constructor
Blockly.Blocks['create_actor'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("create")
            .appendField(this.fieldActorFactory(), "VAR");
        this.appendValueInput("IMG")
            .setCheck("Image")
            .appendField("with")
        this.appendValueInput("X")
            .setCheck("Number")
            .appendField("x to");
        this.appendValueInput("Y")
            .setCheck("Number")
            .appendField("y to");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.actor.HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    },

    runIn: 'create'
};

// ------------------------- old part
// Actor



Blockly.Block.actorProperties = [
    ["x", "x"],
    ["y", "y"],
    ["velocity x", "body.velocity.x"],
    ["velocity y", "body.velocity.y"],
    ["gravity x", "body.gravity.x"],
    ["gravity y", "body.gravity.y"],
    ["angle", "angle"],
];

Blockly.Blocks['actor_get'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("with")
            .appendField(new Blockly.FieldVariable(Blockly.Block.DEFAULT_VAR, Blockly.Block.ACTOR_TYPE), "VAR")
            .appendField("get")
            .appendField(new Blockly.FieldDropdown(Blockly.Block.actorProperties), "PROPERTY");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(Blockly.Blocks.actor.HUE);
        this.setTooltip("");
        this.setHelpUrl("");

        this.setOnChange(this.selectNearestVar);

    },

    runIn: 'create'

};

Blockly.Blocks['actor_set'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("with")
            .appendField(new Blockly.FieldVariable(Blockly.Block.DEFAULT_VAR), "VAR")
            .appendField("set")
            .appendField(new Blockly.FieldDropdown(Blockly.Block.actorProperties), "PROPERTY");
        this.appendValueInput("VALUE")
            .appendField("to")
            .setCheck("Number")
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.actor.HUE);
        this.setTooltip("");
        this.setHelpUrl("");

        this.setOnChange(this.selectNearestVar);

    },

    runIn: 'create'

};

Blockly.Blocks['actor_get1'] = {
    init: function () {
        var options = [
            ["angle with", "getAngleWith"],
            ["distance with", "getDistanceWith"]
        ];
        this.appendDummyInput()
            .appendField("with")
            .appendField(new Blockly.FieldVariable(Blockly.Block.DEFAULT_VAR), "VAR")
            .appendField("get")
            .appendField(new Blockly.FieldDropdown(options), "PROPERTY");
        this.appendValueInput("ARG1")
            .setCheck("Actor")
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(Blockly.Blocks.actor.HUE);
        this.setTooltip("");
        this.setHelpUrl("");

        this.setOnChange(this.selectNearestVar);

    },

    runIn: 'create'

};

Blockly.Blocks['actor_set1'] = {
    init: function () {
        var options = [
            ["velocity from angle", "VelocityFromAngle"],
        ];
        var units = {
            "VelocityFromAngle": "px",
        }
        this.appendDummyInput()
            .appendField("with")
            .appendField(new Blockly.FieldVariable(Blockly.Block.DEFAULT_VAR), "VAR")
            .appendField("set")
            .appendField(new Blockly.FieldDropdown(options, function (value) {
                this.sourceBlock_.getInput('UNIT').fieldRow[1].setText(units[value]);
            }), "METHOD");
        this.appendValueInput("ARG1")
            .setCheck("Number")
            .appendField("to");
        this.appendDummyInput('UNIT')
            .appendField("in")
            .appendField(Object.values(units)[0]);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.actor.HUE);
        this.setTooltip("");
        this.setHelpUrl("");

        this.setOnChange(this.selectNearestVar);

    },

    runIn: 'create'

};

Blockly.Blocks['actor_setXY'] = {
    init: function () {
        var options = [
            ["scale", "scaleTo"],
            ["bounce", "setBounce"],
            ["friction", "setFriction"],
        ];
        var units = {
            "scaleTo": "%",
            "setBounce": "%",
            "setFriction": "%",
        }
        this.appendDummyInput()
            .appendField("with")
            .appendField(new Blockly.FieldVariable(Blockly.Block.DEFAULT_VAR), "VAR")
            .appendField("set")
            .appendField(new Blockly.FieldDropdown(options, function (value) {
                this.sourceBlock_.getInput('UNIT').fieldRow[1].setText(units[value]);
            }), "METHOD");
        this.appendValueInput("X")
            .setCheck("Number")
            .appendField("x to");
        this.appendValueInput("Y")
            .setCheck("Number")
            .appendField("and y to");
        this.appendDummyInput('UNIT')
            .appendField("in")
            .appendField(Object.values(units)[0]);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.actor.HUE);
        this.setTooltip("");
        this.setHelpUrl("");

        this.setOnChange(this.selectNearestVar);

    },

    runIn: 'create'

};

Blockly.Blocks['actor_action'] = {
    init: function () {
        var self = this;
        var options = [
            ["collide bounds", "body.collideWorldBounds = true"],
            ["immovable", "body.immovable = true"],
            ["rotate when collide", "rotateOnCollide()"],
            ["destroy", "kill()"],
        ];
        this.appendDummyInput()
            .appendField("with")
            .appendField(new Blockly.FieldVariable("actor"), "VAR")
            .appendField("do")
            .appendField(new Blockly.FieldDropdown(options), "ACTION")
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.actor.HUE);
        this.setTooltip("");
        this.setHelpUrl("");

        this.setOnChange(this.selectNearestVar);
    },

    runIn: 'create'
};

Blockly.Blocks['actor_every'] = {
    init: function () {
        var options = [
            ["in", "Phaser.Sprite.TimeMode.IN"],
            ["in and every other", "Phaser.Sprite.TimeMode.IN_AND_AFTER"],
            ["every", "Phaser.Sprite.TimeMode.EVERY"]
        ];
        this.appendDummyInput()
            .appendField("with")
            .appendField(new Blockly.FieldVariable("actor"), "VAR")
            .appendField(new Blockly.FieldDropdown(options), "EVENT")
        this.appendValueInput("TIME")
            .setCheck("Number");
        this.appendDummyInput()
            .appendField("seconds");
        this.appendStatementInput("STMT")
            .setCheck(null)
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.event.HUE);
        this.setTooltip("");
        this.setHelpUrl("");

        this.setOnChange(this.selectNearestVar);
    },

    runIn: 'create'
};

Blockly.Blocks['actor_collide'] = {
    init: function () {
        var options = [
            ["collide", "onCollide"],
            ["overlap", "onOverlap"]
        ];
        this.appendDummyInput()
            .appendField("when")
            .appendField(new Blockly.FieldDropdown(Blockly.gameImages), 'OBJ1')
            .appendField(new Blockly.FieldDropdown(options), "EVENT")
            .appendField("with")
            .appendField(new Blockly.FieldDropdown(Blockly.gameImages), 'OBJ2')
            .appendField("once")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "ONCE");
        this.appendStatementInput("STMT")
            .setCheck(null)
            .appendField(new Blockly.FieldVariable("actor1"), "ID1")
            .appendField(new Blockly.FieldVariable("actor2"), "ID2");
        this.setInputsInline(false);
        this.setColour(Blockly.Blocks.event.HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    },

    runIn: 'update'
};
