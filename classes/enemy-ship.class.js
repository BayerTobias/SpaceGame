class EnemyShip extends MovableObject {
  x = 200 + Math.random() * 500;
  y = 50 + Math.random() * 250;
  constructor() {
    super().loadImage("../el-pollo-loco/img/enemy-ships/Ship3.png");

    this.animate();
  }

  animate() {
    setInterval(() => {
      this.x -= 0.25 + Math.random() * 0.25;
    }, 1000 / 60);
  }
}
