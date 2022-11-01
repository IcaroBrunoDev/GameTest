export default class InputHandler {
  constructor(game) {
    this.game = game;

    window.addEventListener("keydown", (event) => {
      const { key } = event;

      if (
        (key === "ArrowUp" ||
          key === "ArrowDown" ||
          key === "ArrowRight" ||
          key === "ArrowLeft") &&
        this.game.keys.indexOf(key) === -1
      ) {
        this.game.keys.push(key);
      } else if (key === " ") {
        this.game.player.shootTop();
      }
    });

    window.addEventListener("keyup", (event) => {
      const { key } = event;

      const keyIndex = this.game.keys.indexOf(key);

      if (keyIndex > -1) {
        this.game.keys.splice(keyIndex, 1);
      }
    });
  }
}
