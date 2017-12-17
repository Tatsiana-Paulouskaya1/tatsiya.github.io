export class Boot extends Phaser.State {
    create() {
        this.state.start('Preloader');
    }
}
