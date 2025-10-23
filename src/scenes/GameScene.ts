import Phaser from 'phaser'

export default class GameScene extends Phaser.Scene {
  private logo!: Phaser.GameObjects.Image

  constructor() {
    super('Game')
  }

  create() {
    const { width, height } = this.scale
    this.logo = this.add.image(width / 2, height / 2, 'logo')
      .setInteractive({ useHandCursor: true })

    this.tweens.add({
      targets: this.logo,
      y: height / 2 - 20,
      duration: 900,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut'
    })

    this.input.on('pointerdown', () => {
      this.sound.play('ping')
      this.cameras.main.flash(150, 255, 255, 255)
    })
  }
}