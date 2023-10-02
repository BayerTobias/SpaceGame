class ShieldBar extends StatusBar {
  y = 440;

  images = [
    "./img/interface/defence0.png",
    "./img/interface/defence20.png",
    "./img/interface/defence40.png",
    "./img/interface/defence60.png",
    "./img/interface/defence80.png",
    "./img/interface/defence100.png",
  ];

  constructor() {
    super();
    this.loadImage("./img/interface/defence0.png");
    this.loadImages(this.images);

    this.setLocalInterval(() => this.checkPercent(), 1000 / this.fps);
  }

  /**
   * Checks the shield percentage of the character in the world.
   */
  checkPercent() {
    if (this.world) this.setPercentage(this.world.level.character.shield);
  }
}
