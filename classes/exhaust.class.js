class Exhaust extends Character {
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
  speed = 1;

  constructor() {
    super().loadImage("../el-pollo-loco/img/player-ship/Exhaust3/fire1.png");
    this.loadImages(this.imagesExhaustAnimation);
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
        let i = this.currentImage % this.imagesExhaustAnimation.length;
        let path = this.imagesExhaustAnimation[i];
        this.img = this.imgCache[path];
        this.currentImage++;
      }
    }, 1000 / 30);
  }

  handleCharacterMovement() {
    if (keyboard.right) {
      this.x += this.speed;
    }
    if (keyboard.left) {
      this.x -= this.speed;
    }
    if (keyboard.up) {
      this.y -= this.speed;
    }
    if (keyboard.down) {
      this.y += this.speed;
    }
  }
}
