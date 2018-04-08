// inner class
Phaser.Game.VariableInfo = function (name, callback) {
    this.name = name;
    this.callback = callback;
}

// attributes
Phaser.Game.DEBUG_FONT_SIZE = 17;
Phaser.Game.DEBUG_COLOR = 'white';
Phaser.Game.DEBUG_FONT = '%1px Courier'.format(Phaser.Game.DEBUG_FONT_SIZE);

Phaser.Game.MAX_LOG = 20;
Phaser.Game.LOG_X = 10;
Phaser.Game.LOG_Y = 20;
Phaser.Game.LINE_H = Phaser.Game.DEBUG_FONT_SIZE + 1;

Phaser.Game.prototype.debugMode = null;
Phaser.Game.prototype.logger = null;
Phaser.Game.prototype.infos = null;

Phaser.Game.prototype.initDebug = function() {
    this.debugMode = false;
    this.logger = [];
    this.infos = [];

    this.debug.font = Phaser.Game.DEBUG_FONT;
}

Phaser.Game.prototype.renderDebug = function () {
    if (this.debugMode) {

        // debug physic
        for (var g in this.groups.groups) {
            this.groups.groups[g].forEachAlive(this.debug.body, this.debug);
        }

        // logger
        this.debug.start(this.width / 2, Phaser.Game.LOG_Y);
        for (var i in this.logger) {
            this.debug.line(this.logger[i]);
        }
        this.debug.stop();

        // log infos
        this.logInfo();
    }
}

// methods
Phaser.Game.prototype.log = function (msg) {
    this.logger.push(msg);
    while (this.logger.length > Phaser.Game.MAX_LOG) {
        this.logger.shift();
    }
}

Phaser.Game.prototype.addInfo = function (name, callback) {
    this.infos.push(new Phaser.Game.VariableInfo(name, callback));
}

Phaser.Game.prototype.logInfo = function() {
    this.debug.text('Living actors: ' + this.actorCount + ' / ' + this.maxActor, Phaser.Game.LOG_X, Phaser.Game.LOG_Y, Phaser.Game.DEBUG_COLOR, Phaser.Game.DEBUG_FONT);
    this.debug.text('Frame rate: ' + this.time.fps || '--', Phaser.Game.LOG_X, Phaser.Game.LOG_Y + Phaser.Game.LINE_H, Phaser.Game.DEBUG_COLOR, Phaser.Game.DEBUG_FONT);

    var y = Phaser.Game.LOG_Y + Phaser.Game.LINE_H * 2;
    for (var i in this.infos) {
        var info = this.infos[i];
        var result = info.callback();

        if (result.type == Phaser.SPRITE) {
            this.debug.text(info.name + ': ', Phaser.Game.LOG_X, y, Phaser.Game.DEBUG_COLOR, Phaser.Game.DEBUG_FONT);
            y += Phaser.Game.LINE_H;
            this.debug.spriteInfo(result, Phaser.Game.LOG_X * 2, y);
            y += Phaser.Game.LINE_H * 5;
        } else {
            this.debug.text(info.name + ': ' + result, Phaser.Game.LOG_X, y, Phaser.Game.DEBUG_COLOR, Phaser.Game.DEBUG_FONT);
            y += Phaser.Game.LINE_H;
        }

    }
}

// capture console.log
var oldLog = console.log;
console.log = function (message) {
    if (Phaser.Game.debug) {
        Phaser.Game.logLine(message);
    }
    oldLog.apply(console, arguments);
};
