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

    /** Score */
    context.fillText("Score: " + this.game.score, 20, 40);

    /** Timer */

    context.fillText(
      "Time: " + (this.game.gameTime * 0.001).toFixed(2),
      20,
      100
    );
    /** Ammo */
    context.fillStyle = this.color;
    for (let i = 0; i < this.game.ammo; i++) {
      context.fillRect(20 + 5 * i, 50, 3, 20);
    }

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

    context.restore();
  }
}
