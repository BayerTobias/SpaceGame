class RocketSilo extends MovableObject {
  y = 360;
  x = 500;
  cooldown = 2000;
  characterHasEntered;

  openSiloAnimationImages = [
    "../el-pollo-loco/img/traps/rocket-trap/Gates.png",
    "../el-pollo-loco/img/traps/rocket-trap/Gates2.png",
    "../el-pollo-loco/img/traps/rocket-trap/Gates3.png",
    "../el-pollo-loco/img/traps/rocket-trap/Gates4.png",
    "../el-pollo-loco/img/traps/rocket-trap/Gates5.png",
    "../el-pollo-loco/img/traps/rocket-trap/Gates6.png",
    "../el-pollo-loco/img/traps/rocket-trap/Gates5.png",
    "../el-pollo-loco/img/traps/rocket-trap/Gates4.png",
    "../el-pollo-loco/img/traps/rocket-trap/Gates3.png",
    "../el-pollo-loco/img/traps/rocket-trap/Gates2.png",
    "../el-pollo-loco/img/traps/rocket-trap/Gates.png",
  ];

  constructor() {
    super();
    this.loadImage("../el-pollo-loco/img/traps/rocket-trap/Gates.png");
    this.loadImages(this.openSiloAnimationImages);
    this.setLocalInterval(() => this.initiateClass(), 100);
  }

  initiateClass() {
    if (this.world) {
      this.setGlobalInterval(() => this.animate(), 200);
      this.stopLocalIntervals();
    }
  }

  animate() {
    if (this.inFiringZone(this.world.level.character) && this.shotCooldown()) {
      this.fireRocket();
      this.characterHasEntered = true;
    }
    if (this.characterHasEntered) {
      this.animateImagesOnce(this.openSiloAnimationImages);
    }
  }

  inFiringZone(character) {
    return character.x < this.x && character.x > 150;
  }

  fireRocket() {
    this.deathAnmimationCurrentImage = 0;

    this.lastShot = new Date().getTime();

    setTimeout(() => {
      this.world.enemyShots.push(new Rocket());
    }, 1000);
  }
}
