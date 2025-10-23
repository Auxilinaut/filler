import Phaser from 'phaser'

export default class PreloadScene extends Phaser.Scene {
  constructor() { super('Preload') }

  preload() {
    this.load.atlasXML('items',
      'assets/items/genericItems_spritesheet_colored.png',
      'assets/items/genericItems_spritesheet_colored.xml'
    )
    this.load.spritesheet('guy',
      'assets/guy/sprite_base_addon.png',
      { frameWidth: 64, frameHeight: 64 }
    )
    this.load.image('box', 'assets/box.png')
    this.load.image('bg', 'assets/forest-background.png')
    this.load.spritesheet('explosion',
      'assets/explosion.png',
      { frameWidth: 96, frameHeight: 96, endFrame: 11 }
    )

    const { width, height } = this.scale
    const barBg = this.add.rectangle(width/2, height/2, width*0.6, 16, 0x333344)
    const bar = this.add.rectangle(barBg.x - barBg.width/2, barBg.y, 4, 12, 0x88ccff).setOrigin(0,0.5)
    this.load.on('progress', (p: number) => { (bar as any).width = Math.max(4, barBg.width * p) })
  }

  create() {
    this.scene.start('Level1')
  }
}