var game = {};

var cursors;
var sprite;

game.create = function () {
  var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
  logo.anchor.setTo(0.5, 0.5);

  game.physics.startSystem(Phaser.Physics.ARCADE);

  sprite = this.game.add.sprite(200, 200, 'mushroom');

  cursors = game.input.keyboard.createCursorKeys();
};


var speed = 4;
var speedX = 0;
var speedY = 0;

game.update = function () {
sprite2.body.setZeroVelocity();

  if (cursors.left.isDown) {
    speedX = -speed;
  }
  else if (cursors.right.isDown) {
    speedX = speed;
  }

  if (cursors.up.isDown) {
    speedY = -speed;
  }
  else if (cursors.down.isDown) {
    speedY = speed;
  }

  sprite.body.moveLeft(400);
  sprite.x += speedX;
  sprite.y += speedY;
};

module.exports = game;
