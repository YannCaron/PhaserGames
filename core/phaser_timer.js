// inner class
Phaser.Time = Phaser.Time || {};

Phaser.Time.Timer = function (owner, interval, callback) {
    this.owner = owner;
    this.interval = interval;
    this.callback = callback;
    this.game = Phaser.Game.current;
    this.time = this.game.time.now;
    this.count = 0;
}

Phaser.Time.Timer.prototype.run = function () {
    if (Phaser.Game.current.time.now - this.interval > this.time) {
        // check if actor is alive
        if (this.owner instanceof Phaser.Sprite && !this.owner.alive) {
            this.destroy();
            return;
        }

        this.count++;
        this.time = this.game.time.now;
        this.callback(this, this.owner);
    }
};

Phaser.Time.Timer.prototype.destroy = function() {
    this.game.destroyTimer(this);
}

Phaser.Time.Timer.prototype.setInterval = function (interval) {
    this.interval = interval;
}

// attributes
Phaser.Game.prototype.timers = null;

// override
Phaser.Game.prototype.initEvent = function () {
    this.timers = [];
}

Phaser.Game.prototype.updateEvent = function () {
    // loop on timers
    for (var i in this.timers) {
        this.timers[i].run();
    }
}

// methods
Phaser.Game.prototype.createTimer = function (interval, callback) {
    var timer = new Phaser.Time.Timer(this, interval, callback);
    this.timers.push(timer);
}

Phaser.Game.prototype.destroyTimer = function (timer) {
    var index = this.timers.indexOf(timer);
    this.timers.splice(index, 1);
}

Phaser.Sprite.prototype.createTimer = function (interval, callback) {
    var timer = new Phaser.Time.Timer(this, interval, callback);
    Phaser.Game.current.timers.push(timer);
}
