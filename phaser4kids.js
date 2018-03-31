// -- game --
// global
Phaser.Game.prototype.groups = null;
Phaser.Game.prototype.previousEventStates = null;
Phaser.Game.prototype.keyCaptures = [Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, 
    Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.BACKSPACE, Phaser.Keyboard.DELETE, Phaser.Keyboard.ENTER,
    Phaser.Keyboard.PAGE_UP, Phaser.Keyboard.PAGE_DOWN, Phaser.Keyboard.HOME, Phaser.Keyboard.END];

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

    for (var i in this.keyCaptures) {
        this.input.keyboard.removeKeyCapture(this.keyCaptures[i]);
    }
}

Phaser.Game.prototype.resume = function () {
    this.paused = false;
    this.input.keyboard.addKeyCapture(this.keyCaptures);
}

// game.method
Phaser.Game.prototype.initGameSystem = function () {
    this.groups = {};
    this.previousEventStates = {};

    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.input.keyboard.addKeyCapture(this.keyCaptures);
    this.input.mouse.capture = true;
}

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

// game.factory
Phaser.Game.prototype.createActor = function (name, x = 0, y = 0) {

    var actor = this.findOrCreateGroup(name).create(x, y, name);
    actor.anchor.setTo(0.5, 0.5);
    
    this.physics.arcade.enable(actor);

    return actor;
};

// game.event
Phaser.Game.prototype.onCollide = function(actor1, actor2, callback) {
    var group1 = this.findGroup(actor1);
    var group2 = this.findGroup(actor2);

    if (!(typeof group1 === 'undefined' || typeof group2 === 'undefined')) {
        this.physics.arcade.collide(group1, group2, callback);
    }
}

Phaser.Game.prototype.onIntersects = function (actor1, actor2, callback) {
    var group1 = this.findGroup(actor1);
    var group2 = this.findGroup(actor2);

    if (!(typeof group1 === 'undefined' || typeof group2 === 'undefined')) {
        this.physics.arcade.intersects(group1, group2, callback);
    }
}

Phaser.Game.prototype.onOverlap = function (actor1, actor2, callback) {
    var group1 = this.findGroup(actor1);
    var group2 = this.findGroup(actor2);

    if (!(typeof group1 === 'undefined' || typeof group2 === 'undefined')) {
        this.physics.arcade.overlap(group1, group2, callback);
    }
}

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

Phaser.Game.prototype.onKeyDown = function (key, once, callback) {
    this.genericEvent(this.input.keyboard.isDown(key), key, once, callback);
}

Phaser.Game.prototype.onMouseLeftDowm = function (once, callback) {
    this.genericEvent(this.input.activePointer.leftButton.isDown, 'mouseLeft', once, callback);
}

Phaser.Game.prototype.onMouseMiddleDowm = function (once, callback) {
    this.genericEvent(this.input.activePointer.middleButton.isDown, 'mouseMiddle', once, callback);
}

Phaser.Game.prototype.onMouseRightDowm = function (once, callback) {
    this.genericEvent(this.input.activePointer.rightButton.isDown, 'mouseRight', once, callback);
}

// -- actor --onMouseLeftDowm
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