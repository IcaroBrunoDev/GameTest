export default class VirtualPad {
  constructor() {
    this.shoot = document.getElementById("shoot");
    this.arrowUp = document.getElementById("arrowUp");
    this.arrowDown = document.getElementById("arrowDown");
    this.arrowLeft = document.getElementById("arrowLeft");
    this.arrowRight = document.getElementById("arrowRight");
  }

  shootTrigger() {
    this.shoot.ontouchstart = () => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: " " }));
    };

    this.shoot.ontouchend = () => {
      setTimeout(() => {
        window.dispatchEvent(new KeyboardEvent("keyup", { key: " " }));
      }, 100);
    };
  }

  arrowUpTrigger() {
    this.arrowUp.ontouchstart = () => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp" }));
    };

    this.arrowUp.ontouchend = () => {
      setTimeout(() => {
        window.dispatchEvent(new KeyboardEvent("keyup", { key: "ArrowUp" }));
      }, 100);
    };
  }

  arrowDownTrigger() {
    this.arrowDown.ontouchstart = () => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown" }));
    };

    this.arrowDown.ontouchend = () => {
      setTimeout(() => {
        window.dispatchEvent(new KeyboardEvent("keyup", { key: "ArrowDown" }));
      }, 100);
    };
  }

  arrowLeftTrigger() {
    this.arrowLeft.ontouchstart = () => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft" }));
    };

    this.arrowLeft.ontouchend = () => {
      setTimeout(() => {
        window.dispatchEvent(new KeyboardEvent("keyup", { key: "ArrowLeft" }));
      }, 100);
    };
  }

  arrowRightTrigger() {
    this.arrowRight.ontouchstart = () => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
    };

    this.arrowRight.ontouchend = () => {
      setTimeout(() => {
        window.dispatchEvent(new KeyboardEvent("keyup", { key: "ArrowRight" }));
      }, 100);
    };
  }
}
