class Rocket extends MovableObject {
  speed = 8;
  offsetX = 40;
  offsetY = 25;
  y = 370;
  x = 500;

  flyingAnimationImages = [
    "./img/traps/rocket-trap/Rockett+Exhaust.png",
    "./img/traps/rocket-trap/Rockett+Exhaust2.png",
    "./img/traps/rocket-trap/Rockett+Exhaust3.png",
    "./img/traps/rocket-trap/Rockett+Exhaust4.png",
  ];

  explosionAnimationImages = [
    "./img/traps/rocket-trap/Rockett+explosion1.png",
    "./img/traps/rocket-trap/Rockett+explosion2.png",
    "./img/traps/rocket-trap/Rockett+explosion3.png",
    "./img/traps/rocket-trap/Rockett+explosion4.png",
    "./img/traps/rocket-trap/Rockett+explosion5.png",
    "./img/traps/rocket-trap/Rockett+explosion6.png",
    "./img/traps/rocket-trap/Rockett+explosion7.png",
    "./img/traps/rocket-trap/Rockett+explosion8.png",
    "./img/traps/rocket-trap/Rockett+explosion9.png",
    "./img/traps/rocket-trap/Rockett+explosion10.png",
    "./img/traps/rocket-trap/Rockett+explosion11.png",
  ];

  constructor() {
    super();
    this.loadImage("./img/traps/rocket-trap/Rockett+Exhaust.png");
    this.loadImages(this.flyingAnimationImages);
    this.loadImages(this.explosionAnimationImages);
    this.setLocalInterval(() => this.animate(), 1000 / this.fps);
  }

  /**
   * Animates the object's behavior and appearance.
   */
  animate() {
    if (!this.hasCollided) {
      this.animateImages(this.flyingAnimationImages);
      this.moveUp();
    } else {
      this.animateImagesOnce(this.explosionAnimationImages);
      if (this.deathAnmimationCurrentImage === this.explosionAnimationImages.length - 1) {
        this.animationFinished = true;
      }
    }
  }
}
