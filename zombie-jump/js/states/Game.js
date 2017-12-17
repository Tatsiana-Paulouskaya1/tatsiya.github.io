export class Game extends Phaser.State {
    init() {
        this.physics.startSystem(Phaser.Physics.ARCADE);  
        this.add.tileSprite(0, 0, 800, 9000, 'back');
        this.world.setBounds(0, 0, 800, 9000);
        this.physics.startSystem(Phaser.Physics.P2JS);

        this.isMusicStarted = false;
    }
    
    create() {
        this.cursors = this.game.input.keyboard.createCursorKeys();
        
        this.platforms = this.game.add.group();
        this.warriors = this.game.add.group();
        this.spiders = this.game.add.group();
        
        this.ground = this.platforms.create(0, this.game.world.height - 64, 'ground-bottom');
        this.platforms.enableBody = true;
        this.physics.arcade.enable(this.ground);
    
        this.ground.scale.setTo(2, 2);
        this.ground.body.immovable = true;
        
        for (var i = 6; i < 150; i++) {
            this.createLedge(i * 59 + 1)
        }
    
        this.player = this.createPlayer();
        this.playerLastTopPosition = this.player.body.y;
        
        this.brain = this.add.sprite(200, 50, 'brain');
        this.brain.enableBody = true;
        this.physics.arcade.enable(this.brain);
        
        this.camera.follow(this.player);

        this.spiders.enableBody = true;
    
        for (var i = 1; i <= 5; i++) {
            this.createSpiders(i * 500)  
        }
    
        
        let knight = this.warriors.create(200, 6050, 'knight');
        knight.enableBody = true;
        this.physics.arcade.enable(knight); 
        knight.animations.add('walkRight', [24, 25, 26, 27, 28]);
        knight.animations.play('walkRight', 6, true, false); 
        knight = this.warriors.create(600, 5960, 'knight');
        knight.enableBody = true;
        this.physics.arcade.enable(knight);
        knight.animations.add('walkLeft', [10, 9, 8, 7, 6]);
        knight.animations.play('walkLeft', 6, true, false); 
    
        this.mainTheme = this.game.add.audio('sound');
        this.mainTheme.play();
    }

    update() {
        const platformsCollision = this.game.physics.arcade.collide(
            this.player,
            this.platforms,
            this.killer,
            this.collisionHandler
        );
        const spiderCollision = this.game.physics.arcade.collide(this.player, this.spiders);
        const warriorCollision = this.game.physics.arcade.collide(this.player, this.warriors);
    
        this.player.body.velocity.x = 0;
      
        if (this.player.body.touching.down && platformsCollision){
            this.player.body.velocity.y = -700;
            this.sound.play('jump');
        }
    
        if (this.cursors.left.isDown){
            this.player.body.velocity.x = -450;
            this.player.animations.play('left');
        } else if (this.cursors.right.isDown) {
            this.player.body.velocity.x = 450;
            this.player.animations.play('right');
        } else {
            this.player.frame = 1;
        }
        
        if (spiderCollision || this.player.body.bottom === this.game.world.height || warriorCollision) {
            if (spiderCollision || warriorCollision) {
                this.sound.play('bom');
            }
            
            this.endGame();
            this.state.start("EndGame");
        }
       
        this.spiders.setAll('x', 0, true, true, 5);
        this.spiders.forEach(this.runSpider, this);
        
        if (this.player.body.velocity.y - this.player.body.newVelocity.y < 0) {
            this.playerLastTopPosition = this.player.body.y; 
        }
    
        if (this.playerLastTopPosition - this.player.body.y < -400) {
            this.endGame();
            this.state.start("EndGame");
        }
    
        if (this.player.body.y <= 500) {
            this.winGame()
        }

        this.warriors.forEach(this.walkKnight, this);
    }

    winGame() {
        const isBrainOverlapped = this.game.physics.arcade.overlap(
            this.player,
            this.brain
        );
    
        this.mainTheme.stop();
    
        if (!this.isMusicStarted) {
            this.sound.play("win");
            this.isMusicStarted = true;
        }
    
        this.player.body.velocity.x = 380 - this.player.body.x;
        this.player.body.velocity.y = 201 - this.player.body.y;
        this.player.body.gravity.y = 0;

        if (
            isBrainOverlapped &&
            this.player.body.bottom <= 300
        ) {
            this.player.kill();
            this.state.start("WinGame");
        }
    }
    
    endGame() {
        this.mainTheme.stop()
        this.removeCharacters(this.spiders);
        this.removeCharacters(this.warriors);
        this.player.kill();
    }

    removeCharacters(characters) {
        for (let i = 0; i < characters.children.length; i++) {
            characters.children[i].kill();
        }
    }

    walkKnight(knight) {
        if(knight.animations.currentAnim.name === 'walkLeft') {
            knight.body.x -=  1.5;
            if(knight.body.x < 0) {
                 knight.body.x = this.game.world.width;
            }
        } else {
            knight.body.x +=  1.5;
            if(knight.body.x > this.game.world.width) {
                 knight.body.x = -knight.body.width;
            }
        }
    }
    
    runSpider(spider) {
        spider.body.x +=  1.5;
        
        if (spider.body.x > this.game.world.width) {
            spider.body.x = -spider.width;
        }
    
    }
    
    collisionHandler(player, ledge) {
        if (player.body.center.y < ledge.body.y){          
            return true;
        } else {
            return false;
        }
    }
    
    
    killer(player, ledge) {  
        if (player.body.bottom <= ledge.body.y) {
            ledge.kill();
        }
    }

    createLedge(yPosition) {
        const ledge = this.platforms.create(
            this.game.rnd.integerInRange(0, 800),
            yPosition, 
            'ground'
        );
        ledge.body.immovable = true;
        ledge.body.gravity.y = 0;
        ledge.scale.setTo(0.2, 0.4);
    }

    createPlayer() {
        const player = this.game.add.sprite(300, this.game.world.height - 450, 'dude');
        this.physics.arcade.enable(player);
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 1100;
        player.body.collideWorldBounds = true;
        player.animations.add('left', [0], 10, true);
        player.animations.add('right', [2], 10, true);

        return player;
    }

    createSpiders(yPosition) {
        const spider = this.spiders.create(this.game.rnd.integerInRange(0, 800), this.game.world.height - yPosition, 'spider');
        spider.body.immovable = true;
        spider.body.gravity.y = 0;
        spider.scale.setTo(1.5, 1.5);
        spider.animations.add('run', [0, 1, 2, 3, 4]);
        spider.animations.play('run', 10, true, false); 
    }
}