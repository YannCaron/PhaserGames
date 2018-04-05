// dynamic images
for (var category in Blockly4kids.gameImages) {

    Blockly.JavaScript['game_image_' + category] = function (block) {
        var img = block.getImage();
        var code = '\'' + img['key'] + '\'';
        return [code, Blockly.JavaScript.ORDER_ATOMIC];
    };

}