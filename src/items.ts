import Phaser from 'phaser'

export default class Items extends Phaser.Physics.Arcade.Group {
  private MAX_ITEMS = 160
  private num = 0
  private frameNames: string[] = []

  constructor(scene: Phaser.Scene) {
    super(scene.physics.world, scene)
    scene.add.existing(this)
    this.classType = Phaser.Physics.Arcade.Sprite

    // Collect frame names from the XML atlas
    const tx = scene.textures.get('items')
    this.frameNames = tx.getFrameNames() // e.g. ["genericItem_color_001.png", ...]
    if (this.frameNames.length === 0) {
      console.warn('[Items] No frames found in atlas "items"')
    }

    this.spawn()
  }

  public spawn() {
    if (this.frameNames.length === 0) return

    if (this.num <= this.MAX_ITEMS - 1) {
      const worldW =
        this.scene.physics.world.bounds.width || this.scene.scale.width
      const x = Math.random() * Math.max(1, worldW - 1)
      const y = 0

      const frame = this.frameNames[this.num % this.frameNames.length]

      const s = this.create(
        x,
        y,
        'items',
        frame
      ) as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody

      s.setActive(true).setVisible(true)
      s.setScale(0.5)
      s.setGravityY(1000)
      s.setMaxVelocity(999, 500)
      s.setBounce(0.6)
      s.setCollideWorldBounds(true)
      s.setOrigin(0.5)

      const vx =
        (Math.random() * 100 + 10) * (Math.random() < 0.5 ? 1 : -1)
      s.setVelocityX(vx)
      const av = 100 * (Math.random() < 0.5 ? 1 : -1)
      s.setAngularVelocity(av)

      this.num++
    } else {
      this.num = 0
      this.clear(true, true)
      this.spawn()
    }
  }
}
