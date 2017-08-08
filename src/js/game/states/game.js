var game = {};

var cursors;
var snakeHead;
var playerPosition;
var direction;
var snakeSections = new Array();
var directions = new Array();
var numberOfSnakeSections;

game.create = function () {
  game.world.setBounds(0, 0, 800, 600);
  game.physics.startSystem(Phaser.Physics.ARCADE);
  cursors = game.input.keyboard.createCursorKeys();

  snakeHead = game.add.sprite(400, 300, 'mushroom');
  this.physics.arcade.enable(snakeHead);

  playerPosition = new Phaser.Point(400, 300);
  direction = new Phaser.Point(0, 0);
  numberOfSnakeSections = 2;

  for (var i = 0; i < numberOfSnakeSections; i++) {
    snakeSections[i] = game.add.sprite(400, 300, 'mushroom');
    snakeSections[i].x = 400;
    snakeSections[i].y = 300;
    directions[i] = new Phaser.Point(0, 0);
    this.physics.arcade.enable(snakeSections[i]);
  }

  game.time.events.loop(Phaser.Timer.QUARTER, game.move, this);
};

game.update = function () {

  if (cursors.up.isDown) {
    direction = new Phaser.Point(0, -1);
  }
  else if (cursors.down.isDown) {
    direction = new Phaser.Point(0, 1);
  }
  else if (cursors.left.isDown) {
    direction = new Phaser.Point(-1, 0);
  }
  else if (cursors.right.isDown) {
    direction = new Phaser.Point(1, 0);
  }
};

game.move = function () {

  playerPosition.add(direction.x * snakeHead.width, direction.y * snakeHead.height);
  snakeHead.x = playerPosition.x;
  snakeHead.y = playerPosition.y;

  if (direction.x != 0 || direction.y != 0)
    if (this.physics.arcade.collide(snakeHead, snakeSections)) {
      alert("Aua");
    }

  for (var i = 0; i < numberOfSnakeSections; i++) {
    snakeSections[i].x = snakeSections[i].x + (directions[i].x * snakeSections[i].width);
    snakeSections[i].y = snakeSections[i].y + (directions[i].y * snakeSections[i].height);
  }

  directions.pop();
  directions.unshift(new Phaser.Point(direction.x, direction.y));
};

module.exports = game;
