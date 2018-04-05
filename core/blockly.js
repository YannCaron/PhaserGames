// global
Blockly.Xml.xmlToDom = function (xml) {
    return Blockly.Xml.textToDom('<xml>' + xml + '</xml>').firstChild;
}