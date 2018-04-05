// global
Blockly.Blocks.actor = {};
Blockly.Blocks.actor.HUE = Blockly.Msg.ACTOR_HUE;

Blockly.Block.prototype.fieldActorFactory = function () {
    return new Blockly.FieldVariable(
        this.getLastCreatedActor(),
        null, [Blockly.Block.ACTOR_TYPE], Blockly.Block.ACTOR_TYPE);
}

// constructor
Blockly.Blocks['create_actor'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.BLOCK_CREATE)
            .appendField(this.fieldActorFactory(), "VAR");
        this.appendValueInput("IMG")
            .setCheck(Blockly.Block.IMAGE_TYPE)
            .appendField(Blockly.Msg.BLOCK_WITH)
        this.appendValueInput("X")
            .setCheck("Number")
            .appendField(Blockly.Msg.BLOCK_X_TO);
        this.appendValueInput("Y")
            .setCheck("Number")
            .appendField(Blockly.Msg.BLOCK_Y_TO);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.actor.HUE);
        this.setTooltip(Blockly.Msg.TOOLTIP_ACTOR_CREATE);
        this.setHelpUrl("");
    },

    runIn: 'create'
};

Blockly.Blocks['actor_object'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(this.fieldActorFactory(), "VAR");
        this.setOutput(true, Blockly.Block.ACTOR_TYPE);
        this.setColour(Blockly.Blocks.actor.HUE);
        this.setTooltip(Blockly.Msg.TOOLTIP_ACTOR_OBJECT);
        this.setHelpUrl("");
    }
};

// accessor
Blockly.Blocks['actor_get'] = {

    init: function () {
        this.OPTIONS = [
            ["x", "x"],
            ["y", "y"],
            [Blockly.Msg.BLOCK_VELOCITY + " x", "body.velocity.x"],
            [Blockly.Msg.BLOCK_VELOCITY + " y", "body.velocity.y"],
            [Blockly.Msg.BLOCK_GRAVITY + " x", "body.gravity.x"],
            [Blockly.Msg.BLOCK_GRAVITY + " y", "body.gravity.y"],
            [Blockly.Msg.BLOCK_ANGLE, "angle"],
        ];

        this.appendValueInput("VAR")
            .appendField(Blockly.Msg.BLOCK_WITH)
            .setCheck("Actor")
        this.appendDummyInput()
            .appendField(Blockly.Msg.BLOCK_GET)
            .appendField(new Blockly.FieldDropdown(this.OPTIONS), "PROPERTY");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(Blockly.Blocks.actor.HUE);
        this.setTooltip(Blockly.Msg.TOOLTIP_ACTOR_GET.format(Blockly.Block.optionList(this.OPTIONS)));
        this.setHelpUrl("");
    },

    runIn: 'create'

};

Blockly.Blocks['actor_set'] = {
    init: function () {
        this.OPTIONS = [
            ["x", "x"],
            ["y", "y"],
            [Blockly.Msg.BLOCK_VELOCITY + " x", "body.velocity.x"],
            [Blockly.Msg.BLOCK_VELOCITY + " y", "body.velocity.y"],
            [Blockly.Msg.BLOCK_GRAVITY + " x", "body.gravity.x"],
            [Blockly.Msg.BLOCK_GRAVITY + " y", "body.gravity.y"],
            [Blockly.Msg.BLOCK_ANGLE, "angle"],
        ];

        this.appendValueInput("VAR")
            .appendField(Blockly.Msg.BLOCK_WITH)
            .setCheck("Actor");
        this.appendDummyInput()
            .appendField(Blockly.Msg.BLOCK_SET)
            .appendField(new Blockly.FieldDropdown(this.OPTIONS), "PROPERTY");
        this.appendValueInput("ARG1")
            .appendField(Blockly.Msg.BLOCK_TO)
            .setCheck("Number");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.actor.HUE);
        this.setTooltip(Blockly.Msg.TOOLTIP_ACTOR_SET.format(Blockly.Block.optionList(this.OPTIONS)));
        this.setHelpUrl("");
    },

    runIn: 'create'

};

Blockly.Blocks['actor_get1'] = {
    init: function () {
        this.OPTIONS = [
            [Blockly.Msg.BLOCK_ANGLE + ' ' + Blockly.Msg.BLOCK_WITH, "getAngleWith"],
            [Blockly.Msg.BLOCK_DISTANCE + ' ' + Blockly.Msg.BLOCK_WITH, "getDistanceWith"]
        ];

        this.appendValueInput("VAR")
            .appendField(Blockly.Msg.BLOCK_WITH)
            .setCheck("Actor")
        this.appendDummyInput()
            .appendField(Blockly.Msg.BLOCK_GET)
            .appendField(new Blockly.FieldDropdown(this.OPTIONS), "PROPERTY");
        this.appendValueInput("ARG1")
            .setCheck("Actor")
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(Blockly.Blocks.actor.HUE);
        this.setTooltip(Blockly.Msg.TOOLTIP_ACTOR_GET.format(Blockly.Block.optionList(this.OPTIONS)));
        this.setHelpUrl("");
    },

    runIn: 'create'

};

