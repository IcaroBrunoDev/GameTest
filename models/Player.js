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
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = 37;
    this.speedY = 0;
    this.speedX = 0;
    this.maxSpeed = 5;
    this.projectiles = [];
    this.image = document.getElementById("player");
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

    /** Handle Projectiles */

    this.projectiles.forEach((projectile) => {
      projectile.update();
    });

    this.projectiles = this.projectiles.filter(
      (projectile) => !projectile.markedForDeletion
    );

    /** Sprite Animation */

    if (this.frameX < this.maxFrame) {
      this.frameX += 1;
    } else {
      this.frameX = 0;
    }
  }

  /** @context Canva Context
   *
   *  This Method Render a New Rectangler in Canva
   */
  draw(context) {
    this.game.debug &&
      context.strokeRect(this.x, this.y, this.width, this.height);

    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );

    this.projectiles.forEach((projectile) => {
      projectile.draw(context);
    });
  }

  shootTop() {
    if (this.game.ammo > 0) {
      this.projectiles.push(new Projectile(this.game, this.x, this.y));
      this.game.ammo--;
    }
  }
}
