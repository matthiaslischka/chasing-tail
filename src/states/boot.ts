
export class Boot extends Phaser.State {

    preload() {
        this.load.image('mushroom', 'images/mushroom.png')
        this.load.image('grass', 'images/grass.png')
        this.load.image('wall', 'images/wall.png')
        this.load.image('apple', 'images/apple.png')
    }

    create() {
        if (!this.game.device.desktop) {
            this.scale.forceOrientation(true, false); // Landscape
            //this.scale.forceOrientation(false, true); // Portrait
        }

        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; // Use max screen space

        this.game.state.start('game');

    }
}