class EnemyProjectile extends MovableObject {
  speed = 5;
  width = 64;
  height = 64;
  offsetY = 25;
  shotFromX;
  hasCollided = false;
  animationFinished;
  otherDirection = true;

  projectileExpireImages = [
    "./img/projectiles/enemys/shot3_exp1.png",
    "./img/projectiles/enemys/shot3_exp2.png",
    "./img/projectiles/enemys/shot3_exp3.png",
    "./img/projectiles/enemys/shot3_exp4.png",
  ];

  constructor(object) {
    super();
    this.loadImage("./img/projectiles/enemys/shot3_asset.png");
    this.loadImages(this.projectileExpireImages);

    this.x = object.x - 15;
    this.y = object.y + 21;
    this.shotFromX = object.x;
    this.setLocalInterval(() => this.animate(), 1000 / this.fps);
  }
  /**
   * Manages animation and behavior of the object.
   */
  animate() {
    this.moveLeft();
    if (this.hasCollided) {
      this.animateImagesOnce(this.projectileExpireImages);
      if (this.deathAnmimationCurrentImage === this.projectileExpireImages.length - 1) {
        this.animationFinished = true;
        this.stopLocalIntervals();
      }
    }
  }
}
