class enemyExhaust extends MovableObject {
  height = 50;
  width = 50;
  enemyImagesExhaustAnimation = [
    "../el-pollo-loco/img/enemy-ships/Exhaust3/exhaust1.png",
    "../el-pollo-loco/img/enemy-ships/Exhaust3/exhaust2.png",
    "../el-pollo-loco/img/enemy-ships/Exhaust3/exhaust3.png",
    "../el-pollo-loco/img/enemy-ships/Exhaust3/exhaust4.png",
  ];
  currentImage = 0;

  world;
  otherDirection = true;

  constructor() {
    super();
    this.loadImage("../el-pollo-loco/img/enemy-ships/Exhaust3/exhaust1.png");
    this.loadImages(this.enemyImagesExhaustAnimation);
    this.setLocalInterval(() => this.animate(), 1000 / this.fps);
  }

  animate() {
    this.animateImages(this.enemyImagesExhaustAnimation);
  }
}
