var game = {};

var cursors;
var snakeHead;
var playerPosition;
var direction;
var snakeSections = new Array();
var directions = new Array();
var numberOfSnakeSections;

var level = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 2, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 2, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

var levelBlocksGroup;
var foodGroup;

game.create = function () {
  game.world.setBounds(0, 0, 800, 600);
  game.physics.startSystem(Phaser.Physics.ARCADE);
  cursors = game.input.keyboard.createCursorKeys();

  snakeHead = game.add.sprite(400, 300, 'mushroom');
  snakeHead.scale.setTo(0.5, 0.5);
  this.physics.arcade.enable(snakeHead);

  playerPosition = new Phaser.Point(4 * snakeHead.width, 4 * snakeHead.height);
  direction = new Phaser.Point(0, 0);
  numberOfSnakeSections = 10;

  for (var i = 0; i < numberOfSnakeSections; i++) {
    snakeSections[i] = game.add.sprite(400, 300, 'mushroom');
    snakeSections[i].scale.setTo(0.5, 0.5);
    snakeSections[i].x = playerPosition.x;
    snakeSections[i].y = playerPosition.y;
    directions[i] = new Phaser.Point(0, 0);
    this.physics.arcade.enable(snakeSections[i]);
  }

  game.drawLevel();

  game.time.events.loop(Phaser.Timer.QUARTER, game.move, this);
};

game.drawLevel = function () {
  levelBlocksGroup = game.add.group();
  foodGroup = game.add.group();

  for (var y = 0; y < level.length; y++) {
    for (var x = 0; x < level[0].length; x++) {
      if (level[y][x] == 1) {
        var wallSprite = game.add.sprite((x + 1) * 64, (y + 1) * 64, 'wall');
        game.physics.arcade.enable(wallSprite);
        levelBlocksGroup.add(wallSprite);
      }

      if (level[y][x] == 2) {
        var foodSprite = game.add.sprite((x + 1) * 64, (y + 1) * 64, 'apple');
        game.physics.arcade.enable(foodSprite);
        foodGroup.add(foodSprite);
      }
    }
  }
}

game.update = function () {

  game.physics.arcade.overlap(snakeHead, foodGroup, foodCollisionHandler, null, this);

  if (this.physics.arcade.overlap(snakeHead, levelBlocksGroup)) {
    game.state.start('boot');
  }

  if (cursors.up.isDown && direction.y != 1) {
    direction = new Phaser.Point(0, -1);
  }
  else if (cursors.down.isDown && direction.y != -1) {
    direction = new Phaser.Point(0, 1);
  }
  else if (cursors.left.isDown && direction.x != 1) {
    direction = new Phaser.Point(-1, 0);
  }
  else if (cursors.right.isDown && direction.x != -1) {
    direction = new Phaser.Point(1, 0);
  }
};

game.move = function () {

  playerPosition.add(direction.x * snakeHead.width, direction.y * snakeHead.height);
  snakeHead.x = playerPosition.x;
  snakeHead.y = playerPosition.y;

  for (var i = 0; i < numberOfSnakeSections; i++) {
    snakeSections[i].x = snakeSections[i].x + (directions[i].x * snakeSections[i].width);
    snakeSections[i].y = snakeSections[i].y + (directions[i].y * snakeSections[i].height);
  }

  if (direction.x != 0 || direction.y != 0) {
    if (this.physics.arcade.overlap(snakeHead, snakeSections)) {
      alert("Snake AUA");
    }
  }

  directions.pop();
  directions.unshift(new Phaser.Point(direction.x, direction.y));
};

function foodCollisionHandler(snakeHead, food) {
  food.kill();
}

module.exports = game;
