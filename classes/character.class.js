class Character extends MovableObject {
  world;
  speed = 4;
  flyingSound = new Audio("../el-pollo-loco/audio/rocket-trust.mp3");

  constructor() {
    super().loadImage("../el-pollo-loco/img/player-ship/Ship3.png");
    this.animate();
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

  movementKeyIsPressed() {
    if (
      (this.world && this.world.keyboard.right) ||
      keyboard.up ||
      keyboard.down ||
      keyboard.left
    ) {
      return true;
    }
  }
}
