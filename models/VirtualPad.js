export default class VirtualPad {
  constructor() {
    this.shoot = document.getElementById("shoot");
    this.arrowUp = document.getElementById("arrowUp");
    this.arrowDown = document.getElementById("arrowDown");
    this.arrowLeft = document.getElementById("arrowLeft");
    this.arrowRight = document.getElementById("arrowRight");
  }

  shootTrigger() {
    this.shoot.onmousedown = () => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: " " }));
    };

    this.shoot.onmouseup = () => {
      setTimeout(() => {
        window.dispatchEvent(new KeyboardEvent("keyup", { key: " " }));
      }, 100);
    };
  }

  arrowUpTrigger() {
    this.arrowUp.onmousedown = () => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp" }));
    };

    this.arrowUp.onmouseup = () => {
      setTimeout(() => {
        window.dispatchEvent(new KeyboardEvent("keyup", { key: "ArrowUp" }));
      }, 100);
    };
  }

  arrowDownTrigger() {
    this.arrowDown.onmousedown = () => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown" }));
    };

    this.arrowDown.onmouseup = () => {
      setTimeout(() => {
        window.dispatchEvent(new KeyboardEvent("keyup", { key: "ArrowDown" }));
      }, 100);
    };
  }

  arrowLeftTrigger() {
    this.arrowLeft.onmousedown = () => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft" }));
    };

    this.arrowLeft.onmouseup = () => {
      setTimeout(() => {
        window.dispatchEvent(new KeyboardEvent("keyup", { key: "ArrowLeft" }));
      }, 100);
    };
  }

  arrowRightTrigger() {
    this.arrowRight.onmousedown = () => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
    };

    this.arrowRight.onmouseup = () => {
      setTimeout(() => {
        window.dispatchEvent(new KeyboardEvent("keyup", { key: "ArrowRight" }));
      }, 100);
    };
  }
}
