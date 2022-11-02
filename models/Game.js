import Background from "./Background.js";
import { Angler1 } from "./Enemy.js";
import InputHandler from "./InputHandler.js";
import Player from "./Player.js";
import UI from "./UI.js";

export default class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.speed = 1;
    this.score = 0;
    this.winningScore = 10;
    this.gameTime = 0;
    this.timeLimit = 15000;
    this.gameOver = false;
    this.debug = true;

    this.keys = [];
    this.enemies = [];

    this.enemyTimer = 0;
    this.enemyInterval = 1000;

    this.ammo = 20;
    this.maxAmmo = 50;
    this.ammoTimer = 0;
    this.ammoInterval = 500;

    this.ui = new UI(this);
    this.player = new Player(this);
    this.input = new InputHandler(this);
    this.background = new Background(this);
  }

  update(deltaTime) {
    if (!this.gameOver) this.gameTime += deltaTime;

    if (this.gameTime > this.timeLimit) this.gameOver = true;

    this.player.update();
    this.background.update();
    this.background.layer4.update();

    if (this.ammoTimer > this.ammoInterval) {
      if (this.ammo < this.maxAmmo) this.ammo++;
      this.ammoTimer = 0;
    } else {
      this.ammoTimer += deltaTime;
    }

    this.enemies.forEach((enemy) => {
      enemy.update();

      if (this.checkCollision(this.player, enemy)) {
        enemy.markedForDeletion = true;
      }

      this.player.projectiles.forEach((projectile) => {
        if (this.checkCollision(projectile, enemy)) {
          enemy.lives--;
          projectile.markedForDeletion = true;
          if (enemy.lives <= 0) {
            enemy.markedForDeletion = true;
            if (!this.gameOver) this.score += enemy.score;
            if (this.score >= this.winningScore) this.gameOver = true;
          }
        }
      });
    });

    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);

    if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
      this.addEnemy();
      this.enemyTimer = 0;
    } else {
      this.enemyTimer += deltaTime;
    }
  }

  draw(context) {
    this.background.draw(context);
    this.player.draw(context);
    this.ui.draw(context);
    this.enemies.forEach((enemy) => {
      enemy.draw(context);
    });
    this.background.layer4.draw(context);
  }

  addEnemy() {
    this.enemies.push(new Angler1(this));
  }

  checkCollision(rect1, rect2) {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.height + rect1.y > rect2.y
    );
  }
}
