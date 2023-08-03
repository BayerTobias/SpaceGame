class DrawableObject {
  x = 100;
  y = 200;
  height = 100;
  width = 100;
  img;
  imgCache = {};
  world;

  localIntervals = [];

  constructor() {}

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imgCache[path] = img;
    });
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /*DELETE FUNCTION*/

  // delete b4 game finished
  drawImgBorder(ctx) {
    if (
      this instanceof EnemyShip ||
      this instanceof Character ||
      this instanceof EndBoss ||
      this instanceof MapElement ||
      this instanceof DrawableObject
    ) {
      ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  drawHitBox(ctx) {
    if (
      this instanceof EnemyShip ||
      this instanceof Character ||
      this instanceof EndBoss ||
      this instanceof MapElement ||
      this instanceof PlayerProjectile ||
      this instanceof EnemyProjectile ||
      this instanceof Rocket ||
      this instanceof EndBossProjectile
    ) {
      ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle = "red";
      ctx.rect(
        this.x + this.offsetX,
        this.y + this.offsetY,
        this.width - 2 * this.offsetX,
        this.height - 2 * this.offsetY
      );
      ctx.stroke();
    }
  }

  checkIfEnemyShip() {
    return this instanceof EnemyShip;
  }

  setLocalInterval(callback, time) {
    let id = setInterval(callback, time);
    this.localIntervals.push(id);
  }

  stopLocalIntervals() {
    this.localIntervals.forEach(clearInterval);
  }

  setGlobalInterval(callback, time) {
    let id = setInterval(callback, time);
    this.world.globalIntervals.push(id);
  }
}
