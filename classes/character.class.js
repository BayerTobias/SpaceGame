class Character extends MovableObject {
  world;
  speed = 2;

  constructor() {
    super().loadImage("../el-pollo-loco/img/player-ship/Ship3.png");
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (
        (this.world && this.world.keyboard.right) ||
        keyboard.up ||
        keyboard.down ||
        keyboard.left
      ) {
        this.handleCharacterMovement();
      }
    }, 1000 / this.fps);
  }
}
