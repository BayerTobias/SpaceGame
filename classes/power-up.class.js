class PowerUp extends MovableObject {
  type;
  HPImg = "../el-pollo-loco/img/interface/HP3.png";
  shieldImg = "../el-pollo-loco/img/interface/Shield3.png";

  constructor(type, x, y) {
    super();
    this.type = type;
    this.x = x;
    this.y = y;
    this.width = 25;
    this.height = 25;

    this.loadImage(this.HPImg);
    this.initiateClass();
  }

  initiateClass() {
    if (this.type === "HP") {
      this.loadImage(this.HPImg);
    } else if (this.type === "shield") {
      this.loadImage(this.shieldImg);
    }
  }
}
