class EndBoss extends MovableObject {
  x = 300;
  height = 300;
  width = 300;

  otherDirection = true;

  constructor() {
    super().loadImage("../el-pollo-loco/img/endboss/Boss_ship7.png");
    this.offsetX = 45;
    this.offsetY = 90;
  }
}
