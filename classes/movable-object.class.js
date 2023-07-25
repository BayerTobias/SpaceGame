class MovableObject {
  x = 50;
  y = 150;
  img;
  height = 128;
  width = 128;
  imgCache = {};
  speed = 0.5 + Math.random() * 0.5;
  fps = 60;
  otherDirection = false;

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
    ctx.beginPath();
    ctx.lineWidth = "2";
    ctx.strokeStyle = "blue";
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
  }
}
