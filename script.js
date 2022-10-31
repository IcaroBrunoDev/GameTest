class Heroes {
  #heroLife = 100;
  #heroWidth = 230;
  #heroHeight = 230;

  constructor(scenarioWidth) {
    this.scenarioWidth = scenarioWidth - this.#heroWidth;
    this.heroElement = document.querySelector(".hero");

    this.#setStoppedHeroAnimation();
  }

  get heroTotalLife() {
    return this.#heroLife;
  }

  get heroWidthAndHeight() {
    return { width: this.#heroWidth, height: this.#heroHeight };
  }

  #setStoppedHeroAnimation() {
    const imageHero = document.createElement("img");

    imageHero.src = "./assets/heros/Titania/Titania-Stopped.gif";
    imageHero.className = "hero stopped";

    this.heroElement.appendChild(imageHero);
  }

  #setAttackHeroAnimation() {
    const imageHero = document.createElement("img");

    imageHero.src = "./assets/heros/Titania/TitaniaFullGif.gif";
    imageHero.className = "hero stopped";

    this.heroElement.appendChild(imageHero);
  }

  moveBackWard() {
    const heroeLastPos = this.heroElement.offsetLeft;

    if (heroeLastPos > 0) {
      this.heroElement.style.left = `${heroeLastPos - 20}px`;
    } else {
      this.heroElement.style.left = `${heroeLastPos + 10}px`;
    }
  }

  moveFoward() {
    const heroeLastPos = this.heroElement.offsetLeft;

    if (heroeLastPos <= this.scenarioWidth) {
      this.heroElement.style.left = `${heroeLastPos + 20}px`;
    } else {
      this.heroElement.style.left = `${heroeLastPos - 10}px`;
    }
  }

  jump() {
    this.heroElement.classList.add("jump");

    setTimeout(() => {
      this.heroElement.classList.remove("jump");
    }, 500);
  }

  attack() {
    const imageHero = document.createElement("img");

    imageHero.src = "./assets/heros/Titania/TitaniaFullGif.gif";
    imageHero.className = "hero attack";

    this.heroElement.appendChild(imageHero);
  }
}

window.onload = function () {
  const screenWidth = document.getElementsByTagName("body")[0];

  const heroes = new Heroes(screenWidth.offsetWidth);

  document.onkeydown = function (event) {
    const { keyCode } = event;

    console.log(keyCode);

    switch (keyCode) {
      case 13:
        heroes.attack();
        break;

      case 32:
        heroes.jump();
        break;

      case 37:
        heroes.moveBackWard();
        break;

      case 39:
        heroes.moveFoward();
        break;

      default:
        return;
    }
  };
};
