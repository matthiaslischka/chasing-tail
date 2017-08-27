export class Game extends Phaser.State {

    private ended = false;
    private cursors;
private snakeHead;
private playerPosition;
private direction;
private numberOfSnakeSections;
private snakeSections = new Array();
private directions = new Array();
private text;

    create(){
        this.ended = false;
        this.game.world.setBounds(0, 0, 8000, 8000);
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.cursors = this.game.input.keyboard.createCursorKeys();
      
        // game.drawLevel();
      
        this.game.stage.backgroundColor = "#4488AA";
        this.snakeHead = this.game.add.sprite(400, 300, 'mushroom');
        this.physics.arcade.enable(this.snakeHead);
      
        this.game.camera.follow(this.snakeHead);
        this.game.camera.deadzone = new Phaser.Rectangle(200, 380, 1, 1);
      
        this.playerPosition = new Phaser.Point(4 * this.snakeHead.width, 4 * this.snakeHead.height);
        this.direction = new Phaser.Point(0, 0);
        this.numberOfSnakeSections = 10;
      
        for (var i = 0; i < this.numberOfSnakeSections; i++) {
          this.snakeSections[i] = this.game.add.sprite(this.playerPosition.x, this.playerPosition.y, 'mushroom');
          this.directions[i] = new Phaser.Point(0, 0);
          this.physics.arcade.enable(this.snakeSections[i]);
        }
      
        var textStyle = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        this.text = this.game.add.text(30, 15, "", textStyle);
        this.text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        this.text.fixedToCamera = true;
      
        // this.game.time.events.loop(Phaser.Timer.QUARTER, this.game.move, this);
    }
} 