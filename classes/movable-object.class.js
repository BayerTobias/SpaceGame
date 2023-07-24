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

  moveLeft() {
    this.otherDirection = true;
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / this.fps);
  }

  handleCharacterMovement() {
    if (keyboard.right) {
      this.x += this.speed;
    }
    if (keyboard.left) {
      this.x -= this.speed;
    }
    if (keyboard.up) {
      this.y -= this.speed;
    }
    if (keyboard.down) {
      this.y += this.speed;
    }
  }

  animateImages(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imgCache[path];
    this.currentImage++;
  }
}
