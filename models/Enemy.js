export default class Enemy {
  constructor(game) {
    this.game = game;

    this.x = this.game.width;
    this.y = Math.random() * (this.game.height * 0.955 - this.height);

    this.speedX = Math.random() * -1.5 - 0.5;
    this.markedForDeletion = false;

    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = 37;
  }

  update() {
    this.x += this.speedX - this.game.speed;

    if (this.x + this.width < 0) this.markedForDeletion = true;

    /** Sprite Animation */
    if (this.frameX < this.maxFrame) {
      this.frameX += 1;
    } else {
      this.frameX = 0;
    }
  }

  draw(context) {
    if (this.game.debug) {
      context.strokeRect(this.x, this.y, this.width, this.height);
      context.fillStyle = "black";
      context.font = "20px Helvetica";
      context.fillText(this.lives, this.x, this.y);
    }

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
  }
}

export class Angler1 extends Enemy {
  constructor(game) {
    super(game);

    this.lives = 5;
    this.score = this.lives;
    this.width = 228;
    this.height = 169;
    this.y = Math.random() * (this.game.height * 0.95 - this.height);

    this.frameY = Math.floor(Math.random() * 3);

    this.image = document.getElementById("angler1");
  }
}

export class Angler2 extends Enemy {
  constructor(game) {
    super(game);

    this.lives = 10;
    this.score = this.lives;
    this.width = 213;
    this.height = 165;
    this.y = Math.random() * (this.game.height * 0.95 - this.height);

    this.frameY = Math.floor(Math.random() * 2);

    this.image = document.getElementById("angler2");
  }
}

export class LuckyFish extends Enemy {
  constructor(game) {
    super(game);

    this.lives = 3;
    this.score = this.lives;
    this.width = 99;
    this.height = 95;
    this.y = Math.random() * (this.game.height * 0.95 - this.height);
    this.type = "lucky";
    this.frameY = Math.floor(Math.random() * 2);

    this.image = document.getElementById("lucky");
  }
}

export class HiveWhale extends Enemy {
  constructor(game) {
    super(game);

    this.width = 400;
    this.height = 227;
    this.frameY = 0;
    this.speedX = Math.random() * -1.2 - 0.2;
    this.y = Math.random() * (this.game.height * 0.95 - this.height);

    this.type = "hive";
    this.lives = 15;
    this.score = this.lives;

    this.image = document.getElementById("whale");
  }
}


export class Drone extends Enemy {
  constructor(game, x, y) {
    super(game);

    this.x = x;
    this.y = y;
    this.width = 115;
    this.height = 95;
    this.frameY = Math.floor(Math.random() * 2);
    this.speedX = Math.random() * -4.2 - 0.5;

    this.type = "drone";
    this.lives = 2;
    this.score = this.lives;

    this.image = document.getElementById("drone");
  }
}