class EndBoss extends MovableObject {
  x = 300;
  height = 300;
  width = 300;
  HP = 20;
  otherDirection = true;

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
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.isDead()) {
        this.currentImage = 0;
        this.animateImagesOnce(this.deathAnimation);
        console.log("dead");
      } else if (this.isHurt()) {
        this.animateImages(this.damageAnimation);
        console.log("is Hit");
      } else {
        this.loadImage("../el-pollo-loco/img/endboss/Boss_ship7.png");
      }
    }, 1000 / this.fps);
  }
}
