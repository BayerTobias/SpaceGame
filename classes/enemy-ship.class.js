class EnemyShip extends MovableObject {
  constructor() {
    super().loadImage("../el-pollo-loco/img/enemy-ships/Ship3.png");
    this.x = 200 + Math.random() * 500;
  }
}
