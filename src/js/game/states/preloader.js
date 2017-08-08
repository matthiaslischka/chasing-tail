var preloader = {};

preloader.preload = function () {
  this.game.load.image('mushroom', 'images/mushroom.png')
};

preloader.create = function () {
  this.game.state.start('game');
};

module.exports = preloader;
