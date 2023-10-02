class EnemyShip extends MovableObject {
  x;
  y = 50 + Math.random() * 250;
  HP = 40;
  exhaust = new enemyExhaust();
  ID;
  otherDirection = true;
  deathSoundPlayed;

  immuneTime = 100;

  deathAnimation = [
    "./img/enemy-ships/Ship3_Explosion/Ship3_Explosion_000.png",
    "./img/enemy-ships/Ship3_Explosion/Ship3_Explosion_004.png",
    "./img/enemy-ships/Ship3_Explosion/Ship3_Explosion_005.png",
    "./img/enemy-ships/Ship3_Explosion/Ship3_Explosion_007.png",
    "./img/enemy-ships/Ship3_Explosion/Ship3_Explosion_009.png",
    "./img/enemy-ships/Ship3_Explosion/Ship3_Explosion_012.png",
    "./img/enemy-ships/Ship3_Explosion/Ship3_Explosion_013.png",
    "./img/enemy-ships/Ship3_Explosion/Ship3_Explosion_015.png",
    "./img/enemy-ships/Ship3_Explosion/Ship3_Explosion_018.png",
    "./img/enemy-ships/Ship3_Explosion/Ship3_Explosion_019.png",
    "./img/enemy-ships/Ship3_Explosion/Ship3_Explosion_021.png",
  ];

  constructor(minX) {
    super().loadImage("./img/enemy-ships/Ship3.png");
    this.offsetY = 30;
    this.offsetX = 15;
    this.x = minX + Math.random() * 500;
    this.loadImages(this.deathAnimation);
    this.setLocalInterval(() => this.initiateClass(), 100);
  }

  /**
   * Initializes the class and sets up animations and intervals.
   */
  initiateClass() {
    if (this.world) {
      this.setGlobalInterval(() => this.animate(), 1000 / this.fps);
      this.stopLocalIntervals();
      this.setLocalInterval(() => this.fireShots(), 1000 + Math.random() * 2000);
    }
  }

  /**
   * Manages animation and behavior of the class.
   */
  animate() {
    this.moveLeft();
    this.exhaust.x = this.x + 72;
    this.exhaust.y = this.y + 25;
    if (this.isDead()) {
      this.animateImagesOnce(this.deathAnimation);
      this.playExplosionSound();
      this.stopLocalIntervals();
    }
  }

  /**
   * Fires shots if the entity is visible on the canvas.
   */
  fireShots() {
    if (this.isVisableOnCanvas()) {
      this.enemyShoot();
    }
  }
}
