// create namespace
Blockly.imageDynamics = Blockly.imageDynamics || {};

Blockly.imageDynamics.buildLabel = function (name) {
    return '<label text="' + name + '"></label>';
}

Blockly.imageDynamics.buildImage = function (category) {
    return '<block type="game_image_' + category + '"></block>';
}

Blockly.imageDynamics.imageFlyoutCallback = function (workspace) {
    var xmlList = [];

    for (var category in Blockly4kids.gameImages) {

        xmlList.push(Blockly.Xml.xmlToDom(Blockly.imageDynamics.buildLabel(category)));
        xmlList.push(Blockly.Xml.xmlToDom(Blockly.imageDynamics.buildImage(category)));
    }

    return xmlList;
};