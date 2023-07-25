class EnemyShip extends MovableObject {
  x = 200 + Math.random() * 500;
  y = 50 + Math.random() * 250;
  constructor() {
    super().loadImage("../el-pollo-loco/img/enemy-ships/Ship3.png");

    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / this.fps);
  }
}
