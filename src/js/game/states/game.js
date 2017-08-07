var game = {};

var cursors;
var snakeHead;
var playerPosition;
var direction;
var snakeSections = new Array();
var directions = new Array();

game.create = function () {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.world.setBounds(0, 0, 800, 600);
  cursors = game.input.keyboard.createCursorKeys();

  snakeHead = game.add.sprite(400, 300, 'mushroom');

  playerPosition = new Phaser.Point(400, 300);
  direction = new Phaser.Point(0, 0);

  for (var i = 0; i <= 10; i++) {
    snakeSections[i] = game.add.sprite(400, 300, 'mushroom');
    snakeSections[i].x = 400;
    snakeSections[i].y = 300;
    directions[i] = new Phaser.Point(0,0);
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
  playerPosition.add(direction.x * 64, direction.y * 64);
  snakeHead.x = playerPosition.x;
  snakeHead.y = playerPosition.y;

  directions.pop();
  directions.unshift(new Phaser.Point(direction.x, direction.y));

  for (var i = 0; i <= 10; i++) {
    snakeSections[i].x = snakeSections[i].x + (directions[i].x * 64); 
    snakeSections[i].y = snakeSections[i].y + (directions[i].y * 64); 
  }
};

module.exports = game;
