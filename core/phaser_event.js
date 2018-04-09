// inner class
Phaser.Time = Phaser.Time || {};

Phaser.Time.Mode = {
    IN: 0,
    AFTER: 1,
    EVERY: 2
}

Phaser.Time.Timer = function (uid, owner, mode, time, callback) {
    this.uid = uid;
    this.owner = owner;
    this.mode = mode;
    this.time = time;
    this.callback = callback;
    this.first = true;
    this.tick = Phaser.Game.getCurrentGame().time.now;

    this.run = function () {
        if ((this.mode == Phaser.Time.Mode.EVERY && this.first) || 
            (this.tick < Phaser.Game.getCurrentGame().time.now - time * 1000)) {
            this.callback(this.owner);
            this.tick = Phaser.Game.getCurrentGame().time.now;
            this.first = false;

            // return if timer must be removed
            return (this.mode == Phaser.Time.Mode.IN);
        }

        return false;
    }
}

// attributes
Phaser.Game.prototype.timers = null;

// override
Phaser.Game.prototype.initEvent = function () {
    this.timers = {};
}

Phaser.Game.prototype.updateEvent = function () {
    // loop on timers
    for (var uid in this.timers) {
        var timer = this.timers[uid];
        var res = timer.run();

        if (res) delete this.timers[uid];
    }
}

// methods
Phaser.Game.prototype.runTimer = function (uid, mode, time, callback) {
    //this.timers[uid](new Phaser.Time.Timer(uid, this, mode, time, callback));

    var h = hash([this, uid]);
    if (!this.times[h]) {
        
    }

    this.timers[h] = {tick: Phaser.Game.getCurrentGame().time.now}

}
Phaser.Sprite.prototype.addTimer = function (uid, mode, time, callback) {
    this.game.timers[uid] = (new Phaser.Time.Timer(uid, this, mode, time, callback));
}