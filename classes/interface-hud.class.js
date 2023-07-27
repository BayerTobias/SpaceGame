class HUD extends DrawableObject {
  constructor() {
    super();
    this.loadImage("../el-pollo-loco/img/interface/stat-frame.png");
    this.height = 84;
    this.width = 211;
    this.x = 0;
    this.y = 480 - this.height;
  }
}
