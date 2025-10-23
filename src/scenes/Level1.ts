/*
  Phaser 3 port of Level1
*/
import Phaser from 'phaser'
import Items from '../items'

export default class Level1 extends Phaser.Scene {
  private bg!: Phaser.GameObjects.Image
  private items!: Items
  private guy!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
  private guyAlive = true;
  private box!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
  private explosions!: Phaser.GameObjects.Group

  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private jumpKey!: Phaser.Input.Keyboard.Key
  private jumpTimer = 0
  private jumping = false

  private boxTop = false
  private facingRight = true

  private lastItemInterval = 0
  private nextItemInterval = 0

  private score = 0
  private scoreText!: Phaser.GameObjects.Text

  constructor() { super('Level1') }

  create() {
    this.bg = this.add.image(0, 0, 'bg').setOrigin(0)

    this.guy = this.physics.add.sprite(100, 400, 'guy').setName('guy')
    this.guy.setCollideWorldBounds(true).setBounce(0.5, 0).setGravityY(1000).setMaxVelocity(999, 500).setScale(2)
    this.guy.setBodySize(12, 28).setOffset(26, 25)
    this.guyAlive = true;

    this.box = this.physics.add.sprite(200, 400, 'box').setName('box')
    this.box.setCollideWorldBounds(true).setBounce(1, 0.35).setDrag(150, 0).setGravityY(1000).setMaxVelocity(999, 500).setScale(3)
    this.box.setBodySize(24, 24).setOffset(5, 5)

    this.cursors = this.input.keyboard.createCursorKeys()
    this.jumpKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

    this.items = new Items(this)
    this.lastItemInterval = this.time.now
    this.nextItemInterval = Math.random() * 4000 + 1000

    const has = (k: string) => this.anims.exists(k)
    if (!has('guy-idle')) this.anims.create({ key: 'guy-idle', frames: this.anims.generateFrameNumbers('guy', { frames: [0,1,2,3] }), frameRate: 6, repeat: -1 })
    if (!has('guy-walk')) this.anims.create({ key: 'guy-walk', frames: this.anims.generateFrameNumbers('guy', { frames: [16,17,18,19,20,21,22,23] }), frameRate: 20, repeat: -1 })
    if (!has('guy-jump')) this.anims.create({ key: 'guy-jump', frames: this.anims.generateFrameNumbers('guy', { frames: [32,33] }), frameRate: 6, repeat: 0 })
    if (!has('guy-fall')) this.anims.create({ key: 'guy-fall', frames: this.anims.generateFrameNumbers('guy', { frames: [34,35] }), frameRate: 6, repeat: -1 })
    if (!has('guy-land')) this.anims.create({ key: 'guy-land', frames: this.anims.generateFrameNumbers('guy', { frames: [36,37,38,39] }), frameRate: 20, repeat: 0 })
    if (!has('guy-dead')) this.anims.create({ key: 'guy-dead', frames: this.anims.generateFrameNumbers('guy', { frames: [64,65,66,67,68,69,70] }), frameRate: 10, repeat: 0 })
    if (!has('explosion')) this.anims.create({ key: 'explosion', frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 11 }), frameRate: 24, repeat: 0 })

    this.explosions = this.add.group({ classType: Phaser.GameObjects.Sprite, runChildUpdate: false })

    this.physics.add.overlap(this.guy, this.box, this.moveBox as any, undefined, this)
    this.physics.add.overlap(this.items, this.guy, this.fellDown as any, undefined, this)
    this.physics.add.collider(this.items, this.box, this.fellDown as any, undefined, this)
    this.physics.add.collider(this.box, this.items, this.fellDown as any, undefined, this);

    this.scoreText = this.add.text(20, 20, 'Score: 0', { fontFamily: 'monospace', fontSize: '16px', color: '#ffffff' }).setDepth(1000)

    // Resume audio context on first user gesture
    if (this.sound.locked) {
      // On first user gesture, Phaser will unlock the audio context safely
      this.input.once('pointerdown', () => this.sound.unlock());
    }

    // in Level1.create()
    this.scale.on('resize', (size) => {
      // e.g., reposition score text
      this.scoreText.setPosition(20, 20)
    })
  }

  override update() {
    if (this.guyAlive) {
      this.guy.setVelocityX(0)
      this.boxTop = false
      this.jumping = !(this.guy.body as Phaser.Physics.Arcade.Body).blocked.down

      if (this.jumpKey.isDown && !this.jumping && this.time.now > this.jumpTimer) {
        this.guy.setVelocityY(-500)
        this.jumpTimer = this.time.now + 1200
        this.guy.anims.play('guy-jump', true)
      } else if (this.cursors.left?.isDown) {
        this.facingRight = false
        this.guy.setVelocityX(-200)
        if (!this.jumping) this.guy.anims.play('guy-walk', true)
        this.guy.setFlipX(true).setScale(2)
      } else if (this.cursors.right?.isDown) {
        this.facingRight = true
        this.guy.setVelocityX(200)
        if (!this.jumping) this.guy.anims.play('guy-walk', true)
        this.guy.setFlipX(false).setScale(2)
      } else if (this.jumping) {
        this.guy.anims.play('guy-fall', true)
      } else {
        this.guy.anims.play('guy-idle', true)
      }

      this.items.getChildren().forEach((child) => {
        const s = child as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
        if (!s || !s.body) return
        const body = s.body as Phaser.Physics.Arcade.Body
        if (body.blocked.down) s.disableBody(true, true)
      })

      this.updateNextItemInterval()
    } else {
      if (Phaser.Input.Keyboard.JustDown(this.jumpKey)) this.scene.start('Preload')
    }
  }

  private moveBox = (
    guy: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
    box: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
  ) => {
    box.setVelocityX(guy.body.velocity.x)
    guy.setVelocityX(this.facingRight ? -10 : 10)
  }

  private fellDown = (
    a: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
    b: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
  ) => {
    // Normalize which is which
    const hitBox = (a === this.box || b === this.box);
    const hitGuy = (a === this.guy || b === this.guy);

    // Figure out which one is the item sprite
    const item = (a !== this.box && a !== this.guy) ? a : b;

    // 1) ITEM ↔ BOX  => score++
    if (hitBox) {
      this.score++;
      this.scoreText.setText('Score: ' + this.score);

      // remove the item + little feedback
      item.disableBody(true, true);
      this.spawnExplosion(item.x, item.y);
      this.box.setVelocityY(-80);
      return;
    }

    // 2) ITEM ↔ GUY  => death sequence (once)
    if (hitGuy && this.guyAlive) {
      item.disableBody(true, true);

      this.guyAlive = false;
      this.guy.anims.stop();
      this.guy.play('guy-dead');

      const knockX = item.x < this.guy.x ? 120 : -120;
      this.guy.setVelocity(knockX, -180);

      this.cameras.main.flash(150, 255, 255, 255);
      return;
    }

    // Otherwise ignore
  };



  private spawnExplosion(x: number, y: number) {
    let boom = this.explosions.getFirstDead(false) as Phaser.GameObjects.Sprite | null
    if (!boom) {
      boom = this.add.sprite(x, y, 'explosion')
      this.explosions.add(boom)
    } else {
      boom.setPosition(x, y).setActive(true).setVisible(true)
    }
    boom.play('explosion')
    boom.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
      boom?.setActive(false).setVisible(false)
    })
  }

  private updateNextItemInterval() {
    if (this.time.now - this.lastItemInterval > this.nextItemInterval) {
      this.nextItemInterval = Math.random() * 2000 + 1000
      this.lastItemInterval = this.time.now
      this.items.spawn()
    }
  }
}