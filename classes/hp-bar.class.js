class HpBar extends StatusBar {
  y = 420;

  images = [
    "./img/interface/hit_points0.png",
    "./img/interface/hit_points20.png",
    "./img/interface/hit_points40.png",
    "./img/interface/hit_points60.png",
    "./img/interface/hit_points80.png",
    "./img/interface/hit_points100.png",
  ];

  constructor() {
    super();
    this.loadImage("./img/interface/hit_points100.png");
    this.loadImages(this.images);
    this.setLocalInterval(() => this.checkPercent(), 1000 / this.fps);
  }

  /**
   * Checks the percentage of the character's HP and updates the object's state accordingly.
   */
  checkPercent() {
    if (this.world) {
      this.setPercentage(this.world.level.character.HP);
    }
  }
}
