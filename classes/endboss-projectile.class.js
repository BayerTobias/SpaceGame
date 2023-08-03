class EndBossProjectile extends MovableObject {
  speed = 7;
  offsetX = 45;
  offsetY = 45;

  shotFromX;
  detonateAfter = Math.random() * 450;
  hasCollided = false;
  otherDirection = true;

  projectileImg = "../el-pollo-loco/img/projectiles/endboss/Shot1_asset.png";

  explosionAnimationImages = [
    "../el-pollo-loco/img/projectiles/endboss/Shot1_exp1.png",
    "../el-pollo-loco/img/projectiles/endboss/Shot1_exp2.png",
    "../el-pollo-loco/img/projectiles/endboss/Shot1_exp3.png",
    "../el-pollo-loco/img/projectiles/endboss/Shot1_exp4.png",
    "../el-pollo-loco/img/projectiles/endboss/Shot1_exp5.png",
    "../el-pollo-loco/img/projectiles/endboss/Shot1_exp6.png",
    "../el-pollo-loco/img/projectiles/endboss/Shot1_exp7.png",
    "../el-pollo-loco/img/projectiles/endboss/Shot1_exp8.png",
    "../el-pollo-loco/img/projectiles/endboss/Shot1_exp9.png",
    "../el-pollo-loco/img/projectiles/endboss/Shot1_exp10.png",
  ];

  constructor(x, y) {
    super();
    this.x = x;
    this.shotFromX = x;
    this.y = y + 115;

    this.loadImage(this.projectileImg);
    this.loadImages(this.explosionAnimationImages);

    this.setLocalInterval(() => this.animate(), 1000 / this.fps);
  }

  animate() {
    this.moveLeft();
    if (this.timeToExplode()) {
      this.setLocalInterval(() => this.detonateShot(), 1000 / this.fps);
      this.speed = 0;
    }
  }

  detonateShot() {
    if (
      this.deathAnmimationCurrentImage < this.explosionAnimationImages.length
    ) {
      this.extendExplosion();
      this.animateImagesOnce(this.explosionAnimationImages);
    } else {
      this.hasCollided = true;
      this.stopLocalIntervals();
    }
  }

  timeToExplode() {
    return this.x < this.shotFromX - 50 - this.detonateAfter;
  }

  extendExplosion() {
    this.offsetX -= 4;
    this.offsetY -= 4;
  }
}
