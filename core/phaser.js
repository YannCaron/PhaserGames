// static
Phaser.Game.getCurrentGame = function () {
    if (Phaser.GAMES.length > 0) {
        return Phaser.GAMES[0];
    }
}
// overrided methods
Phaser.Game.prototype.preloadSystem = function () {
    // initialize
    this.time.advancedTiming = true;

    //this.load.bitmapFont('font', 'assets/bitmapfont/emulogic.png', 'assets/bitmapfont/emulogic.fnt');
}
Phaser.Game.prototype.createSystem = function () {
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.input.keyboard.addKeyCapture(this.KEY_CAPTURES);
    this.input.mouse.capture = true;

    this.initDebug();
    this.initActor();
    this.initPause();
    this.initEvent();
}

Phaser.Game.prototype.updateSystem = function () {
    this.updateEvent();
}

Phaser.Game.prototype.renderSystem = function () {
    this.renderDebug();
};

// methods
Phaser.Game.prototype.initGame = function (w, h, bg) {
    this.add.tileSprite(0, 0, w, h, bg);
    this.world.setBounds(0, 0, w, h);
};