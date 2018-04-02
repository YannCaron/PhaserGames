// -- game --
// global
Phaser.Game.prototype.KEY_CAPTURES = [Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT,
    Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.BACKSPACE, Phaser.Keyboard.DELETE, Phaser.Keyboard.ENTER,
    Phaser.Keyboard.PAGE_UP, Phaser.Keyboard.PAGE_DOWN, Phaser.Keyboard.HOME, Phaser.Keyboard.END];

Phaser.Game.prototype.groups = null;
Phaser.Game.prototype.actorEvents = null;
Phaser.Game.prototype.previousEventStates = null;
Phaser.Game.prototype.texts = null;
Phaser.Game.prototype.timers = null;

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
    this.load.bitmapFont('font', 'assets/bitmapfont/emulogic.png', 'assets/bitmapfont/emulogic.fnt');
}

Phaser.Game.prototype.createSystem = function () {
    this.groups = {};
    this.actorEvents = {};
    this.previousEventStates = {};
    this.texts = [];
    this.timers = [];
    this.timerIndex = 0;

    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.input.keyboard.addKeyCapture(this.KEY_CAPTURES);
    this.input.mouse.capture = true;
}

Phaser.Game.prototype.updateSystem = function () {
    for (var i in this.texts) {
        this.texts[i].textObject.text = this.texts[i].valueCallBack();
    }

    for (var key in this.actorEvents) {
        var events = this.actorEvents[key];
        for (var i in events.callbacks) {
            events.callbacks[i](events.actor);
        }
    }
}

Phaser.Game.prototype.renderSystem = function () {
}

// game.method
Phaser.Game.prototype.initGame = function(w, h, bg) {
    this.add.tileSprite(0, 0, w, h, bg);
    this.world.setBounds(0, 0, w, h);
};

Phaser.Game.prototype.debugGame = function () {
    this.plugins.add(Phaser.Plugin.DebugArcadePhysics);
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
        renderLegend: true,
        renderMaxVelocity: true,
        renderOffset: true,
        renderRotation: true,
        renderSpeed: true,
        renderTouching: true,
        renderVelocity: true,
    });
};

Phaser.Game.prototype.addText = function (x, y, callBack) {
    var text = this.add.bitmapText(x, y, 'font', '', 15);
    text.fixedToCamera = true;
    this.texts.push({ textObject: text, valueCallBack: callBack });
}

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
Phaser.Game.prototype.every = function (lineNumber, delta, callback) {
    if (typeof this.timers[lineNumber] === 'undefined') {
        this.timers[lineNumber] = 0;
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
    this.genericEvent(this.input.keyboard.isDown(key), key, once, callback);
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
Phaser.Sprite.prototype.friction = 0.5;

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
    //this.game.actorEvents[this] = { actor: this, callback: callback };
    var events = this.game.actorEvents[this];
    if (typeof events === 'undefined') {
        this.game.actorEvents[this] = { actor: this, callbacks: [callback] };
    } else {
        events.callbacks.push(callback);
    }
}

Phaser.Sprite.prototype.every = function (lineNumber, delta, callback) {
    var self = this;
    this.addEvent( function(actor) {
        var hash = '' + lineNumber + self;
        if (typeof self.game.timers[hash] === 'undefined') {
            self.game.timers[hash] = 0;
        }

        if (self.game.timers[hash] < self.game.time.now - delta * 1000) {
            callback(actor);
            self.game.timers[hash] = self.game.time.now;
        }

    });
}