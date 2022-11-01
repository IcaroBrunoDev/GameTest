import InputHandler from "./InputHandler.js";
import Player from "./Player.js";

export default class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.keys = [];
    this.ammo = 5;

    this.player = new Player(this);
    this.input = new InputHandler(this);
  }

  update() {
    this.player.update();
  }

  draw(context) {
    this.player.draw(context);
  }
}
