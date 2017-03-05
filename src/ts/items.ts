/*
    Group for items
*/

export default class Items extends Phaser.Group {

    MAX_ITEMS: number = 160;
    sprites: Phaser.Sprite[] = [];
    num: number = 0;

    constructor(game: Phaser.Game) {

        super(game, null, 'items');

        game.add.existing(this);

        // set physics for group
        this.enableBody = true;
        this.physicsBodyType = Phaser.Physics.ARCADE;

        this.spawn();

    }

    public spawn () {

        if (this.num <= this.MAX_ITEMS - 1){
            //  This creates a new Phaser.Sprite instance within the group
            //  Random location in top of world, random sprites from XML atlas
            this.sprites[this.num] = this.create(Math.random() * 411, 0, 'items', this.num); 
            this.sprites[this.num].scale.setTo(.5);
            // Physics per Sprite
            this.sprites[this.num].body.gravity.y = 1000;
            this.sprites[this.num].body.maxVelocity.y = 500;
            this.sprites[this.num].body.bounce.set(.6);
            this.sprites[this.num].body.velocity.x = Math.random() * 100 + 10;
            this.sprites[this.num].body.velocity.x *= Math.floor(Math.random()*2) == 1 ? 1 : -1; // this will add minus sign in 50% of cases
            this.sprites[this.num].body.angularVelocity = 100;
            this.sprites[this.num].body.angularVelocity *= Math.floor(Math.random()*2) == 1 ? 1 : -1; // this will add minus sign in 50% of cases
            this.sprites[this.num].body.collideWorldBounds = true;
            this.sprites[this.num].anchor.setTo(0.5);
            //this.sprites[i].smoothed = false;

            this.num ++;
        }

    }

}