import Background from "./Background.js";
import { Angler1, Angler2, Drone, HiveWhale, LuckyFish } from "./Enemy.js";
import InputHandler from "./InputHandler.js";
import Particles from "./Particles.js";
import Player from "./Player.js";
import UI, { SmokeExplosion } from "./UI.js";

export default class Game {
  constructor(width, height, isMobile) {
    this.width = width;
    this.height = height;
    this.isMobile = isMobile;

    this.speed = 1;
    this.score = 0;
    this.winningScore = 100;
    this.gameTime = 0;
    this.timeLimit = 50000;
    this.gameOver = false;
    this.debug = false;

    this.keys = [];
    this.enemies = [];
    this.particles = [];
    this.explosions = [];

    this.enemyTimer = 0;
    this.enemyInterval = 1000;

    this.ammo = 0;
    this.maxAmmo = 10;
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

    this.player.update(deltaTime);
    this.background.update();
    this.background.layer4.update();

    if (this.ammoTimer > this.ammoInterval) {
      if (this.ammo < this.maxAmmo) this.ammo += 1;
      this.ammoTimer = 0;
    } else {
      this.ammoTimer += deltaTime;
    }

    this.particles.forEach((particle) => particle.update());
    this.particles = this.particles.filter(
      (particle) => !particle.markedForDeletion
    );

    this.explosions.forEach((explosion) => explosion.update(deltaTime));
    this.explosions = this.explosions.filter(
      (explosion) => !explosion.markedForDeletion
    );

    this.enemies.forEach((enemy) => {
      enemy.update();

      if (this.checkCollision(this.player, enemy)) {
        enemy.markedForDeletion = true;

        if (enemy.type === "lucky") this.player.enterPowerUp();
        else if (!this.gameOver) {
          this.score--;
          // this.gameOver = true;
        }
      }

      this.player.projectiles.forEach((projectile) => {
        if (this.checkCollision(projectile, enemy)) {

          const projectileDamage = this.player.powerUp ? 3 : 1;

          enemy.lives = enemy.lives - projectileDamage;

          projectile.markedForDeletion = true;

          this.particles.push(
            new Particles(
              this,
              enemy.x + enemy.width * 0.5,
              enemy.y + enemy.height * 0.5
            )
          );

          if (enemy.lives <= 0) {
            enemy.markedForDeletion = true;

            /** Particles and Explosion effects dont will be work in mobile (Perfomance Issues) */
            if (!this.isMobile) {
              for (let i = 0; i < enemy.score; i++) {
                this.particles.push(
                  new Particles(
                    this,
                    enemy.x + enemy.width * 0.5,
                    enemy.y + enemy.height * 0.5
                  )
                );
              }

              this.addExplosion(enemy);
            }

            if (enemy.type === "hive") {
              for (let i = 0; i < 5; i++) {
                this.enemies.push(
                  new Drone(
                    this,
                    enemy.x + Math.random() * enemy.width,
                    enemy.y + Math.random() * enemy.height * 0.5
                  )
                );
              }
            }

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
    this.ui.draw(context);
    this.player.draw(context);
    this.particles.forEach((particle) => particle.draw(context));
    this.enemies.forEach((enemy) => {
      enemy.draw(context);
    });
    this.explosions.forEach((explosion) => explosion.draw(context));
    this.background.layer4.draw(context);
  }

  addEnemy() {
    const randomize = Math.random();

    if (randomize < 0.1) {
      this.enemies.push(new Angler1(this));
    } else if (randomize < 0.6) {
      this.enemies.push(new Angler2(this));
    } else if (randomize < 0.8) {
      this.enemies.push(new HiveWhale(this));
    } else this.enemies.push(new LuckyFish(this));
  }

  addExplosion(enemy) {
    // const randomize = Math.random();
    this.explosions.push(new SmokeExplosion(this, enemy.x, enemy.y));
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
