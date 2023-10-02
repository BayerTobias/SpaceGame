class EndBoss extends MovableObject {
  x = 1500;
  y = 100;
  height = 300;
  width = 300;
  HP = 200;
  otherDirection = true;

  invincible = true;
  immuneTime = 300;

  hitTop = true;
  hitBottom;

  damageAnimation = [
    "./img/endboss/endboss-damage/Boss1_lvl7_damage_000.png",
    "./img/endboss/endboss-damage/Boss1_lvl7_damage_001.png",
    "./img/endboss/endboss-damage/Boss1_lvl7_damage_002.png",
    "./img/endboss/endboss-damage/Boss1_lvl7_damage_003.png",
    "./img/endboss/endboss-damage/Boss1_lvl7_damage_004.png",
    "./img/endboss/endboss-damage/Boss1_lvl7_damage_005.png",
  ];

  deathAnimation = [
    "./img/endboss/endboss-explosion/Level7_002.png",
    "./img/endboss/endboss-explosion/Level7_006.png",
    "./img/endboss/endboss-explosion/Level7_008.png",
    "./img/endboss/endboss-explosion/Level7_010.png",
    "./img/endboss/endboss-explosion/Level7_011.png",
    "./img/endboss/endboss-explosion/Level7_012.png",
    "./img/endboss/endboss-explosion/Level7_015.png",
    "./img/endboss/endboss-explosion/Level7_017.png",
    "./img/endboss/endboss-explosion/Level7_018.png",
    "./img/endboss/endboss-explosion/Level7_022.png",
    "./img/endboss/endboss-explosion/Level7_023.png",
    "./img/endboss/endboss-explosion/Level7_024.png",
    "./img/endboss/endboss-explosion/Level7_027.png",
    "./img/endboss/endboss-explosion/Level7_029.png",
  ];

  constructor() {
    super().loadImage("./img/endboss/Boss_ship7.png");
    this.offsetX = 45;
    this.offsetY = 90;
    this.loadImages(this.damageAnimation);
    this.loadImages(this.deathAnimation);

    this.setLocalInterval(() => this.initiateClass(), 100);
  }

  /**
   * Initiates the class and performs specific actions based on world and camera conditions.
   */
  initiateClass() {
    if (this.world && this.world.camera_x > 850) {
      endBossIntroductionSound.play();
    }
    if (this.world && this.world.camera_x === world.level.levelEnd_X) {
      this.invincible = false;
      this.setGlobalInterval(() => this.animate(), 1000 / this.fps);
      this.setGlobalInterval(() => this.startFight(), 1000 / this.fps);
      this.setGlobalInterval(() => this.endBossShoot(this.x, this.y), 1000);
      this.stopLocalIntervals();
    }
  }

  /**
   * Manages animation based on the object's current state.
   */
  animate() {
    if (this.isDead()) this.handleDeath();
    else if (this.isHurt()) this.animateImages(this.damageAnimation);
    else this.loadImage("./img/endboss/Boss_ship7.png");
  }

  /**
   * Handles the entity's death animation and related actions.
   */
  handleDeath() {
    this.currentImage = 0;
    this.animateImagesOnce(this.deathAnimation);
    endBossDeathSound.play();
    setTimeout(() => {
      this.world.stopGame();
      showEndscreen(getVicoryHTML);
    }, 200);
  }

  /**
   * Manages the movement behavior of the entity during a fight.
   */
  startFight() {
    if (this.hitTop) {
      this.y++;
      if (this.y + this.height === 490) {
        this.hitBottom = true;
        this.hitTop = false;
      }
    } else if (this.hitBottom) {
      this.y--;
      if (this.y === -10) {
        this.hitBottom = false;
        this.hitTop = true;
      }
    }
  }
}
