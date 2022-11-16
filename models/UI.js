export default class UI {
  constructor(game) {
    this.game = game;
    this.fontSize = 25;
    this.fontFamily = "Helvetica";
    this.color = "white";
  }

  draw(context) {
    context.save();
    context.fillStyle = this.color;
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowColor = "black";
    context.font = this.fontSize + "px" + this.fontFamily;

    /** Timer */
    context.fillText(
      "Time: " + (this.game.gameTime * 0.001).toFixed(2),
      20,
      100
    );

    /** Score */
    context.fillText("Score: " + this.game.score, 20, 40);

    /** Game Over Messages */
    if (this.game.gameOver) {
      context.textAlign = "center";
      const message = {};

      if (this.game.score >= this.game.winningScore) {
        message.title = "You Won";
        message.subTitle = "Well Done!";
      } else {
        message.title = "You Lose!";
        message.subTitle = "Try again Next Time!";
      }

      context.font = "50px" + this.fontFamily;
      context.fillText(
        message.title,
        this.game.width * 0.5,
        this.game.height * 0.5
      );

      context.font = "25px" + this.fontFamily;
      context.fillText(
        message.subTitle,
        this.game.width * 0.5,
        this.game.height * 0.5 + 40
      );
    }

    /** Ammo */

    const color = this.game.player.powerUp ? "#ffffbd" : this.color;

    context.fillStyle = color;
    for (let i = 0; i < this.game.ammo; i++) {
      context.fillRect(20 + 5 * i, 50, 3, 20);
    }

    context.restore();
  }
}

export class Explosion {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.frameX = 0;
    this.spriteHeight = 200;
    this.fps = 30;
    this.timer = 0;
    this.maxFrame = 8;
    this.interval = 1000 / this.fps;
    this.markedForDeletion = false;
  }

  update(deltaTime) {
    this.x -= this.game.speed;

    if (this.timer > this.interval) {
      this.frameX++;
      this.timer = 0;
    } else {
      this.timer += deltaTime;
    }

    if (this.frameX > this.maxFrame) this.markedForDeletion = true;
  }

  draw(context) {
    context.drawImage(
      this.image,
      this.frameX * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

export class SmokeExplosion extends Explosion {
  constructor(game, x, y) {
    super(game);
    this.spriteWidth = 200;

    this.width = this.spriteWidth;
    this.height = this.spriteHeight;

    this.x = x - this.width * 0.5;
    this.y = y - this.height * 0.5;

    this.image = document.getElementById("smoke");
  }
}

export class FireExplosion extends Explosion {
  constructor(game) {
    super(game);

    this.image = document.getElementById("fire");
  }
}
