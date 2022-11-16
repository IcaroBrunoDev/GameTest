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
    this.width = 20;
    this.height = 20;
    this.speed = 3;
    this.markedForDeletion = false;
    this.image = document.getElementById("projectile");
  }

  update() {
    this.x += this.speed;
    // Limited Range of Lasers
    if (this.x > this.game.width * 0.8) {
      this.markedForDeletion = true;
    }
  }

  draw(context) {
    context.drawImage(this.image, this.x + 100, this.y + 22, this.width, this.height);
  }
}
