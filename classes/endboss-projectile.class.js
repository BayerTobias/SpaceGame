class EndBossProjectile extends MovableObject {
  speed = 5;
  offsetX = 45;
  offsetY = 45;

  shotFromX;
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

  constructor() {
    super();
    this.loadImage(this.projectileImg);
    this.loadImages(this.explosionAnimationImages);
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.offsetX -= 4;
      this.offsetY -= 4;
      this.animateImagesOnce(this.explosionAnimationImages);
    }, 50);
  }
}
