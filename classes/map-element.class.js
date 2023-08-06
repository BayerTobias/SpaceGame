class MapElement extends MovableObject {
  x = 500;
  y = 250;
  width = 60;
  height = 60;
  offsetY = 20;

  mapImages = [
    "../el-pollo-loco/img/map-elements/bottom-stone-tile1.png", // stone bottom 1 index:0
    "../el-pollo-loco/img/map-elements/bottom-stone-tile2.png", // stone bottom 2 index:1
    "../el-pollo-loco/img/map-elements/top-stone-tile1.png", // stone top 1 index:2
    "../el-pollo-loco/img/map-elements/top-stone-tile2.png", // stone top 2 index:3
    "../el-pollo-loco/img/map-elements/bio_tile_big1.png", // deco big arch start index:4
    "../el-pollo-loco/img/map-elements/bio_tile_big2.png", // deco big arch middle index:5
    "../el-pollo-loco/img/map-elements/bio_tile_big3.png", // deco big arch end index:6
    "../el-pollo-loco/img/map-elements/vein1.png", // deco vein index:7
    "../el-pollo-loco/img/map-elements/bio_tile_small1.png", // deco small arch index:8
    "../el-pollo-loco/img/map-elements/bio_tile_small2.png", // deco small arch index:9
  ];

  constructor(x, y, width, height, index, offsetX, offsetY) {
    super();
    this.loadImage(this.mapImages[index]);
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
  }
}
