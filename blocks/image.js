// Global
Blockly.Blocks.image = {};
Blockly.Blocks.image.HUE = Blockly.Msg.IMAGE_HUE;

// dynamic images
for (var category in Blockly4kids.gameImages) {

    Blockly.Blocks['game_image_' + category] = {
        category: category,

        init: function () {
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown(Blockly4kids.gameImages[this.category]), 'IMG')
            this.setOutput(true, "Image");
            this.setColour(Blockly.Blocks.image.HUE);
            this.setTooltip("");
            this.setHelpUrl("");
        },

        getImage: function () {
            var img = this.getFieldValue('IMG');
            var pair = img.split('#');
            return { 'key': pair[0], 'url': pair[1] };
        },

        runIn: 'create'
    };
}