class EndBoss extends MovableObject {
  x = 1500;
  height = 300;
  width = 300;

  otherDirection = true;

  constructor() {
    super().loadImage("../el-pollo-loco/img/endboss/Boss_ship7.png");
  }
}
