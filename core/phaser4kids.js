// -- game --
// logger
var oldLog = console.log;
console.log = function (message) {
    if (Phaser.Game.debug) {
        Phaser.Game.logLine(message);
    }
    oldLog.apply(console, arguments);
};

// global
Phaser.Game.prototype.KEY_CAPTURES = [Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT,
    Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.BACKSPACE, Phaser.Keyboard.DELETE, Phaser.Keyboard.ENTER,
    Phaser.Keyboard.PAGE_UP, Phaser.Keyboard.PAGE_DOWN, Phaser.Keyboard.HOME, Phaser.Keyboard.END];

Phaser.Game.prototype.groups = null;
Phaser.Game.prototype.actorEvents = null;
Phaser.Game.prototype.previousEventStates = null;
Phaser.Game.prototype.texts = null;
Phaser.Game.prototype.timers = null;

Phaser.Game.MAX_LOG = 20;
Phaser.Game.debug = false; // !important init
Phaser.Game.logLines = []; // !important init
Phaser.Game.prototype.logVars = null;

Phaser.Game.prototype.MAX_ACTOR = 500;
Phaser.Game.prototype.actorCount = 0;

Phaser.Game.prototype.findGroup = function (actor) {
    if (typeof actor === 'string') {
        return this.groups[actor];
    }
    return actor;
};

Phaser.Game.prototype.findOrCreateGroup = function (name) {
    if (typeof this.groups[name] === 'undefined') {
        var group = this.add.group();
        group.enableBody = true;
        this.groups[name] = group;
    }
    return this.groups[name];
};

Phaser.Game.prototype.pause = function () {
    this.paused = true;

    for (var i in this.KEY_CAPTURES) {
        this.input.keyboard.removeKeyCapture(this.KEY_CAPTURES[i]);
    }
}

Phaser.Game.prototype.resume = function () {
    this.paused = false;
    this.input.keyboard.addKeyCapture(this.KEY_CAPTURES);
}

Phaser.Game.pauseCurrentGame = function () {
    if (Phaser.GAMES.length > 0) {
        Phaser.GAMES[0].pause();
    }
}

Phaser.Game.resumeCurrentGame = function () {
    if (Phaser.GAMES.length > 0) {
        Phaser.GAMES[0].resume();
    }
}

Phaser.Game.destroyCurrentGame = function () {
    if (Phaser.GAMES.length > 0) {
        Phaser.GAMES[0].destroy();
        Phaser.GAMES = [];
    }
}

// game.overrided method
Phaser.Game.prototype.preloadSystem = function () {
    this.time.advancedTiming = true;
    this.load.bitmapFont('font', 'assets/bitmapfont/emulogic.png', 'assets/bitmapfont/emulogic.fnt');
}

Phaser.Game.prototype.createSystem = function () {
    this.groups = {};
    this.actorEvents = {};
    this.previousEventStates = {};
    this.texts = [];
    this.timers = [];
    this.timerIndex = 0;
    Phaser.Game.debug = false;
    Phaser.Game.logLines = [];
    this.logVars = {};

    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.input.keyboard.addKeyCapture(this.KEY_CAPTURES);
    this.input.mouse.capture = true;
}

Phaser.Game.prototype.updateSystem = function () {
    // print texts
    for (var i in this.texts) {
        this.texts[i].textObject.text = this.texts[i].valueCallback();
    }

    // actor events
    for (var key in this.actorEvents) {
        var events = this.actorEvents[key];
        for (var i in events.callbacks) {
            var callback = events.callbacks[i];
            callback(events.actor);
        }
    }
}

Phaser.Game.prototype.renderSystem = function () {
    // // debug
    if (Phaser.Game.debug) {
        for (var g in this.groups) {
            this.groups[g].forEachAlive(this.debug.body, this.debug);
        }

        this.debug.start(250, 20);
        for (var i in Phaser.Game.logLines) {
            this.debug.line(Phaser.Game.logLines[i]);
        }
        this.debug.stop();
        this.debug.text('Living actors: ' + this.actorCount + ' / ' + this.MAX_ACTOR, 10, 20, 'grey');
        this.debug.text('Frame rate: ' + this.time.fps || '--', 10, 40, 'grey');

        var y = 40;
        for (var k in this.logVars) {
            y += 20;
            this.debug.text(k + ': ' + this.logVars[k](), 10, y);
        }
    }
};

// game.method
Phaser.Game.prototype.initGame = function(w, h, bg) {
    this.add.tileSprite(0, 0, w, h, bg);
    this.world.setBounds(0, 0, w, h);
};

