// create namespace
Blockly.imageDynamic = Blockly.imageDynamic || {};
Blockly.imageDynamic.BACKGROUND_CATEGORY = 'Background'

Blockly.imageDynamic.buildLabel = function (name) {
    return '<label text="' + name + '"></label>';
}

Blockly.imageDynamic.buildImage = function (category) {
    return '<block type="game_image_' + category + '"></block>';
}

Blockly.imageDynamic.imageFlyoutCallback = function (workspace) {
    var xmlList = [];

    for (var category in Blockly4kids.gameImages) {

        if (category != Blockly.imageDynamic.BACKGROUND_CATEGORY) {
            xmlList.push(Blockly.Xml.xmlToDom(Blockly.imageDynamic.buildLabel(category)));
            xmlList.push(Blockly.Xml.xmlToDom(Blockly.imageDynamic.buildImage(category)));
        }
    }

    return xmlList;
};