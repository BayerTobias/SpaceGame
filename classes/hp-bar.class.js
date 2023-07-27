class HpBar extends StatusBar {
  images = [
    "../el-pollo-loco/img/interface/hit_points0.png",
    "../el-pollo-loco/img/interface/hit_points20.png",
    "../el-pollo-loco/img/interface/hit_points40.png",
    "../el-pollo-loco/img/interface/hit_points60.png",
    "../el-pollo-loco/img/interface/hit_points80.png",
    "../el-pollo-loco/img/interface/hit_points100.png",
  ];

  constructor() {
    super();
    this.loadImage("../el-pollo-loco/img/interface/hit_points100.png");
    this.loadImages(this.images);
    this.checkPercent();
    this.y = 50;
  }

  checkPercent() {
    setInterval(() => {
      if (this.world) {
        this.setPercentage(this.world.level.character.HP);
      }
    }, 1000 / 60);
  }
}
