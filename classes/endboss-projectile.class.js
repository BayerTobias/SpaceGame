class EndBossProjectile extends MovableObject {
  speed = 7;
  offsetX = 45;
  offsetY = 45;

  shotFromX;
  detonateAfter = 150 + Math.random() * 300;
  hasCollided = false;
  animationStarted = false;
  animationFinished = false;
  otherDirection = true;
  explosionSoundPlayed;

  projectileImg = "./img/projectiles/endboss/Shot1_asset.png";

  explosionAnimationImages = [
    "./img/projectiles/endboss/Shot1_exp1.png",
    "./img/projectiles/endboss/Shot1_exp2.png",
    "./img/projectiles/endboss/Shot1_exp3.png",
    "./img/projectiles/endboss/Shot1_exp4.png",
    "./img/projectiles/endboss/Shot1_exp5.png",
    "./img/projectiles/endboss/Shot1_exp6.png",
    "./img/projectiles/endboss/Shot1_exp7.png",
    "./img/projectiles/endboss/Shot1_exp8.png",
    "./img/projectiles/endboss/Shot1_exp9.png",
    "./img/projectiles/endboss/Shot1_exp10.png",
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

  /**
   * animates the projectile
   */
  animate() {
    this.moveLeft();
    if (this.timeToExplode() && !this.animationStarted) {
      this.setLocalInterval(() => this.detonateShot(), 1000 / this.fps);
      this.animationStarted = true;
      this.speed = 0;
    }
  }

  /**
   * initiates the detonation of a shot, triggering explosion animations and related actions.
   */
  detonateShot() {
    this.playLaserExplosionSound();
    if (this.deathAnmimationCurrentImage < this.explosionAnimationImages.length) {
      this.extendExplosion();
      this.animateImagesOnce(this.explosionAnimationImages);
    }
    if (this.deathAnmimationCurrentImage === this.explosionAnimationImages.length - 1) {
      this.animationFinished = true;
    }
    if (this.animationFinished) {
      this.stopLocalIntervals();
    }
  }

  /**
   * checks if it is time for the shot to explode based on its position and detonation conditions.
   *
   * @returns {boolean} returns true if it is time to explode, otherwise false.
   */
  timeToExplode() {
    return this.x < this.shotFromX - 50 - this.detonateAfter;
  }

  /**
   * Adjusts the explosion by extending its dimensions.
   */
  extendExplosion() {
    this.offsetX -= 4;
    this.offsetY -= 4;
  }

  /**
   * Plays the laser explosion sound if it has not been played before.
   */
  playLaserExplosionSound() {
    if (!this.explosionSoundPlayed) {
      let clonedSound = endBossLaserExplosionSound.cloneNode();
      clonedSound.volume = endBossLaserExplosionSound.volume;
      clonedSound.muted = endBossLaserExplosionSound.muted;
      clonedSound.play();
      this.explosionSoundPlayed = true;
    }
  }
}
