/*
State for 
Original by Craig A. Hancock
Licensed under the Apache License, Version 2.0
*/

export class Boot extends Phaser.State {
  public preload(): void {

  }

  public create(): void {
    this.game.state.start("Preload");
  }
}
