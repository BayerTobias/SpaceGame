class MovableObject {
  x = 50;
  y = 150;
  img;
  height = 128;
  width = 128;
  imgCache = {};
  speed = 0.25 + Math.random() * 0.25;

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
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
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
}
