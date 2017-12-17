import { commonData } from "./shared";

export function create() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);  
    this.game.add.tileSprite(0, 0, 800, 9000, 'back');
    this.game.world.setBounds(0, 0, 800, 9000);
    this.game.physics.startSystem(Phaser.Physics.P2JS);

    commonData.cursors = this.game.input.keyboard.createCursorKeys();

    commonData.platforms = this.game.add.group();
    commonData.platforms.enableBody = true;

    const ground = commonData.platforms.create(0, this.game.world.height - 64, 'ground-bottom');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;
    
    for (var i = 6; i < 150; i++) {
        let ledge = commonData.platforms.create(this.game.rnd.integerInRange(0, 800), i*59+1, 'ground');
        ledge.body.immovable = true;
        ledge.body.gravity.y = 0;
        ledge.scale.setTo(0.2, 0.4);
    }

    commonData.player = this.game.add.sprite(300, this.game.world.height - 450, 'dude');
    this.game.physics.arcade.enable(commonData.player);
    commonData.player.body.bounce.y = 0.2;
    commonData.player.body.gravity.y = 1100;
    commonData.player.body.collideWorldBounds = true;
    commonData.player.animations.add('left', [0], 10, true);
    commonData.player.animations.add('right', [2], 10, true);

    commonData.brain = this.game.add.sprite(200, 50, 'brain');
    commonData.brain.enableBody = true;
    this.game.physics.arcade.enable(commonData.brain);
    
    this.game.camera.follow(commonData.player);

    commonData.spiders = this.game.add.group();
    commonData.spiders.enableBody = true;

  for (var i = 1; i <= 5; i++) {
        let spider = commonData.spiders.create(this.game.rnd.integerInRange(0, 800), this.game.world.height - i*500, 'spider');
        spider.body.immovable = true;
        spider.body.gravity.y = 0;
        spider.scale.setTo(1.5, 1.5);
        spider.animations.add('run', [0, 1, 2, 3, 4]);
        spider.animations.play('run', 10, true, false);  
    }

    commonData.warriors = this.game.add.group();
    let knight = commonData.warriors.create(200, 6050, 'knight');
    knight.enableBody = true;
    this.game.physics.arcade.enable(knight); 
    knight.animations.add('walkRight', [24, 25, 26, 27, 28]);
    knight.animations.play('walkRight', 6, true, false); 
    knight = commonData.warriors.create(600, 5960, 'knight');
    knight.enableBody = true;
    this.game.physics.arcade.enable(knight);
    knight.animations.add('walkLeft', [10, 9, 8, 7, 6]);
    knight.animations.play('walkLeft', 6, true, false); 

    commonData.jump = this.game.add.audio('jump');
    commonData.bom = this.game.add.audio('bom');
    commonData.sound = this.game.add.audio('sound');
    commonData.win = this.game.add.audio('win');
    commonData.sound.play();
}