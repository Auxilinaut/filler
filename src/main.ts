import Phaser from 'phaser'
import BootScene from './scenes/BootScene'
import PreloadScene from './scenes/PreloadScene'
import Level1 from './scenes/Level1'

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#101018',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 450
  },
  physics: {
    default: 'arcade',
    arcade: { gravity: {
      x: 0,
      y: 0
    }, debug: false
    }
  },
  scene: [BootScene, PreloadScene, Level1]
}

window.addEventListener('touchmove', (e) => { if ((e as any).scale !== 1) e.preventDefault() }, { passive: false })

export default new Phaser.Game(config)