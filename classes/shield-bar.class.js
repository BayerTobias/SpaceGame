class ShieldBar extends StatusBar {
  y = 440;

  images = [
    "../el-pollo-loco/img/interface/defence0.png",
    "../el-pollo-loco/img/interface/defence20.png",
    "../el-pollo-loco/img/interface/defence40.png",
    "../el-pollo-loco/img/interface/defence60.png",
    "../el-pollo-loco/img/interface/defence80.png",
    "../el-pollo-loco/img/interface/defence100.png",
  ];

  constructor() {
    super();
    this.loadImage("../el-pollo-loco/img/interface/defence0.png");
    this.loadImages(this.images);

    this.setLocalInterval(() => this.checkPercent(), 1000 / this.fps);
  }

  checkPercent() {
    if (this.world) {
      this.setPercentage(this.world.level.character.shield);
    }
  }
}
