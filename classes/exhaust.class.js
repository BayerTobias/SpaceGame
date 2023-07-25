class playerExhaust extends MovableObject {
  x = 20;
  y = 193;
  height = 50;
  width = 50;
  imagesExhaustAnimation = [
    "../el-pollo-loco/img/player-ship/Exhaust3/fire1.png",
    "../el-pollo-loco/img/player-ship/Exhaust3/fire2.png",
    "../el-pollo-loco/img/player-ship/Exhaust3/fire3.png",
    "../el-pollo-loco/img/player-ship/Exhaust3/fire4.png",
    "../el-pollo-loco/img/player-ship/Exhaust3/fire2.png",
    "../el-pollo-loco/img/player-ship/Exhaust3/fire1.png",
  ];
  currentImage = 0;
  world;

  constructor() {
    super().loadImage("../el-pollo-loco/img/player-ship/Exhaust3/fire1.png");
    this.loadImages(this.imagesExhaustAnimation);
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.movementKeyIsPressed()) {
        this.handleExhaustMovement();
        this.animateImages(this.imagesExhaustAnimation);
      }
    }, 1000 / this.fps);
  }

  handleExhaustMovement() {
    this.x = this.world.level.character.x - 32;
    this.y = this.world.level.character.y + 43;
  }
}