Phaser.Game.prototype.debugGame = function () {
    /*this.plugins.add(Phaser.Plugin.DebugArcadePhysics);
    this.debug.arcade.on()
    this.debug.arcade.configSet({ // default values:
        bodyFilled: false,
        filter: null,
        lineWidth: 1,
        on: true,
        renderAcceleration: true,
        renderAngularAcceleration: true,
        renderAngularDrag: true,
        renderAngularVelocity: true,
        renderBlocked: true,
        renderBody: true,
        renderBodyDisabled: true,
        renderCenter: true,
        renderConfig: false,
        renderDrag: true,
        renderFriction: false,
        renderLegend: false,
        renderMaxVelocity: true,
        renderOffset: true,
        renderRotation: true,
        renderSpeed: true,
        renderTouching: true,
        renderVelocity: true,
    });*/

    Phaser.Game.debug = true;
};


Phaser.Game.logLine = function (msg) {
    Phaser.Game.logLines.push(msg);
    if (Phaser.Game.logLines.length > Phaser.Game.MAX_LOG) Phaser.Game.logLines.shift();
};

Phaser.Game.prototype.logVar = function (varName, callback) {
    this.logVars[varName] = callback;
};

Phaser.Game.prototype.addText = function (x, y, callback) {
    var text = this.add.bitmapText(x, y, 'font', '', 15);
    text.fixedToCamera = true;
    this.texts.push({ textObject: text, valueCallback: callback });
};

// game.factory
Phaser.Game.prototype.createActor = function (name, x = 0, y = 0) {

    if (this.actorCount > this.MAX_ACTOR) {
        var msg = 'Maximum actor [' + this.MAX_ACTOR + '] reached ! You cannot create another actor.';
        alert(msg);
        throw msg;
    }

    var actor = this.findOrCreateGroup(name).create(x, y, name);
    actor.anchor.setTo(0.5, 0.5);
    actor.checkWorldBounds = true;
    actor.outOfBoundsKill = true;

    var self = this;
    self.actorCount++;
    actor.events.onKilled.add(function (obj) {
        self.actorCount--;
    });
    
    this.physics.arcade.enable(actor);

    return actor;
};

// game.timer
Phaser.Game.prototype.every = function (lineNumber, delta, callback, first = true) {
    if (typeof this.timers[lineNumber] === 'undefined') {
        this.timers[lineNumber] = (first == true) ? 0 : this.time.now;
    }

    if (this.timers[lineNumber] < this.time.now - delta * 1000) {
        callback();
        this.timers[lineNumber] = this.time.now;
    }
}

// game.event
Phaser.Game.prototype.genericEvent = function (exec, key, once, callback) {
    if (exec) {
        if (!once || !this.previousEventStates[key]) {
            callback();
        }

        this.previousEventStates[key] = true;
    } else {
        this.previousEventStates[key] = false;
    }
}

Phaser.Game.prototype.onCollide = function(actor1, actor2, callback, once = false) {
    var group1 = this.findGroup(actor1);
    var group2 = this.findGroup(actor2);

    var self = this;
    if (!(typeof group1 === 'undefined' || typeof group2 === 'undefined')) {
        this.physics.arcade.collide(group1, group2, function (actor1, actor2) {
            self.genericEvent(true, actor2, once, function() {
                callback(actor1, actor2);
            });            
        });
    }
}

Phaser.Game.prototype.onOverlap = function (actor1, actor2, callback, once = false) {
    var group1 = this.findGroup(actor1);
    var group2 = this.findGroup(actor2);

    var self = this;
    if (!(typeof group1 === 'undefined' || typeof group2 === 'undefined')) {
        this.physics.arcade.overlap(group1, group2, function (actor1, actor2) {
            self.genericEvent(true, actor2, once, function () {
                callback(actor1, actor2);
            });
        });
    }
}

Phaser.Game.prototype.onKeyDown = function (key, callback, once = false) {
    this.genericEvent(this.input.keyboard.isDown(key), 'down' + key, once, callback);
}

Phaser.Game.prototype.onKeyUp = function (key, callback, once = false) {
    this.genericEvent(this.input.keyboard.upDuration(key, 250), 'up' + key, true, callback);
}

Phaser.Game.prototype.onMouseLeftDowm = function (callback, once = false) {
    this.genericEvent(this.input.activePointer.leftButton.isDown, 'mouseLeft', once, callback);
}

Phaser.Game.prototype.onMouseMiddleDowm = function (callback, once = false) {
    this.genericEvent(this.input.activePointer.middleButton.isDown, 'mouseMiddle', once, callback);
}

Phaser.Game.prototype.onMouseRightDowm = function (callback, once = false) {
    this.genericEvent(this.input.activePointer.rightButton.isDown, 'mouseRight', once, callback);
}

Phaser.Game.prototype.onMouseLeftUp = function (callback, once = false) {
    this.genericEvent(this.input.activePointer.leftButton.isUp, 'mouseLeftUp', once, callback);
}

Phaser.Game.prototype.onMouseMiddleUp = function (callback, once = false) {
    this.genericEvent(this.input.activePointer.middleButton.isUp, 'mouseMiddleUp', once, callback);
}

