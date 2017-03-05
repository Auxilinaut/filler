/*
Mechanics
*/

import Items from "../items";

export class Level1 extends Phaser.State {
  
background: Phaser.Sprite;
items: Items;
guy: Phaser.Sprite;
box: Phaser.Sprite;
explosions: Phaser.Group;

cursors: Phaser.CursorKeys;
jumpButton: any;
jumpTimer: number = 0;
jumping: Boolean;

boxTop: Boolean;
facingRight: Boolean = true;

lastItemInterval: number;
nextItemInterval: number;

score: number = 0;



public create() {

    // Sprites

    this.game.add.image(0,0,'bg');

    this.guy = this.game.add.sprite(100, 400, 'guy');
    this.guy.name = 'guy';

    this.box = this.game.add.sprite(200, 400, 'box');
    this.box.name = 'box';

    // Init Physics

	this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.enableBody(this.guy);
    this.game.physics.arcade.enableBody(this.box);
    
    //bounds for guy
    this.guy.body.setSize(12,28,26,25);
    this.guy.anchor.setTo(0.5, 0.5);
    this.guy.scale.setTo(2);

    //bounds for box
    this.box.body.setSize(24,24,5,5);
    this.box.anchor.setTo(0.5, 0.5);
    this.box.scale.setTo(3);

    // Physics Specifics
    
    this.box.body.bounce.setTo(1,.35);
    this.box.body.drag.setTo(150);

    this.box.body.collideWorldBounds = true;
    this.box.body.gravity.y = 1000;
    this.box.body.maxVelocity.y = 500;
    
    this.guy.body.bounce.setTo(.5,0);

    this.guy.body.collideWorldBounds = true;
    this.guy.body.gravity.y = 1000;
    this.guy.body.maxVelocity.y = 500;

    // Controls

    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    // Items

    this.items = new Items(this.game);
    this.lastItemInterval = this.game.time.now;
    this.nextItemInterval = Math.random()*4000 + 1000;

    // Animations

    this.guy.animations.add('idle', [0, 1, 2, 3], 6, true);
    this.guy.animations.add('walk', [16,17,18,19,20,21,22,23], 20, true);
    this.guy.animations.add('jump', [32,33], 6, false);
    this.guy.animations.add('fall', [34,35], 6, true);
    this.guy.animations.add('land', [36,37,38,39], 20,false);
    this.guy.animations.add('dead', [64,65,66,67,68,69,70], 10,false);
    
    //explosions
    this.explosions = this.game.add.group();
    this.explosions.enableBody = true;
    this.explosions.physicsBodyType = Phaser.Physics.ARCADE;
    this.explosions.createMultiple(30, 'explosion');
    this.explosions.setAll('anchor.x', 0.5);
    this.explosions.setAll('anchor.y', 0.5);
    this.explosions.forEach(function (explosion: Phaser.Sprite) {
        explosion.animations.add('explosion');
    }, this);
}


public update() {
    if (this.guy.alive){
        // Reset physics vals
        this.guy.body.velocity.x = 0;
        this.boxTop = false;
        this.jumping = !this.guy.body.onFloor();

        // Controls & animations
        
        //jumping
        if (this.jumpButton.isDown && !this.jumping && this.game.time.now > this.jumpTimer)
        {
            this.guy.body.velocity.y = -500;
            this.jumpTimer = this.game.time.now + 1200;
            this.guy.animations.play('jump');
        } else if (this.cursors.left.isDown) //left/right
        {
            this.facingRight = false;
            this.guy.body.velocity.x = -200;
            if (!this.jumping) { 
                this.guy.animations.play('walk'); 
            }
            this.guy.scale.setTo(-2, 2);
        }
        else if (this.cursors.right.isDown)
        {
            this.facingRight = true;
            this.guy.body.velocity.x = 200;
            if (!this.jumping){ 
                this.guy.animations.play('walk'); 
            }
            this.guy.scale.setTo(2);
        }else if (this.jumping){ //falling
            this.guy.animations.play('fall');
        }else{
            this.guy.animations.play('idle');
        }

        // Collision
        
        //guy to box
        this.game.physics.arcade.overlap(this.guy, this.box, this.moveBox, null, this);

        //items to all
        this.items.forEachAlive(function (itm:Phaser.Sprite) {
            if (itm.body.onFloor()){
                itm.kill();
            }else{
                this.game.physics.arcade.overlap(itm, this.guy, this.fellDown, null, this);
                this.game.physics.arcade.collide(itm, this.box, this.fellDown, null, this);
            }
        }, this);

        this.updateNextItemInterval();
    }else{
        if (this.jumpButton.isDown) this.game.state.start("Preload");
    }
    
}

// Debug text and score display
public render() {
    /*this.game.debug.body(this.guy);
    this.items.forEachAlive(function (itm:Phaser.Sprite) {
        this.game.debug.body(itm);
    }, this);
    this.game.debug.body(this.box);*/

    this.game.debug.text("Score: " + this.score, 20, 20);
    if (!this.guy.alive){
        this.game.debug.text("You died. Spacebar to restart.",80,this.game.height/2);
    }
    /*
    this.game.debug.text("Jumping: " + this.jumping, 0, 64);
    this.game.debug.text("OnFloor: " + this.guy.body.onFloor(), 0,96);
    this.game.debug.text("Animation: " + this.guy.animations.currentAnim.name, 0, 128)
    */
}

// Collision 

//guy to box
public moveBox (guy:Phaser.Sprite, box:Phaser.Sprite) {

    box.body.velocity.x = guy.body.velocity.x;

    if (this.facingRight){
        guy.body.velocity.x = -10;
    }else{
        guy.body.velocity.x = 10;
    }
}

//items to all
public fellDown (item:Phaser.Sprite, sprite:Phaser.Sprite){
    if (sprite.name=='box'){
        this.score ++;
        item.kill();
    }else{
        if (item.width*item.height > sprite.width*sprite.height){
            item.kill();
            sprite.alive = false;
            sprite.animations.stop();
            sprite.animations.play('dead');
        }
    }
}

// Random item spawn interval setter
public updateNextItemInterval() {

    if (this.game.time.now - this.lastItemInterval > this.nextItemInterval){
        this.nextItemInterval = Math.random()*2000 + 1000;
        this.lastItemInterval = this.game.time.now;
        this.items.spawn();
    }
}



}