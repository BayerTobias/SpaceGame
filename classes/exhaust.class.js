class playerExhaust extends MovableObject {
  x = 83;
  y = 225;
  height = 50;
  width = 50;
  imagesExhaustAnimation = [
    "./img/player-ship/engineAnimation4x/ship1_flight_lvl7_001.png",
    "./img/player-ship/engineAnimation4x/ship1_flight_lvl7_002.png",
    "./img/player-ship/engineAnimation4x/ship1_flight_lvl7_003.png",
    "./img/player-ship/engineAnimation4x/ship1_flight_lvl7_004.png",
  ];
  currentImage = 0;
  world;

  constructor() {
    super().loadImage("./img/player-ship/engineAnimation4x/ship1_flight_lvl7_001.png");
    this.loadImages(this.imagesExhaustAnimation);
    this.setLocalInterval(() => this.initiateClass(), 100);
  }

  /**
   * Initializes the class and sets up animation intervals.
   */
  initiateClass() {
    if (this.world) {
      this.setGlobalInterval(() => this.animate(), 1000 / (2 * this.fps));
      this.stopLocalIntervals();
    }
  }

  /**
   * Manages animation and behavior of the entity based on movement keys.
   */
  animate() {
    if (this.movementKeyIsPressed()) {
      this.handleExhaustMovement();
      this.animateImages(this.imagesExhaustAnimation);
    } else {
      this.loadImage("");
    }
  }

  /**
   * Manages the movement of the exhaust based on the character's position.
   */
  handleExhaustMovement() {
    this.x = this.world.level.character.x - 17;
    this.y = this.world.level.character.y + 25;
  }
}
