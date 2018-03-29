// -- game --
// global
Phaser.Game.prototype.groups = null;

Phaser.Game.prototype.initGroups = function () {
    if (this.groups == null) {
        this.groups = {};
    }
}

Phaser.Game.prototype.findGroup = function (actor) {
    if (typeof actor === 'string') {
        return this.groups[actor];
    }
    return actor;
};

// game.method
Phaser.Game.prototype.initGame = function(w, h, bg) {
    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.add.tileSprite(0, 0, w, h, bg);
    this.world.setBounds(0, 0, w, h);
};

Phaser.Game.prototype.debugGame = function () {
    this.plugins.add(Phaser.Plugin.DebugArcadePhysics);
    /*this.debug.arcade.on()
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
        renderFriction: true,
        renderLegend: true,
        renderMaxVelocity: true,
        renderOffset: true,
        renderRotation: true,
        renderSpeed: true,
        renderTouching: true,
        renderVelocity: true,
    });*/
};

// game.factory
Phaser.Game.prototype.createActor = function (name, x = 0, y = 0) {

    // create groupe if not exists
    this.initGroups();
    if (typeof this.groups[name] === 'undefined') {
        this.groups[name] = this.add.group();
    }

    var actor = this.groups[name].create(x, y, name);
    actor.anchor.setTo(0.5, 0.5);
    
    this.physics.arcade.enable(actor);

    return actor;
};

// game.event
Phaser.Game.prototype.onCollide = function(actor1, actor2, callback) {
    var group1 = this.findGroup(actor1);
    var group2 = this.findGroup(actor2);

    this.initGroups();

    if (!(typeof group1 === 'undefined' || typeof group2 === 'undefined')) {
        this.physics.arcade.collide(group1, group2, callback);
    }
}

Phaser.Game.prototype.onIntersects = function (actor1, actor2, callback) {
    var group1 = this.findGroup(actor1);
    var group2 = this.findGroup(actor2);

    this.initGroups();

    if (!(typeof group1 === 'undefined' || typeof group2 === 'undefined')) {
        this.physics.arcade.intersects(group1, group2, callback);
    }
}

Phaser.Game.prototype.onOverlap = function (actor1, actor2, callback) {
    var group1 = this.findGroup(actor1);
    var group2 = this.findGroup(actor2);

    this.initGroups();

    if (!(typeof group1 === 'undefined' || typeof group2 === 'undefined')) {
        this.physics.arcade.overlap(group1, group2, callback);
    }
}

// -- actor --
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

Phaser.Sprite.prototype.scale = function (x, y) {
    sprite.scale.setTo(x / 100, y / 100);
    sprite.body.scale
}