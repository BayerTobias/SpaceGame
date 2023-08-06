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
    "../el-pollo-loco/img/endboss/endboss-damage/Boss1_lvl7_damage_000.png",
    "../el-pollo-loco/img/endboss/endboss-damage/Boss1_lvl7_damage_001.png",
    "../el-pollo-loco/img/endboss/endboss-damage/Boss1_lvl7_damage_002.png",
    "../el-pollo-loco/img/endboss/endboss-damage/Boss1_lvl7_damage_003.png",
    "../el-pollo-loco/img/endboss/endboss-damage/Boss1_lvl7_damage_004.png",
    "../el-pollo-loco/img/endboss/endboss-damage/Boss1_lvl7_damage_005.png",
  ];

  deathAnimation = [
    "../el-pollo-loco/img/endboss/endboss-explosion/Level7_002.png",
    "../el-pollo-loco/img/endboss/endboss-explosion/Level7_006.png",
    "../el-pollo-loco/img/endboss/endboss-explosion/Level7_008.png",
    "../el-pollo-loco/img/endboss/endboss-explosion/Level7_010.png",
    "../el-pollo-loco/img/endboss/endboss-explosion/Level7_011.png",
    "../el-pollo-loco/img/endboss/endboss-explosion/Level7_012.png",
    "../el-pollo-loco/img/endboss/endboss-explosion/Level7_015.png",
    "../el-pollo-loco/img/endboss/endboss-explosion/Level7_017.png",
    "../el-pollo-loco/img/endboss/endboss-explosion/Level7_018.png",
    "../el-pollo-loco/img/endboss/endboss-explosion/Level7_022.png",
    "../el-pollo-loco/img/endboss/endboss-explosion/Level7_023.png",
    "../el-pollo-loco/img/endboss/endboss-explosion/Level7_024.png",
    "../el-pollo-loco/img/endboss/endboss-explosion/Level7_027.png",
    "../el-pollo-loco/img/endboss/endboss-explosion/Level7_029.png",
  ];

  constructor() {
    super().loadImage("../el-pollo-loco/img/endboss/Boss_ship7.png");
    this.offsetX = 45;
    this.offsetY = 90;
    this.loadImages(this.damageAnimation);
    this.loadImages(this.deathAnimation);

    this.setLocalInterval(() => this.initiateClass(), 100);
  }

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

  animate() {
    if (this.isDead()) {
      this.currentImage = 0;
      this.animateImagesOnce(this.deathAnimation);
      endBossDeathSound.play();
      setTimeout(() => {
        this.world.stopGame();
      }, 200);
    } else if (this.isHurt()) {
      this.animateImages(this.damageAnimation);
      console.log("is Hit");
    } else {
      this.loadImage("../el-pollo-loco/img/endboss/Boss_ship7.png");
    }
  }

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
