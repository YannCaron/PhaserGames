// static
Phaser.Game.current = null;

// overrided methods
Phaser.Game.prototype.preloadSystem = function () {
    // initialize
    Phaser.Game.current = this;
    this.time.advancedTiming = true;

    //this.load.bitmapFont('font', 'assets/bitmapfont/emulogic.png', 'assets/bitmapfont/emulogic.fnt');
}
Phaser.Game.prototype.createSystem = function () {
    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.initDebug();
    this.initActor();
    this.initPause();
    this.initEvent();
    this.initTimer();
}

Phaser.Game.prototype.updateSystem = function () {
    this.updateEvent();
    this.updateTimer();
}

Phaser.Game.prototype.renderSystem = function () {
    this.renderDebug();
};

// methods
Phaser.Game.prototype.initGame = function (w, h, bg) {
    this.add.tileSprite(0, 0, w, h, bg);
    this.world.setBounds(0, 0, w, h);
};