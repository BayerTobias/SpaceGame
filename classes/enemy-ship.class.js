class EnemyShip extends MovableObject {
  x = 200 + Math.random() * 500;
  y = 50 + Math.random() * 250;
  HP = 40;
  exhaust = new enemyExhaust();
  ID;
  otherDirection = true;

  deathAnimation = [
    "../el-pollo-loco/img/enemy-ships/Ship3_Explosion/Ship3_Explosion_000.png",
    "../el-pollo-loco/img/enemy-ships/Ship3_Explosion/Ship3_Explosion_004.png",
    "../el-pollo-loco/img/enemy-ships/Ship3_Explosion/Ship3_Explosion_005.png",
    "../el-pollo-loco/img/enemy-ships/Ship3_Explosion/Ship3_Explosion_007.png",
    "../el-pollo-loco/img/enemy-ships/Ship3_Explosion/Ship3_Explosion_009.png",
    "../el-pollo-loco/img/enemy-ships/Ship3_Explosion/Ship3_Explosion_012.png",
    "../el-pollo-loco/img/enemy-ships/Ship3_Explosion/Ship3_Explosion_013.png",
    "../el-pollo-loco/img/enemy-ships/Ship3_Explosion/Ship3_Explosion_015.png",
    "../el-pollo-loco/img/enemy-ships/Ship3_Explosion/Ship3_Explosion_018.png",
    "../el-pollo-loco/img/enemy-ships/Ship3_Explosion/Ship3_Explosion_019.png",
    "../el-pollo-loco/img/enemy-ships/Ship3_Explosion/Ship3_Explosion_021.png",
  ];

  constructor() {
    super().loadImage("../el-pollo-loco/img/enemy-ships/Ship3.png");
    this.offsetY = 30;
    this.offsetX = 15;
    this.loadImages(this.deathAnimation);
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
      this.exhaust.x = this.x + 72;
      this.exhaust.y = this.y + 25;
      if (this.isDead()) {
        this.animateImagesOnce(this.deathAnimation);
      }
    }, 1000 / this.fps);
  }
}
