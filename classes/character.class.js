class Character extends MovableObject {
  world;
  offsetY = 30;
  offsetX = 10;
  speed = 4;
  shipIMG = "./img/player-ship/ship_asset7.png";

  immuneTime = 500;

  damageAnimation = [
    "./img/player-ship/isHurtIMG/Ship1_lvl7_damage_000.png",
    "./img/player-ship/isHurtIMG/Ship1_lvl7_damage_001.png",
    "./img/player-ship/isHurtIMG/Ship1_lvl7_damage_002.png",
    "./img/player-ship/isHurtIMG/Ship1_lvl7_damage_003.png",
    "./img/player-ship/isHurtIMG/Ship1_lvl7_damage_004.png",
    "./img/player-ship/isHurtIMG/Ship1_lvl7_damage_005.png",
    "./img/player-ship/isHurtIMG/Ship1_lvl7_damage_006.png",
    "./img/player-ship/isHurtIMG/Ship1_lvl7_damage_007.png",
    "./img/player-ship/isHurtIMG/Ship1_lvl7_damage_008.png",
    "./img/player-ship/isHurtIMG/Ship1_lvl7_damage_009.png",
    "./img/player-ship/isHurtIMG/Ship1_lvl7_damage_010.png",
    "./img/player-ship/isHurtIMG/Ship1_lvl7_damage_011.png",
  ];
  deathAnimation = [
    "./img/player-ship/deathAnimation/Lvl7_explotion_001.png",
    "./img/player-ship/deathAnimation/Lvl7_explotion_002.png",
    "./img/player-ship/deathAnimation/Lvl7_explotion_003.png",
    "./img/player-ship/deathAnimation/Lvl7_explotion_004.png",
    "./img/player-ship/deathAnimation/Lvl7_explotion_005.png",
    "./img/player-ship/deathAnimation/Lvl7_explotion_006.png",
    "./img/player-ship/deathAnimation/Lvl7_explotion_007.png",
    "./img/player-ship/deathAnimation/Lvl7_explotion_008.png",
    "./img/player-ship/deathAnimation/Lvl7_explotion_009.png",
    "./img/player-ship/deathAnimation/Lvl7_explotion_010.png",
    "./img/player-ship/deathAnimation/Lvl7_explotion_011.png",
  ];

  constructor() {
    super().loadImage(this.shipIMG);
    this.loadImages(this.damageAnimation);
    this.loadImages(this.deathAnimation);
    this.setLocalInterval(() => this.initiateClass(), 1000 / this.fps);
  }

  /**
   * checks if world exists if so starts an interval of the animate function
   */
  initiateClass() {
    if (this.world) {
      this.setGlobalInterval(() => this.animate(), 1000 / this.fps);
      this.stopLocalIntervals();
    }
  }

  /**
   * this function checks the status of the character and invokes the responding function
   */
  animate() {
    if (this.world) {
      if (this.isDead()) this.handleDeath();
      else if (this.isHurt()) this.animateImages(this.damageAnimation);
      else this.loadImage(this.shipIMG);
      if (!this.isVisableOnCanvas()) this.kill();
      if (this.movementKeyIsPressed()) this.move();
      else if (this.shootKeyIsPressed()) this.stopAndShoot();
      else flyingSound.pause();
    }
  }

  /**
   * this function is a support function to the animate function and handels the death of the character
   */
  handleDeath() {
    this.animateImagesOnce(this.deathAnimation);
    this.playExplosionSound();
    flyingSound.pause();
  }

  /**
   * this function is a support function to the animate function and handels character movement
   */
  move() {
    this.handleCharacterMovement();
    flyingSound.play();
  }

  /**
   * this function is a support function to the animate function and handels when the character stops and shoots
   */
  stopAndShoot() {
    this.handleCharacterMovement();
    flyingSound.pause();
  }
}