Blockly.Blocks['actor_set1'] = {
    init: function () {
        this.OPTIONS = [
            [Blockly.Msg.BLOCK_VELOCITY_FROM_ANGLE, "VelocityFromAngle"],
        ];
        this.appendValueInput("VAR")
            .appendField(Blockly.Msg.BLOCK_WITH)
            .setCheck("Actor")
        this.appendDummyInput()
            .appendField(Blockly.Msg.BLOCK_SET)
            .appendField(new Blockly.FieldDropdown(this.OPTIONS), "PROPERTY");
        this.appendValueInput("ARG1")
            .setCheck("Number")
            .appendField(Blockly.Msg.BLOCK_TO);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.actor.HUE);
        this.setTooltip(Blockly.Msg.TOOLTIP_ACTOR_SET.format(Blockly.Block.optionList(this.OPTIONS)));
        this.setHelpUrl("");
    },

    runIn: 'create'

};

Blockly.Blocks['actor_setXY'] = {
    init: function () {
        this.OPTIONS = [
            [Blockly.Msg.BLOCK_SCALE, "scaleTo"],
            [Blockly.Msg.BLOCK_BOUNCE, "setBounce"],
            [Blockly.Msg.BLOCK_FRICTION, "setFriction"],
        ];
        this.appendValueInput("VAR")
            .appendField(Blockly.Msg.BLOCK_WITH)
            .setCheck("Actor")
        this.appendDummyInput()
            .appendField(Blockly.Msg.BLOCK_SET)
            .appendField(new Blockly.FieldDropdown(this.OPTIONS), "PROPERTY");
        this.appendValueInput("X")
            .setCheck("Number")
            .appendField(Blockly.Msg.BLOCK_X_TO);
        this.appendValueInput("Y")
            .setCheck("Number")
            .appendField(Blockly.Msg.BLOCK_Y_TO);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.actor.HUE);
        this.setTooltip(Blockly.Msg.TOOLTIP_ACTOR_SET.format(Blockly.Block.optionList(this.OPTIONS)));
        this.setHelpUrl("");
    },

    runIn: 'create'

};

// method
Blockly.Blocks['actor_action'] = {
    init: function () {
        this.OPTIONS = [
            [Blockly.Msg.BLOCK_COLLIDE_BOUNDE, "body.collideWorldBounds = true"],
            [Blockly.Msg.BLOCK_IMMOVABLE, "body.immovable = true"],
            [Blockly.Msg.BLOCK_ROTATE_WHEN_COLLIDE, "rotateOnCollide()"],
            [Blockly.Msg.BLOCK_DESTROY, "kill()"],
        ];
        this.appendValueInput("VAR")
            .appendField(Blockly.Msg.BLOCK_WITH)
            .setCheck("Actor")
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(this.OPTIONS), "METHOD")
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.actor.HUE);
        this.setTooltip(Blockly.Msg.TOOLTIP_ACTOR_ACTION.format(Blockly.Block.optionList(this.OPTIONS)));
        this.setHelpUrl("");
    },

    runIn: 'create'
};

// event
Blockly.Blocks['actor_every'] = {
    init: function () {
        this.OPTIONS = [
            [Blockly.Msg.BLOCK_IN, "Phaser.Sprite.TimeMode.IN"],
            [Blockly.Msg.BLOCK_FROM, "Phaser.Sprite.TimeMode.IN_AND_AFTER"],
            [Blockly.Msg.BLOCK_EVERY, "Phaser.Sprite.TimeMode.EVERY"]
        ];
        this.appendValueInput("VAR")
            .appendField(Blockly.Msg.BLOCK_WITH)
            .setCheck("Actor")
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(this.OPTIONS), "EVENT")
        this.appendValueInput("TIME")
            .setCheck("Number");
        this.appendDummyInput()
            .appendField(Blockly.Msg.BLOCK_SECONDS);
        this.appendStatementInput("STMT")
            .setCheck(null)
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.event.HUE);
        this.setTooltip(Blockly.Msg.TOOLTIP_ACTOR_EVERY.format(Blockly.Block.optionList(this.OPTIONS)));
        this.setHelpUrl("");
    },

    runIn: 'create'
};

// ------------------------- old part
// Actor

Blockly.Blocks['actor_collide'] = {
    init: function () {
        this.OPTIONS = [
            ["collide", "onCollide"],
            ["overlap", "onOverlap"]
        ];
        this.appendValueInput("IMG1")
            .setCheck(Blockly.Block.IMAGE_TYPE)
            .appendField(Blockly.Msg.BLOCK_WHEN)
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(this.OPTIONS), "EVENT")
            .appendField(Blockly.Msg.BLOCK_WITH)
        this.appendValueInput("IMG2")
            .setCheck(Blockly.Block.IMAGE_TYPE)
        this.appendDummyInput()
            .appendField(Blockly.Msg.BLOCK_ONCE)
            .appendField(new Blockly.FieldCheckbox("FALSE"), "ONCE");
        this.appendStatementInput("STMT")
            .setCheck(null)
            .appendField(new Blockly.FieldVariable("actor1", null, [Blockly.Block.ACTOR_TYPE], Blockly.Block.ACTOR_TYPE), "ID1")
            .appendField(new Blockly.FieldVariable("actor2", null, [Blockly.Block.ACTOR_TYPE], Blockly.Block.ACTOR_TYPE), "ID2")
        this.setInputsInline(true);
        this.setColour(Blockly.Blocks.event.HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    },

    runIn: 'update'
};
