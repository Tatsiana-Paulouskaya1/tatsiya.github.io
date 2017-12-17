export class Boot extends Phaser.State {
    create() {
        this.state.start('Preloader');
    }
    
    preload() {
        this.game.load.image('back', 'assets/back.png');
        this.load.audio('sound', 'assets/audio/sound1.mp3');
    }
}
