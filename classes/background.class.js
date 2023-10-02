class Background extends MovableObject {
  x = 0;
  y = 0;
  width = 720;
  height = 480;
  world;

  constructor() {
    super().loadImage("./img/background/Space2.png");
    this.setLocalInterval(() => this.animateSidescroll(), 1000 / this.fps);
  }

  /**
   * moves the background image in the camera frame
   */
  animateSidescroll() {
    if (this.world) this.x = this.world.camera_x;
  }
}
