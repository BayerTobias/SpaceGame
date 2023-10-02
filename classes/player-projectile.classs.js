class PlayerProjectile extends MovableObject {
  projectileExpireImages = [
    "./img/projectiles/player/fire_exp1.png",
    "./img/projectiles/player/fire_exp2.png",
    "./img/projectiles/player/fire_exp3.png",
    "./img/projectiles/player/fire_exp4.png",
    "./img/projectiles/player/fire_exp5.png",
  ];
  speed = 10;
  width = 64;
  height = 64;
  offsetY = 25;
  shotFromX;
  hasCollided = false;
  animationFinished;

  constructor(object) {
    super();
    this.loadImage("./img/projectiles/player/fire_asset.png");
    this.loadImages(this.projectileExpireImages);

    this.x = object.x + object.width - 10;
    this.y = object.y + object.offsetY;
    this.shotFromX = object.x;
    this.setLocalInterval(() => this.animate(), 1000 / this.fps);
  }

  /**
   * Animates the object's movement and handles collision animation.
   */
  animate() {
    this.moveRight();
    if (this.hasCollided) {
      this.animateImagesOnce(this.projectileExpireImages);
      if (this.deathAnmimationCurrentImage === this.projectileExpireImages.length - 1) {
        this.animationFinished = true;
        this.stopLocalIntervals();
      }
    }
  }
}
