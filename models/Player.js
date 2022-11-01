import Projectile from "./Projectile.js";

/**
 *
 *  @width Is A Frame Width
 *  @height Is A  Frame Height
 *  @x Is A Horizontal Player Position In Pixels
 *  @y Is A Verical Player Position In Pixels
 *
 */

export default class Player {
  constructor(game) {
    this.game = game;
    this.width = 120;
    this.height = 190;
    this.x = 20;
    this.y = 100;
    this.speedY = 0;
    this.speedX = 0;
    this.maxSpeed = 5;
    this.projectiles = [];
  }

  update() {
    if (this.game.keys.includes("ArrowUp")) {
      this.speedY = -this.maxSpeed;
    } else if (this.game.keys.includes("ArrowDown")) {
      this.speedY = this.maxSpeed;
    } else if (this.game.keys.includes("ArrowRight")) {
      this.speedX = this.maxSpeed;
    } else if (this.game.keys.includes("ArrowLeft")) {
      this.speedX = -this.maxSpeed;
    } else {
      this.speedX = 0;
      this.speedY = 0;
    }

    this.y += this.speedY;
    this.x += this.speedX;

    // Handle Projectiles

    this.projectiles.forEach((projectile) => {
      projectile.update();
    });

    this.projectiles = this.projectiles.filter(
      (projectile) => !projectile.markedForDeletion
    );
  }

  /** @context Canva Context
   *
   *  This Method Render a New Rectangler in Canva
   */
  draw(context) {
    context.fillRect(this.x, this.y, this.width, this.height);

    this.projectiles.forEach((projectile) => {
      projectile.draw(context);
    });
  }

  shootTop() {
    if (this.game.ammo > 0) {
      this.projectiles.push(new Projectile(this.game, this.x * 2, this.y * 2));
      this.game.ammo--;
    }
  }
}
