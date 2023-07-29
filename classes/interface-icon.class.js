class InterfaceIcon extends DrawableObject {
  interfaceImages = [
    "../el-pollo-loco/img/interface/character.png",
    "../el-pollo-loco/img/interface/HP3.png",
    "../el-pollo-loco/img/interface/Shield3.png",
  ];
  constructor(x, y, width, height, index) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.loadImage(this.interfaceImages[index]);
  }
}
