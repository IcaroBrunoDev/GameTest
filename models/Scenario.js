class Scenario {
  #width;

  constructor() {
    this.#width = document.getElementsByTagName("body")[0].offsetWidth;
  }

  get scenarioWidth() {
    return this.#width;
  }
}
