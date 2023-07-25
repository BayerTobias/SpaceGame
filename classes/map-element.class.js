class MapElement extends MovableObject {
  x = 500;
  y = 250;
  width = 60;
  height = 60;

  constructor(x, y, width, height) {
    super().loadImage(
      "../el-pollo-loco/img/map-elements/stone_0001_Layer-49.png"
    );
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}
