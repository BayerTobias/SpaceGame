class Background extends MovableObject {
  x = 0;
  y = 0;
  width = 720;
  height = 480;
  world;

  constructor() {
    super().loadImage("../el-pollo-loco/img/background/Space2.png");
    this.animateSidescroll();
  }

  animateSidescroll() {
    setInterval(() => {
      if (this.world) {
        this.x = this.world.camera_x;
      }
    }, 1000 / this.fps);
  }
}
