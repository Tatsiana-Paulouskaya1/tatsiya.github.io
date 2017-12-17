export class WinGame extends Phaser.State {
    init() {
        this.game.camera.follow(null);
    }

    create() {
        const winText = this.game.add.text(
            this.game.world.centerX,
            this.game.camera.y + 450,
            'Congratulations! \n You won!',
            { font: "40px Arial", fill: "#ffffff", align: "center" }
        );

        winText.anchor.setTo(0.5, 0.5);
    }
}