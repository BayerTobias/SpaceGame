class Projectile extends MovableObject {
  projectileExpireImages = [
    "../el-pollo-loco/img/projectiles/player/fire_exp1.png",
    "../el-pollo-loco/img/projectiles/player/fire_exp2.png",
    "../el-pollo-loco/img/projectiles/player/fire_exp3.png",
    "../el-pollo-loco/img/projectiles/player/fire_exp4.png",
    "../el-pollo-loco/img/projectiles/player/fire_exp5.png",
  ];
  speed = 10;
  width = 64;
  height = 64;
  offsetY = 25;
  shotFromX;
  hasCollided = false;

  constructor(object) {
    super();
    this.loadImage("../el-pollo-loco/img/projectiles/player/fire_asset.png");
    this.loadImages(this.projectileExpireImages);

    this.x = object.x + object.width - 10;
    this.y = object.y + object.offsetY;
    this.shotFromX = object.x;

    setInterval(() => {
      this.moveRight();
      if (this.hasCollided) {
        this.animateImages(this.projectileExpireImages);
      }
    }, 1000 / 60);
  }

  projectileOutOfMap() {
    return this.x > this.shotFromX + 720;
  }
}
