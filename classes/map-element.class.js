class MapElement extends MovableObject {
  x = 500;
  y = 250;
  width = 60;
  height = 60;
  offsetY = 20;

  mapImages = [
    "../el-pollo-loco/img/map-elements/bottom-stone-tile1.png",
    "../el-pollo-loco/img/map-elements/bottom-stone-tile2.png",
    "../el-pollo-loco/img/map-elements/top-stone-tile1.png",
    "../el-pollo-loco/img/map-elements/top-stone-tile2.png",
  ];

  constructor(x, y, width, height, index) {
    super().loadImage(this.mapImages[index]);
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}
