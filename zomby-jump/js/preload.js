export function preload() {
    this.game.load.image('back', 'assets/back.png');
    this.game.load.image('ground', 'assets/platform.png');
    this.game.load.image('brain', 'assets/brain.png');
    this.game.load.image('ground-bottom', 'assets/platform_underground.png');
    this.game.load.spritesheet('dude', 'assets/zomb.png', 46, 83);
    this.game.load.spritesheet('spider', 'assets/spider.png', 80, 43);
    this.game.load.spritesheet('knight', 'assets/knight.png', 103, 90);
    this.game.load.audio('jump', 'assets/audio/jump1.mp3');
    this.game.load.audio('bom', 'assets/audio/bom.mp3');
    this.game.load.audio('sound', 'assets/audio/sound1.mp3');
    this.game.load.audio('win', 'assets/audio/final1.mp3');
}