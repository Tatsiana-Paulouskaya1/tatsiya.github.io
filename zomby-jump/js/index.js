import { Boot, Preloader, Game, EndGame, WinGame } from "./states";

const game = new Phaser.Game(800, window.innerHeight, Phaser.AUTO, "");

game.state.add("Boot", Boot);
game.state.add("Preloader", Preloader);
game.state.add("Game", Game);
game.state.add("EndGame", EndGame);
game.state.add("WinGame", WinGame);

game.state.start("Boot");

export default game;