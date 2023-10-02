class PowerUp extends MovableObject {
  type;
  HPImg = "./img/interface/HP3.png";
  shieldImg = "./img/interface/Shield3.png";

  constructor(type, x, y) {
    super();
    this.type = type;
    this.x = x;
    this.y = y;
    this.width = 25;
    this.height = 25;

    this.loadImage(this.HPImg);
    this.initiateClass();
  }

  /**
   * Initializes the class based on the power-up type.
   */
  initiateClass() {
    if (this.type === "HP") this.loadImage(this.HPImg);
    else if (this.type === "shield") this.loadImage(this.shieldImg);
  }
}
