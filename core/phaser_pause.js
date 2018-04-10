// const
Phaser.Game.KEY_CAPTURES = [Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT,
    Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.BACKSPACE, Phaser.Keyboard.DELETE, Phaser.Keyboard.ENTER,
    Phaser.Keyboard.PAGE_UP, Phaser.Keyboard.PAGE_DOWN, Phaser.Keyboard.HOME, Phaser.Keyboard.END];

// properties
Phaser.Game.prototype.pause = null;

// constructor
Phaser.Game.prototype.initPause = function () {
    this.pause = false;
}

// methods
Phaser.Game.prototype.pause = function () {
    this.paused = true;

    for (var i in Phaser.Game.KEY_CAPTURES) {
        this.input.keyboard.removeKeyCapture(Phaser.Game.KEY_CAPTURES[i]);
    }
}

Phaser.Game.prototype.resume = function () {
    this.paused = false;
    this.input.keyboard.addKeyCapture(Phaser.Game.KEY_CAPTURES);
}

// static methods
Phaser.Game.pauseCurrentGame = function () {
    Phaser.Game.current.pause();
}

Phaser.Game.resumeCurrentGame = function () {
    Phaser.Game.current.resume();
}

Phaser.Game.destroyCurrentGame = function () {
    Phaser.Game.current.destroy();
    Phaser.Game.current = null;
}