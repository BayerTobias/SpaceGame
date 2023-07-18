class MovableObject {
  x = 50;
  y = 150;
  img;
  height = 128;
  width = 128;

  constructor() {}

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  moveRight() {}
}
