// constants
Phaser.Game.DEFAULT_MAX_ACTOR = 500;

// attributes
Phaser.Game.prototype.maxActor = null;
Phaser.Game.prototype.actorCount = null;
Phaser.Game.prototype.groups = null;

// inner class
Phaser.Game.Groups = function (game) {
    this.groups = {};
    this.game = game;

    this.get = function (name) {
        if (typeof this.groups[name] === 'undefined') {
            var group = this.game.add.group();
            group.enableBody = true;
            this.groups[name] = group;
        }
        return this.groups[name];
    }
}

// constructor
Phaser.Game.prototype.initActor = function () {
    this.groups = new Phaser.Game.Groups(this);
    this.maxActor = Phaser.Game.DEFAULT_MAX_ACTOR;
    this.actorCount = 0;
}

Phaser.Game.prototype.createActor = function (name, image, x = 0, y = 0) {

    // create actor
    var actor = this.groups.get(name).create(x, y, image);
    actor.anchor.setTo(0.5, 0.5);
    actor.checkWorldBounds = true;
    actor.outOfBoundsKill = true;
    this.physics.arcade.enable(actor);
    actor.setFriction(50);

    // set body size
    var size = Math.min(actor.body.width, actor.body.height);
    actor.body.setSize(size, size, (actor.body.width - size) / 2, (actor.body.height - size) / 2);

    // check
    this.checkNbActor(actor);

    return actor;
};

// methods
Phaser.Game.prototype.checkNbActor = function (actor) {
    if (this.actorCount > this.maxActor) {
        var msg = Blockly.Msg.ALERT_MAX_ACTOR.format(this.maxActor);
        alert(msg);
        throw msg;
    }

    var game = this;
    game.actorCount++;
    actor.events.onKilled.add(function (obj) {
        game.actorCount--;
    });

}
