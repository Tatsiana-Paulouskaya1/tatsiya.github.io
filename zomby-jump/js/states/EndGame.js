export class EndGame extends Phaser.State {
    init() {
        this.game.camera.follow(null);
    }
    
    create() {
        const winText = this.game.add.text(
            this.game.world.centerX,
            this.game.camera.y + 450,
            'Game Over! \n -click to restart-',
            { font: "40px Arial", fill: "#ffffff", align: "center" }
        );
        winText.anchor.setTo(0.5, 0.5);

        this.game.input.onTap.addOnce(this.restartGame, this);
    }

    restartGame() {
        this.state.start("Game")
    }

    removeCharacters(characters) {
        characters.forEach(character => {
            character.destroy();
        })
    }
}