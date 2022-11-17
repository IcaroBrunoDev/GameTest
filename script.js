import Game from "./models/Game.js";
import VirtualPad from "./models/VirtualPad.js";

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");

  let isMobile = window.matchMedia("(max-width: 1024px)").matches;

  if (isMobile) {
    const virtualPad = new VirtualPad();

    virtualPad.shootTrigger();
    virtualPad.arrowUpTrigger();
    virtualPad.arrowDownTrigger();
    virtualPad.arrowLeftTrigger();
    virtualPad.arrowRightTrigger();

    // screen.orientation.lock("landscape");
  }

  const width = (canvas.width =
    window.screen.width > 800 ? this.window.screen.width : 800);
  const height = (canvas.height = 500);

  const game = new Game(width, height, isMobile);

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

    game.draw(ctx);
    game.update(deltaTime);
    requestAnimationFrame(animate);
  }

  animate(0);
});
