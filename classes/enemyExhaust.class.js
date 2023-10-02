class enemyExhaust extends MovableObject {
  height = 50;
  width = 50;
  enemyImagesExhaustAnimation = [
    "./img/enemy-ships/Exhaust3/exhaust1.png",
    "./img/enemy-ships/Exhaust3/exhaust2.png",
    "./img/enemy-ships/Exhaust3/exhaust3.png",
    "./img/enemy-ships/Exhaust3/exhaust4.png",
  ];
  currentImage = 0;

  world;
  otherDirection = true;

  constructor() {
    super();
    this.loadImage("./img/enemy-ships/Exhaust3/exhaust1.png");
    this.loadImages(this.enemyImagesExhaustAnimation);
    this.setLocalInterval(() => this.animate(), 1000 / this.fps);
  }

  /**
   * Manages animation of the entity using the exhaust animation images.
   */
  animate() {
    this.animateImages(this.enemyImagesExhaustAnimation);
  }
}
