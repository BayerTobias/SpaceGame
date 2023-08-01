class EnemyProjectile extends MovableObject {
  speed = 5;
  width = 64;
  height = 64;
  offsetY = 25;
  shotFromX;
  hasCollided = false;
  otherDirection = true;

  projectileExpireImages = [
    "../el-pollo-loco/img/projectiles/enemys/shot3_exp1.png",
    "../el-pollo-loco/img/projectiles/enemys/shot3_exp2.png",
    "../el-pollo-loco/img/projectiles/enemys/shot3_exp3.png",
    "../el-pollo-loco/img/projectiles/enemys/shot3_exp4.png",
  ];

  constructor(object) {
    super();
    this.loadImage("../el-pollo-loco/img/projectiles/enemys/shot3_asset.png");
    this.loadImages(this.projectileExpireImages);

    this.x = object.x - 32;
    this.y = object.y + 21;
    this.shotFromX = object.x;

    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
      if (this.hasCollided) {
        this.animateImages(this.projectileExpireImages);
      }
    }, 1000 / 60);
  }
}