Phaser.Game.prototype.onMouseRightUp = function (callback, once = false) {
    this.genericEvent(this.input.activePointer.rightButton.isUp, 'mouseRightUp', once, callback);
}

// -- actor --onMouseLeftDowm
// TODO get the friction factor
Phaser.Game.radToDeg = function (rad) {
    return rad * 180 / Math.PI;
}
Phaser.Sprite.prototype.friction = 0.5;
Phaser.Sprite.idCounter = 0;

// property
Phaser.Sprite.prototype.getId = function() {
    if (this.id == undefined) this.id = Phaser.Sprite.idCounter++;
    return this.id;
}

Phaser.Sprite.prototype.toString = function() {
    return 'myString';
};

Phaser.Sprite.prototype.getAngleWith = function(actor) {
    return Phaser.Game.radToDeg(this.game.physics.arcade.angleBetween(this, actor));
}

Phaser.Sprite.prototype.getDistanceWith = function (actor) {
    return this.game.physics.arcade.distanceBetween(this, actor);
}

// method
Phaser.Sprite.prototype.rotateOnCollide = function() {
    var worldCollideCallback = function (sprite, up, down, left, right) {
        if (up) {
            sprite.body.angularVelocity = -sprite.body.velocity.x * this.friction;
        } else if (down) {
            sprite.body.angularVelocity = sprite.body.velocity.x * this.friction;
        } else if (left) {
            sprite.body.angularVelocity = sprite.body.velocity.y * this.friction;
        } else if (right) {
            sprite.body.angularVelocity = -sprite.body.velocity.y * this.friction;
        }
    };
    this.body.allowRotation = true;
    this.body.onWorldBounds = new Phaser.Signal();
    this.body.onWorldBounds.add(worldCollideCallback, this);
    this.body.onCollide = new Phaser.Signal();
    this.body.onCollide.add(function collide(sprite1, sprite2) {
        sprite1.body.angularVelocity = sprite1.body.velocity.x * this.friction;
        if (sprite1.body.x < sprite2.body.x) {
            sprite1.body.angularVelocity *= -1;
        }
        sprite1.body.angularVelocity += -sprite2.body.angularVelocity * this.friction;
    }, this);
}

Phaser.Game.percentToReal = function(v) {
    if (v < 0) v = 0;
    if (v > 100) v = 100;
    return v / 100;
}

Phaser.Sprite.prototype.setGravity = function (x, y) {
    this.body.gravity.x = x;
    this.body.gravity.y = y;
}

Phaser.Sprite.prototype.setVelocity = function (x, y) {
    this.body.velocity.x = x;
    this.body.velocity.y = y;
}

Phaser.Sprite.prototype.setBounce = function (x, y) {
    this.body.bounce.x = Phaser.Game.percentToReal(x);
    this.body.bounce.y = Phaser.Game.percentToReal(y);
}

Phaser.Sprite.prototype.setFriction = function (x, y) {
    this.body.friction.x = Phaser.Game.percentToReal(x);
    this.body.friction.y = Phaser.Game.percentToReal(y);
}

Phaser.Sprite.prototype.scaleTo = function (x, y) {
    this.scale.setTo(x / 100, y / 100);
}

Phaser.Sprite.prototype.VelocityFromAngle = function (speed) {
    this.game.physics.arcade.velocityFromRotation(this.rotation, speed, this.body.velocity);
}

Phaser.Sprite.prototype.addEvent = function (callback) {
    var events = this.game.actorEvents[this.getId()];
    if (typeof events === 'undefined') {
        this.game.actorEvents[this.getId()] = { actor: this, callbacks: [callback] };
        callback.id = 0;
    } else {
        var id = events.callbacks.push(callback);
        callback.id = id - 1;
    }

    this.events.onKilled.add(function (actor) {
        actor.removeAllEvents();
    });
}

Phaser.Sprite.prototype.removeAllEvents = function () {
    delete this.game.actorEvents[this.getId()]
}

Phaser.Sprite.prototype.removeEvent = function (callback) {
    delete this.game.actorEvents[this.getId()].callbacks[callback.id];
}

Phaser.Sprite.TimeMode = {
    IN: 0,
    IN_AND_AFTER: 1,
    EVERY: 2
}

Phaser.Sprite.prototype.onTime = function (lineNumber, delta, callback, mode) {
    var self = this;
    var event = function (actor) {
        var id = self.getId() * 1000 + lineNumber;
        if (typeof self.game.timers[id] === 'undefined') {
            self.game.timers[id] = (mode == Phaser.Sprite.TimeMode.EVERY) ? 0 : self.game.time.now;
        }
        if (self.game.timers[id] < self.game.time.now - delta * 1000) {
            callback(actor);
            self.game.timers[id] = self.game.time.now;

            if (mode == Phaser.Sprite.TimeMode.IN) {
                actor.removeEvent(event);
            }
        }

    };

    this.addEvent(event);
}