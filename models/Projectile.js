/**
 *
 *  A Class to Create a Projectiles,
 *  received a game Context (canva reference),
 *  a X player position and a y game position and Drawn
 *  a Projectile
 */

export default class Projectile {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 10;
    this.heght = 3;
    this.speed = 3;
    this.markedForDeletion = false;
  }

  update() {
    this.x += this.speed;

    // Limited Range of Lasers
    if (this.x > this.game.width * 0.8) {
      this.markedForDeletion = true;
    }
  }

  draw(context) {
    context.fillStyle = "black";
    context.fillRect(this.x, this.y, this.width, this.heght);
  }
}
