class playerExhaust extends MovableObject {
  x = 83;
  y = 225;
  height = 50;
  width = 50;
  imagesExhaustAnimation = [
    "../el-pollo-loco/img/player-ship/engineAnimation4x/ship1_flight_lvl7_001.png",
    "../el-pollo-loco/img/player-ship/engineAnimation4x/ship1_flight_lvl7_002.png",
    "../el-pollo-loco/img/player-ship/engineAnimation4x/ship1_flight_lvl7_003.png",
    "../el-pollo-loco/img/player-ship/engineAnimation4x/ship1_flight_lvl7_004.png",
  ];
  currentImage = 0;
  world;

  constructor() {
    super().loadImage(
      "../el-pollo-loco/img/player-ship/engineAnimation4x/ship1_flight_lvl7_001.png"
    );
    this.loadImages(this.imagesExhaustAnimation);
    this.setLocalInterval(() => this.animate(), 1000 / this.fps);
  }

  animate() {
    if (this.movementKeyIsPressed()) {
      this.handleExhaustMovement();
      this.animateImages(this.imagesExhaustAnimation);
    } else {
      this.loadImage("");
    }
  }

  handleExhaustMovement() {
    this.x = this.world.level.character.x - 17;
    this.y = this.world.level.character.y + 25;
  }
}
