import Game from "./models/Game.js";

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");

  const width = (canvas.width = this.window.screen.width);
  const height = (canvas.height = 500);


  const game = new Game(width, height);

  let lastTime = 0;

  /** AnimationLoop
   *
   *  That Function Will Call The Game Update
   *  And The Game Drawn and requestAnimationFrame
   *  To Create a Player Box Animated Frame at Frame
   *
   *  ClearRect is used to prevent a lot of box rendering
   *  in screen, that method remove other boxes at X: 0, Y:0 (Draw Start Pos)
   *
   */

  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    ctx.clearRect(0, 0, width, height);

    game.update(deltaTime);
    game.draw(ctx);
    requestAnimationFrame(animate);
  }

  animate(0);
});
