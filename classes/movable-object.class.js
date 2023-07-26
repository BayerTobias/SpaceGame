class MovableObject {
  x = 50;
  y = 150;
  offsetX = 0;
  offsetY = 0;
  img;
  height = 100;
  width = 100;
  imgCache = {};
  speed = 0.5 + Math.random() * 0.5;
  fps = 60;
  otherDirection = false;

  HP = 100;

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

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  moveUp() {
    this.y -= this.speed;
  }

  moveDown() {
    this.y += this.speed;
  }

  movementKeyIsPressed() {
    if (
      (this.world && this.world.keyboard.right) ||
      keyboard.up ||
      keyboard.down ||
      keyboard.left
    ) {
      return true;
    }
  }

  handleCharacterMovement() {
    if (keyboard.right) {
      this.moveRight();
    }
    if (keyboard.left) {
      this.moveLeft();
    }
    if (keyboard.up) {
      this.moveUp();
    }
    if (keyboard.down) {
      this.moveDown();
    }
  }

  animateImages(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imgCache[path];
    this.currentImage++;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  // delete b4 game finished
  drawImgBorder(ctx) {
    if (
      this instanceof EnemyShip ||
      this instanceof Character ||
      this instanceof EndBoss ||
      this instanceof MapElement
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
      this instanceof MapElement
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

  // Bessere Formel zur Kollisionsberechnung (Genauer)
  isColliding(object) {
    return (
      this.x + this.width + this.offsetX >= object.x + object.offsetX &&
      this.x + this.offsetX <= object.x + object.width - object.offsetX &&
      this.y + this.height - this.offsetY >= object.y + object.offsetY &&
      this.y + this.offsetY <= object.y + object.height - object.offsetY
      //&& object.onCollisionCourse
    ); // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
  }

  isDead() {
    return this.HP === 0;
  }

  isHit() {
    this.HP -= 10;
    if (this.HP < 0) {
      this.HP = 0;
    }
  }

  kill() {
    this.HP = 0;
  }

  isHurt() {}
}
