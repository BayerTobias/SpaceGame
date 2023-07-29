class Projectile extends MovableObject {
  projectileImages = ["../el-pollo-loco/img/projectiles/player/fire_asset.png"];
  speed = 10;
  width = 64;
  height = 64;
  offsetY = 25;
  shotFromX;

  constructor(object) {
    super();
    this.loadImage(this.projectileImages[0]);

    this.x = object.x + object.width - 10;
    this.y = object.y + object.offsetY;
    this.shotFromX = object.x;

    setInterval(() => {
      this.moveRight();
    }, 1000 / 60);
  }

  projectileOutOfMap() {
    return this.x > this.shotFromX + 720;
  }
}
