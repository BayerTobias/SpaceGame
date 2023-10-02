class RocketSilo extends MovableObject {
  y = 360;
  x = 500;
  cooldown = 2000;
  characterHasEntered;

  openSiloAnimationImages = [
    "./img/traps/rocket-trap/Gates.png",
    "./img/traps/rocket-trap/Gates2.png",
    "./img/traps/rocket-trap/Gates3.png",
    "./img/traps/rocket-trap/Gates4.png",
    "./img/traps/rocket-trap/Gates5.png",
    "./img/traps/rocket-trap/Gates6.png",
    "./img/traps/rocket-trap/Gates5.png",
    "./img/traps/rocket-trap/Gates4.png",
    "./img/traps/rocket-trap/Gates3.png",
    "./img/traps/rocket-trap/Gates2.png",
    "./img/traps/rocket-trap/Gates.png",
  ];

  constructor() {
    super();
    this.loadImage("./img/traps/rocket-trap/Gates.png");
    this.loadImages(this.openSiloAnimationImages);
    this.setLocalInterval(() => this.initiateClass(), 100);
  }

  /**
   * Initializes the class and sets up animation intervals.
   */
  initiateClass() {
    if (this.world) {
      this.setGlobalInterval(() => this.animate(), 200);
      this.stopLocalIntervals();
    }
  }

  /**
   * Animates the object's behavior and appearance.
   */
  animate() {
    if (this.inFiringZone(this.world.level.character) && this.shotCooldown()) {
      this.fireRocket();
      this.characterHasEntered = true;
    }
    if (this.characterHasEntered) this.animateImagesOnce(this.openSiloAnimationImages);
  }

  /**
   * Checks if the character is within the object's firing zone.
   *
   * @param {Object} character - The character object to check against.
   * @returns {boolean} Returns true if the character is within the firing zone, otherwise false.
   */
  inFiringZone(character) {
    return character.x < this.x && character.x > 150;
  }

  /**
   * Initiates the firing of a rocket.
   */
  fireRocket() {
    this.deathAnmimationCurrentImage = 0;
    this.lastShot = new Date().getTime();

    setTimeout(() => {
      this.world.enemyShots.push(new Rocket());
    }, 1000);
  }
}
