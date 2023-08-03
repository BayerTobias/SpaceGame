class RocketSilo extends MovableObject {
  y = 360;
  x = 500;

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
    this.setLocalInterval(() => this.animate(), 200);
  }

  animate() {
    this.animateImagesOnce(this.openSiloAnimationImages);
  }

  fireRocket() {
    this.deathAnmimationCurrentImage = 0;
    this.world.enemyShots.push(new Rocket());
  }
}
