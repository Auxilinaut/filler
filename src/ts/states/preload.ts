/*
Preload sprites
Original by Craig A. Hancock
Licensed under the Apache License, Version 2.0
*/

export class Preload extends Phaser.State {
  public preload(): void {
    let items = this.game.load.atlasXML('items','assets/items/genericItems_spritesheet_colored.png', 'assets/items/genericItems_spritesheet_colored.xml');
    let guy = this.game.load.spritesheet('guy','assets/guy/sprite_base_addon.png',64,64);
}

  public create(): void {
    
  }
}