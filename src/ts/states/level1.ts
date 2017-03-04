/*
Mechanics
*/

export class Level1 extends Phaser.State {
  
background: Phaser.Sprite;
items: Phaser.Group;
guy: Phaser.Sprite;
box: Phaser.Sprite;
cursors: Phaser.CursorKeys;
facing: String;
jumpTimer: Number = 0;
jumpButton: any;
boxTop: Boolean;



public create() {

    // Sprites

    this.game.add.image(0,0,'bg');

    this.guy = this.game.add.sprite(100, 400, 'guy');
    this.guy.name = 'guy';
    
    this.box = this.game.add.sprite(400, 400, 'box');
    this.box.name = 'box';

    // Init Physics

	this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.enableBody(this.guy);
    this.game.physics.arcade.enableBody(this.box);

    
    this.guy.anchor.setTo(0.5, 0.5);
    this.guy.body.setSize(18,30,32,32);

    this.box.anchor.setTo(0.5, 0.5);
    this.box.body.setSize(24,24);

    // Physics

    this.guy.body.collideWorldBounds = true;
    this.guy.body.gravity.y = 1000;
    this.guy.body.maxVelocity.y = 500;

    this.box.body.collideWorldBounds = true;
    this.box.body.gravity.y = 1000;
    this.box.body.maxVelocity.y = 500;

    this.guy.body.onCollide = new Phaser.Signal();
    this.guy.body.onCollide.add(this.hitSprite, this);

    // Animations

    this.guy.animations.add('idle', [0, 1, 2, 3], 10, true);
    this.guy.animations.add('walk', [16,17,18,19,20,21,22,23], 10, true);

    // Controls

    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}


public update() {

    // Reset physics vals

    this.guy.body.velocity.x = 0;
    this.box.body.velocity.x = 0;
    this.boxTop = false;

    // Controls & animations - Left/Right

    if (this.cursors.left.isDown)
    {
        this.guy.body.velocity.x = -150;

        this.guy.animations.play('walk');
        this.guy.scale.setTo(-1, 1);
    }
    else if (this.cursors.right.isDown)
    {
        this.guy.body.velocity.x = 150;

        this.guy.animations.play('walk');
        this.guy.scale.setTo(1, 1);
    }
    else
    {
        this.guy.animations.play('idle')
    }

    // Collision guy to box - Check before jump control to enable standing on box
    
    this.game.physics.arcade.collide(this.guy, this.box);

    if (this.jumpButton.isDown && (this.guy.body.onFloor() || this.boxTop) && this.game.time.now > this.jumpTimer)
    {
        this.guy.body.velocity.y = -300;
        this.jumpTimer = this.game.time.now + 400;
    }
    
}

public render() {

}



public hitSprite (sprite1:Phaser.Sprite, sprite2:Phaser.Sprite) {

    this.boxTop = true;
    sprite1.body.velocity.x = sprite2.body.velocity.x;
    sprite1.body.bounce.y = .1;

}

}