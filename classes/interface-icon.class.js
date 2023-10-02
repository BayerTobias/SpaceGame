class InterfaceIcon extends DrawableObject {
  interfaceImages = [
    "./img/interface/character.png",
    "./img/interface/HP3.png",
    "./img/interface/Shield3.png",
  ];
  constructor(x, y, width, height, index) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.loadImage(this.interfaceImages[index]);
  }
}
