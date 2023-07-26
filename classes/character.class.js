class Character extends MovableObject {
  world;
  speed = 4;
  flyingSound = new Audio("../el-pollo-loco/audio/rocket-trust.mp3");

  constructor() {
    super().loadImage("../el-pollo-loco/img/player-ship/ship_asset7.png");
    this.animate();
    this.offsetY = 25;
  }

  animate() {
    setInterval(() => {
      if (this.movementKeyIsPressed()) {
        this.handleCharacterMovement();
        this.flyingSound.play();
      } else {
        this.flyingSound.pause();
      }
    }, 1000 / this.fps);
  }
}
