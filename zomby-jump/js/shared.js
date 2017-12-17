export let commonData = {
    brain: null,
    platforms: null,
    player: null,
    spiders: null,
    warriors: null,
    jump: null,
    bom: null,
    sound: null,
    cursors: null,
    win: null
};

export function restartGame() {
    this.game.state.start(this.game.state.current);
}

export function removeCharacters(characters) {
    for (let i = 0; i < characters.children.length; i++) {
        characters.children[i].kill();
    }
}