/*
Preload sprites
Original by Craig A. Hancock
Licensed under the Apache License, Version 2.0
*/

export class Preload extends Phaser.State {
  public preload(): void {
    this.load.atlasXML('items','assets/items/genericItems_spritesheet_colored.png', 'assets/items/genericItems_spritesheet_colored.xml');
    this.load.spritesheet('guy','assets/guy/sprite_base_addon.png',64,64,-1,-10);
    this.load.image('box','assets/box.png');
    this.load.image('bg','assets/forest-background.png');
}

  public create(): void {
    this.game.state.start("Level1");
  }
}
