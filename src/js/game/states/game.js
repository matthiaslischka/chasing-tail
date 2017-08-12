var game = {};

var cursors;
var snakeHead;
var playerPosition;
var direction;
var snakeSections = new Array();
var directions = new Array();
var numberOfSnakeSections;

var level = [
  [2, 2, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 1, 2, 1, 1, 2, 0, 0, 0, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2],
  [2, 1, 2, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 1, 2, 2, 2, 2, 2, 1, 2],
  [2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 3, 1, 1, 2],
  [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2],
  [2, 1, 2, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2],
  [2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2],
  [2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 2],
  [2, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 2],
  [2, 1, 1, 1, 1, 1, 3, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2],
  [2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2],
  [2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2],
  [2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2],
  [2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
  [2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
  [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
  [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 2],
  [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
];

var levelBlocksGroup;
var foodGroup;

var text;

game.create = function () {
  ended = false;
  game.world.setBounds(0, 0, 8000, 8000);
  game.physics.startSystem(Phaser.Physics.ARCADE);
  cursors = game.input.keyboard.createCursorKeys();

  game.drawLevel();

  game.stage.backgroundColor = "#4488AA";
  snakeHead = game.add.sprite(400, 300, 'mushroom');
  this.physics.arcade.enable(snakeHead);

  game.camera.follow(snakeHead);
  game.camera.deadzone = new Phaser.Rectangle(200, 380, 1, 1);

  playerPosition = new Phaser.Point(4 * snakeHead.width, 4 * snakeHead.height);
  direction = new Phaser.Point(0, 0);
  numberOfSnakeSections = 10;

  for (var i = 0; i < numberOfSnakeSections; i++) {
    snakeSections[i] = game.add.sprite(playerPosition.x, playerPosition.y, 'mushroom');
    directions[i] = new Phaser.Point(0, 0);
    this.physics.arcade.enable(snakeSections[i]);
  }

  var textStyle = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
  text = game.add.text(30, 15, "", textStyle);
  text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
  text.fixedToCamera = true;

  game.time.events.loop(Phaser.Timer.QUARTER, game.move, this);
};

game.drawLevel = function () {
  grassGroup = game.add.group();
  levelBlocksGroup = game.add.group();
  foodGroup = game.add.group();

  for (var y = 0; y < level.length; y++) {
    for (var x = 0; x < level[0].length; x++) {

      if (level[y][x] > 0) {
        var grassSprite = game.add.sprite((x + 1) * 64, (y + 1) * 64, 'grass');
        grassGroup.add(grassSprite);
      }

      if (level[y][x] == 2) {
        var wallSprite = game.add.sprite((x + 1) * 64, (y + 1) * 64, 'wall');
        game.physics.arcade.enable(wallSprite);
        levelBlocksGroup.add(wallSprite);
      }

      if (level[y][x] == 3) {
        var foodSprite = game.add.sprite((x + 1) * 64, (y + 1) * 64, 'apple');
        game.physics.arcade.enable(foodSprite);
        foodGroup.add(foodSprite);
      }
    }
  }
}

var ended = false;

game.update = function () {

  text.text = foodGroup.total + " to go!";

  if (ended == true)
    return;

  game.physics.arcade.overlap(snakeHead, foodGroup, foodCollisionHandler, null, this);

  if (this.physics.arcade.overlap(snakeHead, levelBlocksGroup)) {
    game.camera.shake(0.05, 500);
    direction = new Phaser.Point(0, 0);
    ended = true;
    game.camera.onShakeComplete.add(function () { game.state.start('boot'); }, this);
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
  var playerTween = game.add.tween(snakeHead).to({
    x: playerPosition.x,
    y: playerPosition.y
  }, 64, Phaser.Easing.Linear.None, true);

  for (var i = 0; i < numberOfSnakeSections; i++) {

    var snakeSectionTween = game.add.tween(snakeSections[i]).to({
      x: snakeSections[i].x + (directions[i].x * snakeSections[i].width),
      y: snakeSections[i].y + (directions[i].y * snakeSections[i].height)
    }, 64, Phaser.Easing.Linear.None, true);
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
