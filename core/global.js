// string
String.prototype.format = function () {
    var result = '' + this;
    for (var i = 0; i < arguments.length; i++) {
        result = result.replace('%' + (i + 1), arguments[i]);
    }
    return result;
}

// array
/*
TODO : Problem with Phaser4Kids: Phaser.Game.prototype.addText
Array.prototype.diff = function (a) {
    return this.filter(function (i) { return a.indexOf(i) < 0; });
};
*/

// number
Number.prototype.radToDeg = function (rad) {
    return rad * 180 / Math.PI;
}