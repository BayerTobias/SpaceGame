class Character extends MovableObject {
  world;
  offsetY = 25;
  speed = 4;
  shipIMG = "../el-pollo-loco/img/player-ship/ship_asset7.png";
  flyingSound = new Audio("../el-pollo-loco/audio/rocket-trust.mp3");
  damageAnimation = [
    "../el-pollo-loco/img/player-ship/isHurtIMG/Ship1_lvl7_damage_000.png",
    "../el-pollo-loco/img/player-ship/isHurtIMG/Ship1_lvl7_damage_001.png",
    "../el-pollo-loco/img/player-ship/isHurtIMG/Ship1_lvl7_damage_002.png",
    "../el-pollo-loco/img/player-ship/isHurtIMG/Ship1_lvl7_damage_003.png",
    "../el-pollo-loco/img/player-ship/isHurtIMG/Ship1_lvl7_damage_004.png",
    "../el-pollo-loco/img/player-ship/isHurtIMG/Ship1_lvl7_damage_005.png",
    "../el-pollo-loco/img/player-ship/isHurtIMG/Ship1_lvl7_damage_006.png",
    "../el-pollo-loco/img/player-ship/isHurtIMG/Ship1_lvl7_damage_007.png",
    "../el-pollo-loco/img/player-ship/isHurtIMG/Ship1_lvl7_damage_008.png",
    "../el-pollo-loco/img/player-ship/isHurtIMG/Ship1_lvl7_damage_009.png",
    "../el-pollo-loco/img/player-ship/isHurtIMG/Ship1_lvl7_damage_010.png",
    "../el-pollo-loco/img/player-ship/isHurtIMG/Ship1_lvl7_damage_011.png",
  ];
  deathAnimation = [
    "../el-pollo-loco/img/player-ship/deathAnimation/Lvl7_explotion_001.png",
    "../el-pollo-loco/img/player-ship/deathAnimation/Lvl7_explotion_002.png",
    "../el-pollo-loco/img/player-ship/deathAnimation/Lvl7_explotion_003.png",
    "../el-pollo-loco/img/player-ship/deathAnimation/Lvl7_explotion_004.png",
    "../el-pollo-loco/img/player-ship/deathAnimation/Lvl7_explotion_005.png",
    "../el-pollo-loco/img/player-ship/deathAnimation/Lvl7_explotion_006.png",
    "../el-pollo-loco/img/player-ship/deathAnimation/Lvl7_explotion_007.png",
    "../el-pollo-loco/img/player-ship/deathAnimation/Lvl7_explotion_008.png",
    "../el-pollo-loco/img/player-ship/deathAnimation/Lvl7_explotion_009.png",
    "../el-pollo-loco/img/player-ship/deathAnimation/Lvl7_explotion_010.png",
    "../el-pollo-loco/img/player-ship/deathAnimation/Lvl7_explotion_011.png",
  ];

  constructor() {
    super().loadImage(this.shipIMG);
    this.loadImages(this.damageAnimation);
    this.loadImages(this.deathAnimation);
    this.setLocalInterval(() => this.initiateClass(), 1000 / this.fps);
  }

  initiateClass() {
    if (this.world) {
      this.setGlobalInterval(() => this.animate(), 1000 / this.fps);
      this.stopLocalIntervals();
    }
  }

  animate() {
    if (this.world) {
      if (this.isDead()) {
        this.animateImagesOnce(this.deathAnimation);
      } else if (this.isHurt()) {
        this.animateImages(this.damageAnimation);
      } else {
        this.loadImage(this.shipIMG);
      }
      if (!this.isVisableOnCanvas()) {
        this.kill();
        console.log("BOOM");
      }
      if (this.movementKeyIsPressed()) {
        this.handleCharacterMovement();
        this.flyingSound.play();
      } else if (this.shootKeyIsPressed()) {
        this.handleCharacterMovement();
        this.flyingSound.pause();
      } else {
        this.flyingSound.pause();
      }
    }
  }
}
