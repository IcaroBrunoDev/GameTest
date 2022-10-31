export class Heroes {
  #heroLife = 100;
  #heroWidth = 230;
  #heroHeight = 230;

  constructor(scenarioWidth) {
    this.scenarioWidth = scenarioWidth;
    this.hero = document.querySelector(".hero");
  }

  get heroTotalLife() {
    return this.#heroLife;
  }

  get heroWidthAndHeight() {
    return { width: this.#heroWidth, height: this.#heroHeight };
  }

  moveFoward() {
    const heroeLastPos = this.hero.offsetLeft;

    console.log(heroeLastPos);

    return `${heroeLastPos + 20}px`;
  }

  attack() {}
}
