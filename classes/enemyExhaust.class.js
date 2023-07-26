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
  exhaustNumber;
  world;
  otherDirection = true;

  constructor(exhaustNumber) {
    super().loadImage("../el-pollo-loco/img/enemy-ships/Exhaust3/exhaust1.png");
    this.exhaustNumber = exhaustNumber;
    this.loadImages(this.enemyImagesExhaustAnimation);
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.world) {
        this.animateImages(this.enemyImagesExhaustAnimation);
        this.positionExhaust();
      }
    }, 1000 / this.fps);
  }

  positionExhaust() {
    const enemy = this.world.level.enemies[this.exhaustNumber];
    this.x = enemy.x + 72; // todo nicht fixed sonder mit img größe positionieren
    this.y = enemy.y + 25; // todo nicht fixed sonder mit img größe positionieren
  }
}
