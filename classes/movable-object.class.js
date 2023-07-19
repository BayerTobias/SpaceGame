class MovableObject {
  x = 50;
  y = 150;
  img;
  height = 128;
  width = 128;
  imgCache = {};

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

  moveRight() {}
}
