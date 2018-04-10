// inner class
Phaser.Event = Phaser.Event || {};

Phaser.Event.Event = function (owner, predicat, callback, continuous = false) {
    this.owner = owner;
    this.interval = 0;
    this.predicat = predicat;
    this.callback = callback;
    this.game = Phaser.Game.current;
    this.time = this.game.time.now;
    this.count = 0;
    this.previous = predicat();
    this.continuous = continuous;
}

Phaser.Event.Event.prototype.run = function () {
    var state = this.predicat();
    if (state && (state != this.previous || this.continuous) &&
        Phaser.Game.current.time.now - this.interval > this.time) {
        // check if actor is alive
        if (this.owner instanceof Phaser.Sprite && !this.owner.alive) {
            this.destroy();
            return;
        }

        this.count++;
        this.time = this.game.time.now;
        this.callback(this, this.owner);
    }
    this.previous = state;
};

Phaser.Event.Event.prototype.destroy = function () {
    this.game.destroyEvent(this);
}

Phaser.Event.Event.prototype.setInterval = function (interval) {
    this.interval = interval;
}

// attributes
Phaser.Game.prototype.events = null;

// override
Phaser.Game.prototype.initEvent = function () {
    this.events = [];
    this.input.mouse.capture = true;
}

Phaser.Game.prototype.updateEvent = function () {
    // loop on events
    for (var i in this.events) {
        var event = this.events[i];
        event.run();
    }
}

// methods
Phaser.Game.prototype.createEvent = function (predicat, callback, continuous) {
    var event = new Phaser.Event.Event(this, predicat, callback, continuous);
    this.events.push(event);
}

Phaser.Game.prototype.destroyEvent = function (event) {
    var index = this.events.indexOf(event);
    this.events.splice(index, 1);
}

Phaser.Sprite.prototype.createEvent = function (predicat, callback, continuous) {
    var event = new Phaser.Events.Event(this, predicat, callback, continuous);
    Phaser.Game.current.events.push(event);
}

// factories
Phaser.Game.prototype.onMouseLeftEnter = function (callback) {
    var game = this;
    game.input.mouse.capture = true;
    this.createEvent(function (event) { return game.input.activePointer.leftButton.isDown; }, callback, false);
}

Phaser.Game.prototype.onMouseLeftExit = function (callback) {
    var game = this;
    this.createEvent(function (event) { return !game.input.activePointer.leftButton.isDown; }, callback, false);
}

Phaser.Game.prototype.onMouseLeft = function (callback) {
    var game = this;
    this.createEvent(function (event) { return game.input.activePointer.leftButton.isDown; }, callback, true);
}