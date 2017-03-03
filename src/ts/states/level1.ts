export class Level1 extends Phaser.State {
  
background: Phaser.Sprite;
items: Phaser.Group;
guy: Phaser.Sprite;
box: Phaser.Sprite;
cursors: Phaser.CursorKeys;
facing: String;
jumpTimer: Number = 0;
jumpButton: any;



public create() {

	this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.guy = this.game.add.sprite(100, 400, 'guy');
    this.guy.name = 'guy';

    this.box = this.game.add.sprite(400, 400, 'box');
    this.box.name = 'box';

    this.game.physics.arcade.enableBody(this.guy);
    this.game.physics.arcade.enableBody(this.box);

    this.guy.body.collideWorldBounds = true;
    this.guy.body.gravity.y = 1000;
    this.guy.body.maxVelocity.y = 500;
    this.guy.anchor.setTo(0.5, 0.5);

    this.box.body.collideWorldBounds = true;
    this.box.body.gravity.y = 1000;
    this.box.body.maxVelocity.y = 500;

    this.guy.body.onCollide = new Phaser.Signal();
    this.guy.body.onCollide.add(this.hitSprite, this);

    this.guy.animations.add('idle', [0, 1, 2, 3], 10, true);
    this.guy.animations.add('walk', [16,17,18,19,20,21,22,23], 10, true);

    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    //this.game.physics.arcade.gravity.y = 300;

    this.cursors = this.game.input.keyboard.createCursorKeys();

}


public update() {

    this.guy.body.velocity.x = 0;

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
    
    if (this.jumpButton.isDown && this.guy.body.onFloor() && this.game.time.now > this.jumpTimer)
    {
        this.guy.body.velocity.y = -300;
        this.jumpTimer = this.game.time.now + 400;
    }
    this.game.physics.arcade.collide(this.guy, this.box);
}

public render() {

}

public hitSprite (sprite1, sprite2) {

    sprite1.body.velocity.x = sprite2.body.velocity.x;
    
}
}