import {
    commonData,
    restartGame,
    removeCharacters
} from "./shared";

let playerLastTopPosition;
let isMusicStarted = false;

export function update() {
    const { player, platforms, warriors, jump, cursors, bom, brain, spiders } = commonData;
    const platformsCollision = this.game.physics.arcade.collide(player, platforms, killer, collisionHandler);
    const spiderCollision = this.game.physics.arcade.collide(player, spiders);
    const warriorCollision = this.game.physics.arcade.collide(player, warriors);

    commonData.player.body.velocity.x = 0;
  
    if (commonData.player.body.touching.down && platformsCollision){
        commonData.player.body.velocity.y = -700;
        commonData.jump.play();
    }

    if (commonData.cursors.left.isDown){
        commonData.player.body.velocity.x = -450;
        commonData.player.animations.play('left');
    } else if (commonData.cursors.right.isDown) {
        commonData.player.body.velocity.x = 450;
        commonData.player.animations.play('right');
    } else {
        commonData.player.frame = 1;
    }

    if (spiderCollision || commonData.player.body.bottom === this.game.world.height || warriorCollision) {
        if (spiderCollision || warriorCollision) {
            commonData.bom.play();
        }

        commonData.player.kill();
        gameOver.call(this);
    }
   
    commonData.spiders.setAll('x', 0, true, true, 5);
    commonData.spiders.forEach(runSpider, this);

    if (!playerLastTopPosition) {
        playerLastTopPosition = commonData.player.body.y;
    }
    
    if (commonData.player.body.velocity.y - commonData.player.body.newVelocity.y < 0) {
        playerLastTopPosition = commonData.player.body.y; 
    }

    if (playerLastTopPosition - commonData.player.body.y < -400) {
        gameOver.call(this);
    }

    commonData.warriors.forEach(walkKnight, this);

    if(commonData.player.body.y <= 500) {
        gameWin.call(this);
    }
}

function gameWin() {
    const { sound, player, win, brain } = commonData;

    const winText = this.game.add.text(
        this.game.world.centerX,
        this.game.camera.y + 450,
        'Congratulations! \n You won!',
        { font: "40px Arial", fill: "#ffffff", align: "center" }
    );
    winText.anchor.setTo(0.5, 0.5);

    sound.stop();

    if (!isMusicStarted) {
        win.play();
        isMusicStarted = true;
    }

    player.body.velocity.x = 380 - player.body.x;
    player.body.velocity.y = 201 - player.body.y;
    player.body.gravity.y = 0;

    this.game.camera.follow(null);
    this.game.physics.arcade.overlap(player, brain, onBrainOverlap);
}

function onBrainOverlap(player, brain) {
    if (player.body.bottom <= brain.body.center.y) {
        player.kill();
    }
}

function gameOver() {
    const { player, sound, spiders } = commonData;
    const gameOverText = this.game.add.text(
        this.game.world.centerX,
        this.game.camera.y + 450,
        'Game Over! \n -click to restart-',
        { font: "40px Arial", fill: "#ffffff", align: "center" }
    );
    gameOverText.anchor.setTo(0.5, 0.5);

    this.game.camera.follow(null);
    this.game.input.onTap.addOnce(restartGame,this);

    removeCharacters(spiders);
    player.kill();

    sound.stop();
}

function walkKnight(knight) {
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

function runSpider(spider) {
    spider.body.x +=  1.5;
    
    if (spider.body.x > this.game.world.width) {
        spider.body.x = -spider.width;
    }

}

function collisionHandler(player, ledge) {
    if (player.body.center.y < ledge.body.y){          
        return true;
    } else {
        return false;
    }
}

function killer(player, ledge) {  
    if (player.body.bottom <= ledge.body.y) {
        ledge.kill();
    }
}